import React from 'react';
import { StandardItem, ProductIntelligence } from '../types';
import { TrustBadge } from './TrustBadge';
import { CheckCircle2, ChevronRight, FileText, HelpCircle, Layers, ShieldCheck, X } from 'lucide-react';

interface WhyStandardModalProps {
  isOpen: boolean;
  onClose: () => void;
  standard: StandardItem | null;
  productDna: ProductIntelligence | null;
  onCheckOfficial: (url: string, name: string) => void;
}

export const WhyStandardModal: React.FC<WhyStandardModalProps> = ({
  isOpen,
  onClose,
  standard,
  productDna,
  onCheckOfficial
}) => {
  if (!isOpen || !standard) return null;

  return (
    <div 
      id="why-standard-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
    >
      <div 
        id="why-standard-modal-dialog"
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 relative my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Explainable Recommendation Analysis
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Transparent, evidence-backed matching factors without black-box logic.
        </p>

        {/* Visual 4-Step Sequence */}
        <div className="space-y-4">
          {/* Step 1: Product Description */}
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F2C61] dark:text-blue-400 uppercase tracking-wider mb-1">
              <span className="w-5 h-5 rounded-full bg-[#0F2C61] text-white flex items-center justify-center text-[10px]">1</span>
              <span>Input Product Description</span>
            </div>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 pl-7">
              "{productDna?.product || 'Commercial stainless-steel kitchen equipment'}"
            </p>
          </div>

          {/* Arrow Divider */}
          <div className="flex justify-center -my-2 text-slate-400">
            <ChevronRight className="w-5 h-5 rotate-90" />
          </div>

          {/* Step 2: Detected Characteristics */}
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F2C61] dark:text-blue-400 uppercase tracking-wider mb-2">
              <span className="w-5 h-5 rounded-full bg-[#0F2C61] text-white flex items-center justify-center text-[10px]">2</span>
              <span>Detected Product DNA Characteristics</span>
            </div>
            <div className="pl-7 flex flex-wrap gap-1.5">
              {(productDna?.characteristics || ['Fabricated Stainless Steel', 'Food sanitation requirement', 'Drainage overflow']).map((char, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900 font-medium">
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow Divider */}
          <div className="flex justify-center -my-2 text-slate-400">
            <ChevronRight className="w-5 h-5 rotate-90" />
          </div>

          {/* Step 3: Matched Knowledge Factors */}
          <div className="p-3.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Matched Indian Standards Knowledge & Regulatory Rules</span>
            </div>
            <ul className="pl-7 space-y-2">
              {standard.whyList.map((reason, i) => (
                <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow Divider */}
          <div className="flex justify-center -my-2 text-slate-400">
            <ChevronRight className="w-5 h-5 rotate-90" />
          </div>

          {/* Step 4: Potentially Relevant Standard & Verification */}
          <div className="p-4 rounded-lg bg-slate-900 text-white dark:bg-slate-950 border border-slate-700">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px]">4</span>
                <span>Potentially Relevant Standard Reference</span>
              </div>
              <TrustBadge level={standard.trustLabel} size="sm" />
            </div>
            <div className="pl-7">
              <h4 className="text-base font-bold text-white mb-1">
                {standard.code}: {standard.title}
              </h4>
              <p className="text-xs text-slate-300 mb-3">
                <strong>Scope Limitation:</strong> {standard.scopeLimitations}
              </p>
              <div className="text-xs text-amber-300/90 bg-slate-800/80 p-2 rounded border border-slate-700">
                <strong>Source:</strong> {standard.sourceReference}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Official verification required on manakonline.in
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition"
            >
              Close
            </button>
            <button
              onClick={() => onCheckOfficial(standard.officialUrl, standard.title)}
              className="px-4 py-2 text-xs font-medium bg-[#0F2C61] hover:bg-[#163D7A] text-white rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              <span>Check Official Source</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
