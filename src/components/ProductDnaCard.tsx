import React from 'react';
import { ProductIntelligence } from '../types';
import { Dna, Edit2, ShieldAlert, Sparkles, Tag } from 'lucide-react';

interface ProductDnaCardProps {
  dna: ProductIntelligence;
  onEdit?: () => void;
  className?: string;
}

export const ProductDnaCard: React.FC<ProductDnaCardProps> = ({
  dna,
  onEdit,
  className = ''
}) => {
  return (
    <div 
      id="product-dna-card"
      className={`bg-slate-900 text-white rounded-xl border border-slate-800 shadow-md p-5 relative overflow-hidden ${className}`}
    >
      {/* Background Decorative DNA Helix Graphic */}
      <div className="absolute right-0 top-0 bottom-0 w-48 opacity-10 pointer-events-none flex items-center justify-end pr-4">
        <Dna className="w-36 h-36 text-amber-400 rotate-12" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center">
            <Dna className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span>Product DNA</span>
              <span className="text-[10px] font-normal uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                Calibrated Profile
              </span>
            </h4>
          </div>
        </div>

        {/* Confidence progress */}
        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="text-slate-400 block">Confidence Score</span>
            <span className="font-bold text-amber-400">{dna.confidenceScore}%</span>
          </div>
          <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${dna.confidenceScore}%` }}
            />
          </div>
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
              title="Edit Profile"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* DNA Attribute Pills */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-4 relative z-10">
        <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/80">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Category</span>
          <span className="text-xs font-bold text-slate-100 truncate block" title={dna.category}>{dna.category}</span>
        </div>
        <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/80">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Material</span>
          <span className="text-xs font-bold text-amber-300 truncate block" title={dna.material}>{dna.material}</span>
        </div>
        <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/80">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Intended Use</span>
          <span className="text-xs font-medium text-slate-200 truncate block" title={dna.intendedUse}>{dna.intendedUse}</span>
        </div>
        <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/80">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Target User</span>
          <span className="text-xs font-medium text-slate-200 truncate block" title={dna.targetUser}>{dna.targetUser}</span>
        </div>
        <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/80">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Risk Area</span>
          <span className="text-xs font-medium text-rose-300 truncate block" title={dna.riskArea}>{dna.riskArea}</span>
        </div>
        <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/80">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Industry Sector</span>
          <span className="text-xs font-medium text-blue-300 truncate block" title={dna.industry}>{dna.industry}</span>
        </div>
      </div>

      {/* Detected Characteristic Chips */}
      <div className="relative z-10 mb-3">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
          <Tag className="w-3 h-3 text-amber-400" />
          <span>Detected Technical Characteristics:</span>
        </span>
        <div className="flex flex-wrap gap-1.5">
          {dna.characteristics.map((char, index) => (
            <span 
              key={index}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-200 border border-slate-700 font-medium flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {char}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
        <span className="text-amber-400/90 font-medium">
          AI-generated product profile — verify before use.
        </span>
        <span>Target Market: {dna.targetMarket}</span>
      </div>
    </div>
  );
};
