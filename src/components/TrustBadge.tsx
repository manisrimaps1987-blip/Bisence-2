import React from 'react';
import { TrustLevel } from '../types';
import { ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';

interface TrustBadgeProps {
  level: TrustLevel;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
  className?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ 
  level, 
  size = 'md', 
  showDescription = false,
  className = '' 
}) => {
  const configs = {
    VERIFIED: {
      label: 'Verified Source Info',
      shortLabel: 'Verified Source Info',
      icon: ShieldCheck,
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      dotColor: 'bg-emerald-500',
      desc: 'Information matched directly against verified BIS catalog records or gazette notifications.'
    },
    AI_ASSISTED: {
      label: 'AI-Assisted Recommendation',
      shortLabel: 'AI-Assisted Recommendation',
      icon: Sparkles,
      bgColor: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      dotColor: 'bg-amber-500',
      desc: 'Synthesized via semantic keyword parsing and Indian standard classifications. Subject to user verification.'
    },
    OFFICIAL_VERIFICATION_REQUIRED: {
      label: 'Official Verification Required',
      shortLabel: 'Official Verification Required',
      icon: AlertTriangle,
      bgColor: 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      dotColor: 'bg-rose-500',
      desc: 'Standard reference requires direct verification on official portal manakonline.in.'
    }
  };

  const config = configs[level] || configs.AI_ASSISTED;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs font-semibold px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-semibold px-3 py-1.5 gap-2'
  };

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <span 
        id={`trust-badge-${level.toLowerCase()}`}
        className={`inline-flex items-center rounded-full border shadow-2xs font-medium select-none ${sizeClasses[size]} ${config.bgColor}`}
      >
        <span className={`w-2 h-2 rounded-full ${config.dotColor} shrink-0 animate-pulse`} />
        <span>{config.shortLabel}</span>
      </span>
      {showDescription && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">
          {config.desc}
        </p>
      )}
    </div>
  );
};

export const DisclaimerBanner: React.FC<{ compact?: boolean; className?: string }> = ({ 
  compact = false, 
  className = '' 
}) => {
  return (
    <div 
      id="bisence-statutory-disclaimer"
      className={`rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 p-3 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5 ${className}`}
    >
      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <span className="font-semibold text-amber-800 dark:text-amber-300 block mb-0.5">
          Public Advisory & AI Guidance Notice:
        </span>
        <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
          This AI provides guidance based on available knowledge. It does not replace official BIS certification, testing, legal, or regulatory decisions. All users must confirm official requirements on <a href="https://www.manakonline.in" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-amber-700">manakonline.in</a> or <a href="https://www.bis.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-amber-700">bis.gov.in</a>.
        </span>
      </div>
    </div>
  );
};
