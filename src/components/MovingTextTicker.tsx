import React, { useState } from 'react';
import { Play, Pause, AlertCircle, Bell, ExternalLink, ChevronRight } from 'lucide-react';

export interface TickerItem {
  id: string;
  title: string;
  category?: string;
  date?: string;
  url?: string;
  portalName?: string;
}

interface MovingTextTickerProps {
  items: TickerItem[];
  badgeText?: string;
  badgeHindi?: string;
  speedSeconds?: number;
  variant?: 'gold' | 'royal' | 'subtle';
  onItemClick?: (url: string, name: string) => void;
  className?: string;
}

export const MovingTextTicker: React.FC<MovingTextTickerProps> = ({
  items,
  badgeText = 'Gazette Flash',
  badgeHindi = 'ताज़ा समाचार',
  speedSeconds = 40,
  variant = 'gold',
  onItemClick,
  className = ''
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items to ensure smooth continuous loop
  const duplicatedItems = [...items, ...items];

  const variantStyles = {
    gold: {
      container: 'bg-[#FFFBEB] border-y border-[#F59E0B]/60 text-slate-900',
      badge: 'bg-[#FEF08A] text-[#78350F] border-[#F59E0B]',
      itemBg: 'hover:bg-amber-100/70 text-slate-800 hover:text-[#0A3D91]',
      tagBg: 'bg-[#FEF08A] text-[#78350F] border border-[#F59E0B]',
      btnBg: 'bg-amber-100 hover:bg-amber-200 text-[#78350F]'
    },
    royal: {
      container: 'bg-[#072B68] border-y border-[#0A3D91] text-white',
      badge: 'bg-[#FEF08A] text-[#78350F] border-[#F59E0B]',
      itemBg: 'hover:bg-white/10 text-slate-100 hover:text-amber-300',
      tagBg: 'bg-white/20 text-amber-300 border border-white/30',
      btnBg: 'bg-white/15 hover:bg-white/25 text-white'
    },
    subtle: {
      container: 'bg-slate-50 border-y border-slate-300 text-slate-800',
      badge: 'bg-[#0A3D91] text-white border-[#0A3D91]',
      itemBg: 'hover:bg-blue-50 text-slate-800 hover:text-[#0A3D91]',
      tagBg: 'bg-slate-200 text-slate-700 border border-slate-300',
      btnBg: 'bg-slate-200 hover:bg-slate-300 text-slate-800'
    }
  };

  const style = variantStyles[variant] || variantStyles.gold;

  return (
    <div 
      className={`relative flex items-center overflow-hidden py-1.5 px-3 text-xs select-none ${style.container} ${className}`}
      role="region"
      aria-label="Moving alerts marquee"
    >
      {/* Left Fixed Badge */}
      <div className="flex items-center gap-1.5 shrink-0 z-10 mr-3 pr-2 border-r border-amber-300/60 shadow-xs">
        <span className={`px-2 py-0.5 rounded font-extrabold text-[10px] tracking-wide border flex items-center gap-1 shrink-0 ${style.badge}`}>
          <Bell className="w-3 h-3 text-[#B45309]" />
          <span>{badgeHindi}</span>
          <span className="opacity-40">|</span>
          <span>{badgeText}</span>
        </span>

        {/* Accessibility Play/Pause Button */}
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? 'Resume moving text' : 'Pause moving text'}
          title={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
          className={`p-1 rounded cursor-pointer transition ${style.btnBg}`}
        >
          {isPaused ? <Play className="w-2.5 h-2.5" /> : <Pause className="w-2.5 h-2.5" />}
        </button>
      </div>

      {/* Moving Text Marquee Track */}
      <div 
        className="flex-1 overflow-hidden relative cursor-default"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="inline-flex items-center whitespace-nowrap will-change-transform"
          style={{
            animation: `marquee ${speedSeconds}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {duplicatedItems.map((item, idx) => (
            <div 
              key={`${item.id}-${idx}`}
              className="inline-flex items-center gap-2 mr-10 group"
            >
              {item.category && (
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider ${style.tagBg}`}>
                  {item.category}
                </span>
              )}

              {item.url ? (
                <button
                  type="button"
                  onClick={() => onItemClick && onItemClick(item.url!, item.portalName || item.title)}
                  className={`inline-flex items-center gap-1 font-medium underline underline-offset-2 transition cursor-pointer text-left ${style.itemBg}`}
                >
                  <span>{item.title}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 inline text-amber-600" />
                </button>
              ) : (
                <span className="font-medium text-slate-800">
                  {item.title}
                </span>
              )}

              {item.date && (
                <span className="text-[10px] opacity-75 font-semibold">
                  [{item.date}]
                </span>
              )}

              {/* Separator icon between headlines */}
              <span className="text-[#F59E0B] font-bold text-xs ml-3 select-none">
                ◆
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
