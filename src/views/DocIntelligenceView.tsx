import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/TrustBadge';
import { 
  FileSearch, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Layers, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface ExtractedDocResult {
  docName: string;
  fileSize: string;
  detectedStandard: string;
  sectionsFound: number;
  extractedRequirements: {
    section: string;
    page: number;
    clause: string;
    rawText: string;
    plainExplanation: string;
    confidence: number;
  }[];
}

interface DocIntelligenceViewProps {
  onCheckOfficial: (url: string, name: string) => void;
  onNavigate: (tab: string) => void;
}

export const DocIntelligenceView: React.FC<DocIntelligenceViewProps> = ({ onCheckOfficial, onNavigate }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedDocResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const sampleDocuments = [
    {
      title: 'Stainless-Steel Commercial Sink Product Specification (PDF)',
      tag: 'Kitchen & Hospitality',
      standard: 'IS 13983:1994',
      size: '2.4 MB',
      sections: 4,
      requirements: [
        {
          section: 'Material Composition & Sheet Gauge',
          page: 2,
          clause: 'Clause 4.1.2 - Material Specification',
          rawText: 'Fabrication shall strictly utilize Austenitic Stainless Steel Grade X04Cr19Ni9 conforming to IS 6911 with minimum thickness 0.9 mm.',
          plainExplanation: 'Must use certified Grade 304 food-grade stainless steel with sheet thickness no less than 0.9 mm.',
          confidence: 96
        },
        {
          section: 'Drainage Slope & Waste Outlet',
          page: 3,
          clause: 'Clause 5.3 - Drainage Slope',
          rawText: 'The bottom of the sink bowl shall have a continuous self-draining fall toward the outlet with minimum 1:50 gradient.',
          plainExplanation: 'Bowl base must have an engineered 1:50 taper to ensure water does not stagnate in the corners.',
          confidence: 94
        },
        {
          section: 'Sound Deadening & Undercoating',
          page: 4,
          clause: 'Clause 6.2 - Acoustic Attenuation',
          rawText: 'Underside of the bowl and drainer shall be treated with sound-deadening compound or dampener pads.',
          plainExplanation: 'Noise-dampening pads or rubber coating must be affixed underneath the sink bowl.',
          confidence: 91
        }
      ]
    },
    {
      title: 'Domestic Electric Mixer Grinder Technical Data Sheet (PDF)',
      tag: 'Electrical Appliances',
      standard: 'IS 302-2-14:2009',
      size: '1.8 MB',
      sections: 3,
      requirements: [
        {
          section: 'Thermal Overload Protection',
          page: 5,
          clause: 'Clause 19.101 - Motor Protection',
          rawText: 'Motor shall incorporate an automatic thermal trip switch calibrated to interrupt power before winding temperature exceeds 120°C.',
          plainExplanation: 'A resettable thermal overload switch must protect the motor against high heat and jamming.',
          confidence: 98
        },
        {
          section: 'Ingress of Liquids into Motor Housing',
          page: 7,
          clause: 'Clause 15.2 - Spill Overflow Test',
          rawText: 'Liquid spillage of 200 ml saline solution over jar locking seat shall not penetrate into motor housing insulation.',
          plainExplanation: 'Jar base seal must pass a 200 ml liquid spill test without allowing liquid into the electrical compartment.',
          confidence: 93
        }
      ]
    }
  ];

  const handleSimulateDoc = (sample: typeof sampleDocuments[0]) => {
    setIsProcessing(true);
    setExtractedData(null);
    setTimeout(() => {
      setExtractedData({
        docName: sample.title,
        fileSize: sample.size,
        detectedStandard: sample.standard,
        sectionsFound: sample.sections,
        extractedRequirements: sample.requirements
      });
      setIsProcessing(false);
    }, 800);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleSimulateDoc(sampleDocuments[0]);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <FileSearch className="w-4 h-4" />
          <span>Automated Specification Parsing</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Document Intelligence Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Upload product technical datasheets or specification drawings to extract relevant Indian Standards clauses and testing benchmarks.
            </p>
          </div>
          <span className="text-xs uppercase font-bold px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            AI EXTRACTION DEMO
          </span>
        </div>
      </div>

      {/* Upload Drag & Drop Area */}
      <div
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`p-8 rounded-2xl border-2 border-dashed text-center transition cursor-pointer ${
          dragActive
            ? 'border-[#0F2C61] bg-blue-50/60 dark:bg-blue-950/40'
            : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100'
        }`}
        onClick={() => handleSimulateDoc(sampleDocuments[0])}
      >
        <UploadCloud className="w-12 h-12 text-[#0F2C61] dark:text-amber-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Upload Product Specification PDF or Test Sheet
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
          Drag and drop your engineering drawing, raw material mill test report, or component specification sheet (PDF, DOCX, TXT up to 25MB).
        </p>
        <span className="px-4 py-2 rounded-lg text-xs font-bold bg-[#0F2C61] text-white inline-block shadow-xs">
          Select Document from Device
        </span>
      </div>

      {/* Quick Evaluator Sample Pickers */}
      <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/80">
        <span className="text-xs font-bold text-amber-900 dark:text-amber-300 block mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Evaluator 1-Click Sample Documents (No upload required):</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sampleDocuments.map((doc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSimulateDoc(doc)}
              className="p-3 rounded-lg bg-white dark:bg-slate-800 hover:border-[#0F2C61] border border-slate-200 dark:border-slate-700 text-left transition text-xs flex items-center justify-between gap-2 shadow-2xs group"
            >
              <div className="min-w-0">
                <div className="font-bold text-slate-900 dark:text-white truncate">{doc.title}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Category: {doc.tag} • Target: {doc.standard}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F2C61] group-hover:translate-x-0.5 transition shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Processing Animation */}
      {isProcessing && (
        <div className="p-8 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 border-3 border-[#0F2C61] border-t-amber-400 rounded-full animate-spin mx-auto mb-3" />
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            Extracting Technical Clauses & Standard Benchmarks...
          </div>
          <p className="text-xs text-slate-500 mt-1">Cross-referencing against Indian Standards sectional committee records</p>
        </div>
      )}

      {/* Extracted Intelligence Results */}
      {extractedData && (
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 animate-in fade-in">
          {/* Metadata Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                SAMPLE PARSED INTELLIGENCE
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {extractedData.docName}
              </h2>
              <div className="text-xs text-slate-500 mt-0.5">
                Size: {extractedData.fileSize} • Sections Analysed: {extractedData.sectionsFound} • Matched Standard: <strong className="text-[#0F2C61] dark:text-blue-300">{extractedData.detectedStandard}</strong>
              </div>
            </div>

            <button
              onClick={() => onNavigate('journey')}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-[#0F2C61] hover:bg-[#163D7A] text-white flex items-center gap-1.5 transition"
            >
              <span>Add Findings to BIS Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Extracted Requirements List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Extracted Standard Compliance Clauses:</span>
            </h3>

            <div className="space-y-3">
              {extractedData.extractedRequirements.map((req, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {req.section}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500">Page {req.page}</span>
                      <span className="font-bold text-emerald-600 text-[11px] bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-300">
                        {req.confidence}% Match
                      </span>
                    </div>
                  </div>

                  <div className="font-mono text-[11px] font-semibold text-[#0F2C61] dark:text-blue-300">
                    {req.clause}
                  </div>

                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 italic">
                    "{req.rawText}"
                  </div>

                  <div className="text-slate-800 dark:text-slate-200">
                    <strong className="text-amber-700 dark:text-amber-400">Plain-Language Compliance Requirement: </strong>
                    {req.plainExplanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <DisclaimerBanner />
    </div>
  );
};
