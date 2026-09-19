import React, { useState } from 'react';
import { ProductIntelligence } from '../types';
import { AlertCircle, CheckCircle, ChevronRight, Edit3, HelpCircle, Layers, Sparkles } from 'lucide-react';

interface ProductIntelligenceCardProps {
  data: ProductIntelligence;
  onContinue: (updatedDna: ProductIntelligence) => void;
  onEdit?: () => void;
}

export const ProductIntelligenceCard: React.FC<ProductIntelligenceCardProps> = ({
  data,
  onContinue,
  onEdit
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: data.missingDetailsQuestions?.[0]?.selected || data.missingDetailsQuestions?.[0]?.options[0] || '',
    q2: data.missingDetailsQuestions?.[1]?.selected || data.missingDetailsQuestions?.[1]?.options[0] || '',
    q3: data.missingDetailsQuestions?.[2]?.selected || data.missingDetailsQuestions?.[2]?.options[0] || ''
  });

  const handleSelectOption = (qId: string, opt: string) => {
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const handleProceed = () => {
    // Augment product DNA with user answers
    const updated: ProductIntelligence = {
      ...data,
      confidenceScore: Math.min(98, data.confidenceScore + 6),
      characteristics: Array.from(new Set([
        ...data.characteristics,
        answers.q1,
        answers.q2,
        answers.q3
      ].filter(Boolean)))
    };
    onContinue(updated);
  };

  return (
    <div 
      id="product-intelligence-card"
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md p-6 relative overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0F2C61] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Product Intelligence Card
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Smart Intake Synthesis — Pre-discovery Calibration
            </span>
          </div>
        </div>

        {/* Confidence Meter */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-500 dark:text-slate-400">Assessment Confidence</div>
            <div className="text-sm font-bold text-[#0F2C61] dark:text-amber-400">
              {data.confidenceScore}% Validated
            </div>
          </div>
          <div className="w-20 bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
            <div 
              className="bg-gradient-to-r from-amber-500 to-[#15803D] h-full rounded-full transition-all duration-500" 
              style={{ width: `${data.confidenceScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Extracted Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Product Title
          </span>
          <span className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
            {data.product}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Category
          </span>
          <span className="text-sm font-semibold text-[#0F2C61] dark:text-blue-300">
            {data.category}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Primary Material
          </span>
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {data.material}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Risk & Safety Domain
          </span>
          <span className="text-sm font-medium text-rose-700 dark:text-rose-400">
            {data.riskArea}
          </span>
        </div>
      </div>

      {/* Intended Use & Industry Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6 text-xs text-slate-700 dark:text-slate-300">
        <div className="p-3 rounded bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
          <strong className="text-blue-900 dark:text-blue-300 block mb-0.5">Intended Use:</strong>
          {data.intendedUse}
        </div>
        <div className="p-3 rounded bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
          <strong className="text-blue-900 dark:text-blue-300 block mb-0.5">Target Demographic:</strong>
          {data.targetUser}
        </div>
        <div className="p-3 rounded bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
          <strong className="text-blue-900 dark:text-blue-300 block mb-0.5">Indian Industry / Market:</strong>
          {data.industry} ({data.targetMarket})
        </div>
      </div>

      {/* Missing Information Intake Banner */}
      <div className="mb-6 p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800">
        <div className="flex items-center gap-2 mb-2 text-amber-900 dark:text-amber-200 font-semibold text-sm">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>BISENCE needs 2 more details to improve discovery precision.</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
          Refining these key attributes ensures matching against the correct Sectional Committee and mandatory Quality Control Order (QCO).
        </p>

        {/* Structured Questions */}
        <div className="space-y-3.5 mt-3">
          {(data.missingDetailsQuestions || []).map((q, qIndex) => (
            <div key={q.id} className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-amber-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mb-2">
                {qIndex + 1}. {q.question}
              </span>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt, oIndex) => {
                  const isSelected = answers[q.id] === opt;
                  return (
                    <button
                      key={oIndex}
                      type="button"
                      onClick={() => handleSelectOption(q.id, opt)}
                      className={`text-xs px-3 py-1.5 rounded-md border font-medium transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#0F2C61] text-white border-[#0F2C61] shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected && <CheckCircle className="w-3 h-3 inline mr-1 text-amber-300" />}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          AI-generated product profile — verify before regulatory submission.
        </span>
        <div className="flex items-center gap-3">
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          )}
          <button
            id="continue-to-discovery-btn"
            onClick={handleProceed}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#0F2C61] hover:bg-[#163D7A] text-white shadow-sm hover:shadow transition flex items-center gap-2 cursor-pointer"
          >
            <span>Continue to Discovery</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
