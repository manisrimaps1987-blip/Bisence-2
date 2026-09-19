import React, { useState, useEffect } from 'react';
import { StandardItem, ProductIntelligence } from '../types';
import { SAMPLE_STANDARDS } from '../data/standardsData';
import { TrustBadge, DisclaimerBanner } from '../components/TrustBadge';
import { ProductIntelligenceCard } from '../components/ProductIntelligenceCard';
import { ProductDnaCard } from '../components/ProductDnaCard';
import { 
  Search, 
  Filter, 
  Sparkles, 
  HelpCircle, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle, 
  Layers, 
  BookmarkCheck,
  ChevronDown,
  RotateCcw
} from 'lucide-react';

interface DiscoverViewProps {
  initialProductDesc?: string;
  onCheckOfficial: (url: string, name: string) => void;
  onOpenWhyModal: (std: StandardItem, dna: ProductIntelligence | null) => void;
  onAddToJourney?: (std: StandardItem) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  initialProductDesc = '',
  onCheckOfficial,
  onOpenWhyModal,
  onAddToJourney
}) => {
  const [searchQuery, setSearchQuery] = useState(initialProductDesc);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState('All');
  const [selectedQco, setSelectedQco] = useState('All'); // All, Mandatory, Voluntary
  const [selectedSectional, setSelectedSectional] = useState('All');

  // Intake Engine States: 'INPUT' | 'INTAKE_CARD' | 'RESULTS'
  const [intakeStage, setIntakeStage] = useState<'INPUT' | 'INTAKE_CARD' | 'RESULTS'>(
    initialProductDesc ? 'INTAKE_CARD' : 'RESULTS'
  );
  const [analyzing, setAnalyzing] = useState(false);
  const [productDna, setProductDna] = useState<ProductIntelligence | null>(null);
  const [expandedEvidenceId, setExpandedEvidenceId] = useState<string | null>(null);
  const [savedStandards, setSavedStandards] = useState<string[]>([]);

  // If initial description changes or is provided, run analysis
  useEffect(() => {
    if (initialProductDesc) {
      setSearchQuery(initialProductDesc);
      analyzeWithBackend(initialProductDesc);
    }
  }, [initialProductDesc]);

  const analyzeWithBackend = async (promptText: string) => {
    setAnalyzing(true);
    try {
      const res = await fetch('/api/ai/dna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      });
      if (res.ok) {
        const data = await res.json();
        setProductDna(data);
        setIntakeStage('INTAKE_CARD');
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Fallback local extraction
      const fallback: ProductIntelligence = {
        product: promptText,
        category: promptText.toLowerCase().includes('water') ? 'Food & Beverage' : promptText.toLowerCase().includes('cooker') ? 'Domestic Utensils' : 'Mechanical & Fabricated Engineering',
        intendedUse: 'Commercial & domestic usage meeting Indian sanitary and safety standards',
        material: promptText.toLowerCase().includes('steel') ? 'Stainless Steel Grade 304 / 316' : 'Engineering Material Spec',
        targetUser: 'Institutions, commercial entities, or end consumers',
        industry: 'Commercial Kitchen & Hospitality Equipment',
        riskArea: 'Food Contact Sanitation & Corrosion Resistance',
        targetMarket: 'India (Domestic & Institutional)',
        confidenceScore: 88,
        characteristics: [
          'Fabricated Sheet Metal',
          'Food-contact hygiene compliance',
          'Drainage & water overflow resistance',
          'Corrosion resistance test pass'
        ],
        missingDetailsQuestions: [
          {
            id: 'q1',
            question: 'Is this intended for domestic household or commercial/industrial use?',
            options: ['Commercial / Restaurant Use', 'Domestic Household Use', 'Heavy Industrial / Processing Plant']
          },
          {
            id: 'q2',
            question: 'What stainless steel or alloy grade is utilized in the food-contact zone?',
            options: ['AISI 304 (Austenitic)', 'AISI 316 (Acid/Chemical Grade)', 'Ferritic 430', 'Other / Under Evaluation']
          },
          {
            id: 'q3',
            question: 'Does the equipment integrate any electrical heating, motor, or pressure elements?',
            options: ['Non-electrical passive fixture', 'Integrated electric water heating', 'Pressure-bearing container']
          }
        ]
      };
      setProductDna(fallback);
      setIntakeStage('INTAKE_CARD');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    analyzeWithBackend(searchQuery.trim());
  };

  const handleIntakeContinue = (updatedDna: ProductIntelligence) => {
    setProductDna(updatedDna);
    setIntakeStage('RESULTS');
  };

  const toggleSaveStandard = (std: StandardItem) => {
    if (savedStandards.includes(std.id)) {
      setSavedStandards(savedStandards.filter(id => id !== std.id));
    } else {
      setSavedStandards([...savedStandards, std.id]);
      if (onAddToJourney) {
        onAddToJourney(std);
      }
    }
  };

  // Filter standards
  const term = searchQuery.toLowerCase().trim();
  const filteredStandards = SAMPLE_STANDARDS.filter(std => {
    // Search query filter
    const matchesQuery = !term ||
      std.title.toLowerCase().includes(term) ||
      std.code.toLowerCase().includes(term) ||
      std.category.toLowerCase().includes(term) ||
      std.keywords.some(k => k.toLowerCase().includes(term)) ||
      (productDna && std.category.toLowerCase().includes(productDna.category.toLowerCase()));

    // Category filter
    const matchesCat = selectedCategory === 'All' || std.category === selectedCategory;

    // Scheme filter
    const matchesScheme = selectedScheme === 'All' || std.scheme === selectedScheme;

    // QCO filter
    const matchesQco = selectedQco === 'All' || 
      (selectedQco === 'Mandatory' && std.isQcoMandatory) ||
      (selectedQco === 'Voluntary' && !std.isQcoMandatory);

    // Sectional committee filter
    const matchesSectional = selectedSectional === 'All' || Boolean(std.sectionalCommittee && std.sectionalCommittee.includes(selectedSectional));

    return matchesQuery && matchesCat && matchesScheme && matchesQco && matchesSectional;
  });

  const categoriesList = ['All', 'Kitchen & Food Service', 'Electrical & Electronics', 'Consumer Goods', 'Chemicals & Materials', 'Civil & Construction'];
  const schemesList = ['All', 'Scheme I (ISI Mark)', 'Scheme II (CRS)', 'Scheme IV'];
  const sectionalList = ['All', 'MED 03', 'ETD 32', 'CHD 35', 'FAD 14', 'CED 02'];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        {/* Page Header */}
        <div className="border-b-2 border-slate-200 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF08A] border border-[#F59E0B] text-xs font-extrabold text-[#78350F] mb-2">
            <Sparkles className="w-4 h-4 text-[#B45309]" />
            <span>मानक अन्वेषण इंजन | Semantic Standards Discovery Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A3D91]">
            Discover Applicable Indian Standards (IS)
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-3xl leading-relaxed">
            Search the Indian Standards repository using product descriptions, technical keywords, or standard codes (e.g., <em>IS 13983</em>, <em>IS 302</em>). Review explainable recommendation factors, scope boundaries, and official gazette evidence.
          </p>
        </div>

        {/* Semantic Search Bar */}
        <form onSubmit={handleManualSearch} className="relative">
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#0A3D91] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Enter product description (e.g., 'commercial kitchen sinks') or IS code (e.g., 'IS 13983')..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-[#0A3D91] bg-white text-slate-900 text-sm shadow-xs focus:ring-2 focus:ring-[#0A3D91] focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              disabled={analyzing}
              className="px-6 py-3 rounded-xl text-sm font-bold bg-[#0A3D91] hover:bg-[#072B68] text-white shadow-sm flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Calibrating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Analyze with BISENCE AI</span>
                </>
              )}
            </button>
          </div>
        </form>

      {/* Smart Intake Engine Card (Stage 1) */}
      {intakeStage === 'INTAKE_CARD' && productDna && (
        <div className="animate-in fade-in duration-200">
          <ProductIntelligenceCard
            data={productDna}
            onContinue={handleIntakeContinue}
            onEdit={() => setIntakeStage('INPUT')}
          />
        </div>
      )}

      {/* Calibrated Product DNA Card (Stage 2) */}
      {intakeStage === 'RESULTS' && productDna && (
        <div className="space-y-4">
          <ProductDnaCard
            dna={productDna}
            onEdit={() => setIntakeStage('INTAKE_CARD')}
          />
        </div>
      )}

      {/* Filtering Bar */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-[#0F2C61] dark:text-amber-400" />
            <span>Filter Criteria</span>
          </div>
          {(selectedCategory !== 'All' || selectedScheme !== 'All' || selectedQco !== 'All' || selectedSectional !== 'All') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedScheme('All');
                setSelectedQco('All');
                setSelectedSectional('All');
              }}
              className="text-xs text-[#0F2C61] dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Category */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Industry Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {categoriesList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* QCO Mandatory Status */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Quality Control Order (QCO)
            </label>
            <select
              value={selectedQco}
              onChange={e => setSelectedQco(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="All">All Regulations</option>
              <option value="Mandatory">Mandatory QCO Enforced</option>
              <option value="Voluntary">Voluntary Standard</option>
            </select>
          </div>

          {/* Certification Scheme */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Certification Scheme
            </label>
            <select
              value={selectedScheme}
              onChange={e => setSelectedScheme(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {schemesList.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Sectional Committee */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Sectional Committee (Division)
            </label>
            <select
              value={selectedSectional}
              onChange={e => setSelectedSectional(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {sectionalList.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Potentially Relevant Standards ({filteredStandards.length})
          </h2>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            DEMO / SAMPLE DATA
          </span>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Ranked by keyword matching, material characteristics, and QCO mandatory enforcement.
        </span>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredStandards.map(std => {
          const isSaved = savedStandards.includes(std.id);
          const isEvidenceOpen = expandedEvidenceId === std.id;

          return (
            <div
              key={std.id}
              className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition"
            >
              {/* Card Top Row */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-extrabold text-[#0F2C61] dark:text-blue-300">
                      {std.code}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                      Year: {std.year}
                    </span>
                    <TrustBadge level={std.trustLabel} size="sm" />
                    {std.isQcoMandatory && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                        Mandatory QCO
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {std.title}
                  </h3>
                </div>

                {/* Match Score & Action */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[11px] text-slate-500">Relevance Match</div>
                    <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {std.relevanceScore}%
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSaveStandard(std)}
                    className={`p-2 rounded-lg border transition ${
                      isSaved
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                    title={isSaved ? 'Added to My BIS Journey' : 'Add to My BIS Journey'}
                  >
                    <BookmarkCheck className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scope & Applicability */}
              <div className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Scope Overview: </span>
                {std.scope}
              </div>

              {/* Scope Limitation / Boundary Alert */}
              <div className="p-2.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 mb-3.5 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Scope Boundary: </span>
                  {std.scopeLimitations}
                </div>
              </div>

              {/* Why this result? Checklist */}
              <div className="mb-4">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Why this result was matched:</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {std.whyList.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-slate-800">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Collapsible Evidence Section */}
              {isEvidenceOpen && (
                <div className="p-3.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs mb-4 space-y-2 animate-in fade-in">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#0F2C61] dark:text-amber-400" />
                    <span>Regulatory & Technical Committee Evidence:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                    <div>
                      <strong>Sectional Committee:</strong> {std.sectionalCommittee}
                    </div>
                    <div>
                      <strong>Certification Scheme:</strong> {std.scheme}
                    </div>
                    <div>
                      <strong>Source Reference:</strong> {std.sourceReference}
                    </div>
                    <div>
                      <strong>Key Testing Parameters:</strong> {std.testingParameters.join(', ')}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
                    Potentially relevant standard reference — Official verification required on manakonline.in.
                  </div>
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenWhyModal(std, productDna)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0F2C61] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 border border-blue-200 dark:border-blue-900 transition flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Why Recommended?</span>
                  </button>
                  <button
                    onClick={() => setExpandedEvidenceId(isEvidenceOpen ? null : std.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{isEvidenceOpen ? 'Hide Evidence' : 'View Evidence'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onCheckOfficial(std.officialUrl, `${std.code} on Manak Online`)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#0F2C61] hover:bg-[#163D7A] text-white transition flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Check Official Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredStandards.length === 0 && (
          <div className="p-8 text-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No standards match your exact filter selection
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Try broadening your category or sectional committee filter, or search with generalized keywords like "kitchen", "electrical", or "water".
            </p>
          </div>
        )}
      </div>

      {/* Statutory Notice */}
      <DisclaimerBanner />
    </div>
  </div>
  );
};
