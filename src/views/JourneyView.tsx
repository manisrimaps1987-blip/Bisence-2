import React, { useState } from 'react';
import { ProductIntelligence, StandardItem } from '../types';
import { DisclaimerBanner } from '../components/TrustBadge';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  ArrowRight, 
  FileText, 
  FlaskConical, 
  ShieldCheck, 
  Download,
  ListTodo,
  Layers,
  Sparkles
} from 'lucide-react';
import factoryAuditImg from '../assets/images/factory_quality_audit_1789717971374.jpg';

interface JourneyViewProps {
  productDna: ProductIntelligence | null;
  selectedStandard?: StandardItem | null;
  onCheckOfficial: (url: string, name: string) => void;
  onNavigate: (tab: string) => void;
}

export const JourneyView: React.FC<JourneyViewProps> = ({
  productDna,
  selectedStandard,
  onCheckOfficial,
  onNavigate
}) => {
  // 6 interactive checklist documents
  const [completedDocs, setCompletedDocs] = useState<string[]>([
    'doc1', // Product Description Document
    'doc2'  // Technical Drawings
  ]);

  const toggleDoc = (id: string) => {
    if (completedDocs.includes(id)) {
      setCompletedDocs(completedDocs.filter(d => d !== id));
    } else {
      setCompletedDocs([...completedDocs, id]);
    }
  };

  const steps = [
    {
      stepNumber: 1,
      title: 'Product Identification & Scoping',
      status: 'Completed',
      statusColor: 'text-[#78350F] bg-[#FEF08A] border-[#F59E0B]',
      description: 'Define technical attributes, intended environment (commercial vs domestic), materials, and risk domains.',
      requiredDocs: ['Product technical description', 'Material specification sheet (Grade 304/316)', 'Intended usage manual'],
      userAction: 'Review and confirm Product DNA profile',
      officialPortal: null,
      readinessContribution: '100% Prepared'
    },
    {
      stepNumber: 2,
      title: 'Applicable Standard & QCO Confirmation',
      status: 'Completed',
      statusColor: 'text-[#78350F] bg-[#FEF08A] border-[#F59E0B]',
      description: 'Verify Gazette Quality Control Order (QCO) enforcement date and mandatory Indian Standard code.',
      requiredDocs: ['Gazette QCO notification copy', 'Standard scope mapping document'],
      userAction: 'Review statutory deadlines on BISENCE Standards Directory',
      officialPortal: { name: 'Official Gazette Notification Archive', url: 'https://www.egazette.gov.in' },
      readinessContribution: '100% Prepared'
    },
    {
      stepNumber: 3,
      title: 'In-House Quality & Factory Infrastructure Prep',
      status: 'In Progress',
      statusColor: 'text-[#0A3D91] bg-blue-50 border-[#0A3D91]',
      description: 'Align manufacturing machinery, in-house laboratory testing equipment, and Scheme of Inspection and Testing (SIT).',
      requiredDocs: ['Machinery list with capacity', 'In-house test equipment list & calibration certificates', 'Quality manual'],
      userAction: 'Verify in-house testing equipment checklist against IS specifications',
      officialPortal: { name: 'BIS Guidelines for Applicants', url: 'https://www.bis.gov.in' },
      readinessContribution: '65% Prepared'
    },
    {
      stepNumber: 4,
      title: 'Pre-Certification Laboratory Testing',
      status: 'Action Required',
      statusColor: 'text-[#78350F] bg-[#FEF9C3] border-[#F59E0B]',
      description: 'Send pilot production samples to a BIS-recognized or NABL-accredited laboratory for type testing.',
      requiredDocs: ['Sample dispatch challan', 'Test parameter test schedule per IS code', 'Preliminary lab test report'],
      userAction: 'Search laboratory network on BISENCE Lab Finder',
      officialPortal: { name: 'BIS Laboratory Network (LIMS)', url: 'https://www.manakonline.in' },
      readinessContribution: '40% Prepared'
    },
    {
      stepNumber: 5,
      title: 'Formal Application & Scheme Filing',
      status: 'Pending',
      statusColor: 'text-slate-600 bg-slate-100 border-slate-300',
      description: 'Submit formal application on Manak Online under Scheme I (Product Certification / ISI Mark) or Scheme II (CRS).',
      requiredDocs: ['Form I application', 'Application fee receipt', 'Factory location proof (Udyam / GST / Factory Licence)'],
      userAction: 'Log in to official portal with factory digital signature (DSC)',
      officialPortal: { name: 'Manak Online Application Login', url: 'https://www.manakonline.in' },
      readinessContribution: '20% Prepared'
    },
    {
      stepNumber: 6,
      title: 'Official Audit, Grant of Licence & Verification',
      status: 'Pending',
      statusColor: 'text-slate-600 bg-slate-100 border-slate-300',
      description: 'BIS inspecting officer conducts physical factory audit, draws verification samples, and issues CM/L licence number.',
      requiredDocs: ['Factory audit observation report', 'Independent verification sample pass certificate', 'Grant of Licence letter (CM/L - XXXXXXX)'],
      userAction: 'Receive official CM/L certificate and affix ISI mark with standard code',
      officialPortal: { name: 'BIS Licence Verification', url: 'https://www.bis.gov.in' },
      readinessContribution: 'Pending Official Audit'
    }
  ];

  // Document checklist items
  const docChecklist = [
    { id: 'doc1', title: 'Product Technical Description & Dimensional Drawings', requiredFor: 'Step 1 & 3' },
    { id: 'doc2', title: 'Raw Material Test Certificates (AISI 304 Mill Certificate)', requiredFor: 'Step 1' },
    { id: 'doc3', title: 'Manufacturing Process Flow Chart & Machinery List', requiredFor: 'Step 3' },
    { id: 'doc4', title: 'In-House Test Equipment Calibration Certificates (Valid)', requiredFor: 'Step 3' },
    { id: 'doc5', title: 'Laboratory Test Report (NABL / BIS Recognized Lab)', requiredFor: 'Step 4' },
    { id: 'doc6', title: 'Factory Registration / Udyam MSME Certificate & GST', requiredFor: 'Step 5' }
  ];

  const overallReadinessScore = 58;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        {/* Official Header Banner with Factory Audit Photo */}
        <div className="rounded-xl border-2 border-slate-300 p-6 bg-slate-50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF08A] border border-[#F59E0B] text-xs font-extrabold text-[#78350F]">
              <Layers className="w-4 h-4 text-[#B45309]" />
              <span>प्रमाणीकरण यात्रा | Interactive Compliance Roadmap</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A3D91]">
              BIS Readiness Navigator
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
              AI Guidance Readiness — This does not mean certified. Structured milestone roadmap toward official statutory filing on Manak Online.
            </p>
          </div>

          <div className="w-full md:w-64 h-36 rounded-lg overflow-hidden border-2 border-[#0A3D91] shadow-md shrink-0 relative">
            <img 
              src={factoryAuditImg} 
              alt="BIS technical auditor verifying factory production standards and test calibration" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-[#0A3D91]/90 text-white text-[10px] font-bold text-center py-1">
              Factory Audit & Inspection Stage
            </div>
          </div>
        </div>

        {/* Priority Actions Callout with Gold Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-[#FEF9C3] border-2 border-[#F59E0B] shadow-2xs">
            <div className="text-[10px] uppercase font-extrabold text-[#78350F] mb-1">Priority 1</div>
            <div className="text-xs font-bold text-slate-900 mb-1">Confirm Standard Code</div>
            <p className="text-[11px] text-slate-700">
              Verify {selectedStandard ? selectedStandard.code : 'IS 13983'} on manakonline.in to check if recent amendments apply.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 border-2 border-[#0A3D91] shadow-2xs">
            <div className="text-[10px] uppercase font-extrabold text-[#0A3D91] mb-1">Priority 2</div>
            <div className="text-xs font-bold text-slate-900 mb-1">In-House Quality Setup</div>
            <p className="text-[11px] text-slate-700">
              Ensure factory has calibrated measuring gauges and dedicated test bench per Scheme of Inspection (SIT).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border-2 border-emerald-500 shadow-2xs">
            <div className="text-[10px] uppercase font-extrabold text-emerald-800 mb-1">Priority 3</div>
            <div className="text-xs font-bold text-slate-900 mb-1">Book Pilot Testing</div>
            <p className="text-[11px] text-slate-700">
              Send 2 prototype units to a recognized laboratory to test drainage, overflow, and finish.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100 border-2 border-slate-300 shadow-2xs">
            <div className="text-[10px] uppercase font-extrabold text-slate-700 mb-1">Priority 4</div>
            <div className="text-xs font-bold text-slate-900 mb-1">Digital Signature Ready</div>
            <p className="text-[11px] text-slate-700">
              Class-3 DSC registered in the authorized signatory's name is mandatory for filing on Manak Online.
            </p>
          </div>
        </div>

        {/* 6-Step Visual Roadmap */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-[#0A3D91] flex items-center gap-2">
            <span>6-Stage Compliance Pathway</span>
            <span className="text-xs font-semibold text-slate-500">From Initial Scoping to Official Audit</span>
          </h2>

          <div className="space-y-4">
            {steps.map(s => (
              <div
                key={s.stepNumber}
                className="p-5 rounded-xl bg-white border-2 border-slate-300 shadow-xs flex flex-col md:flex-row gap-5 items-start"
              >
                {/* Step indicator */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#0A3D91] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                    {s.stepNumber}
                  </div>
                  <div className="md:hidden">
                    <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded border ${s.statusColor}`}>
                      {s.status}
                    </span>
                  </div>
                </div>

                {/* Step Body */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-extrabold text-[#0A3D91]">
                      {s.title}
                    </h3>
                    <span className={`hidden md:inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded border ${s.statusColor}`}>
                      {s.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {s.description}
                  </p>

                  {/* Required Documents Pills */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      <span>Required Inputs / Documents:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.requiredDocs.map((doc, dIdx) => (
                        <span key={dIdx} className="text-xs px-2.5 py-0.5 rounded bg-white text-slate-800 font-medium border border-slate-300">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: User Action & Portal Link */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                    <div className="text-slate-700">
                      <strong className="text-[#0A3D91]">Next Action:</strong> {s.userAction}
                    </div>

                    {s.officialPortal && (
                      <button
                        onClick={() => onCheckOfficial(s.officialPortal!.url, s.officialPortal!.name)}
                        className="text-xs font-bold text-[#0A3D91] hover:underline flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{s.officialPortal.name}</span>
                        <ExternalLink className="w-3 h-3 text-amber-600" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Document Readiness Checklist */}
        <div className="p-6 rounded-xl bg-white border-2 border-slate-300 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-extrabold text-[#0A3D91] flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-emerald-600" />
                <span>Applicant Documentation Dossier Checklist</span>
              </h3>
              <p className="text-xs text-slate-600">
                Mark the documents you have prepared to track your audit readiness progress.
              </p>
            </div>
            <div className="text-xs font-extrabold text-[#78350F] bg-[#FEF08A] px-3 py-1 rounded border border-[#F59E0B]">
              {completedDocs.length} of {docChecklist.length} Documents Ready
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {docChecklist.map(item => {
              const isChecked = completedDocs.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleDoc(item.id)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition flex items-start gap-3 ${
                    isChecked
                      ? 'bg-[#FEF9C3] border-[#F59E0B]'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 text-emerald-600 cursor-pointer"
                  >
                    {isChecked ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <Circle className="w-4 h-4 text-slate-400" />}
                  </button>
                  <div className="flex-1">
                    <div className={`text-xs font-bold ${isChecked ? 'text-[#78350F] line-through opacity-80' : 'text-slate-900'}`}>
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Stage requirement: {item.requiredFor}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Filing Hand-off Action with Gold Button */}
        <div className="p-5 rounded-xl bg-[#0A3D91] text-white border-t-4 border-[#F59E0B] flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div>
            <h4 className="text-base font-bold mb-1">Ready for Official e-BIS Filing?</h4>
            <p className="text-xs text-blue-100 max-w-xl">
              BISENCE provides non-statutory preparation guidance. Official submission, statutory application fees, and physical audits occur strictly on Manak Online.
            </p>
          </div>
          <button
            onClick={() => onCheckOfficial('https://www.manakonline.in', 'Manak Online (e-BIS Portal)')}
            className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[#FEF08A] hover:bg-[#FDE047] text-[#78350F] border border-[#F59E0B] flex items-center gap-2 shadow-xs transition cursor-pointer"
          >
            <span>Launch Manak Online</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <DisclaimerBanner />
      </div>
    </div>
  );
};
