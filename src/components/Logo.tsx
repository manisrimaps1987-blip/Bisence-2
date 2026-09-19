import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = true }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Government of India State Emblem (Lion Capital of Ashoka) Motif */}
      <div 
        id="gov-state-emblem"
        className="flex flex-col items-center justify-center shrink-0 pr-2 border-r border-slate-300"
        title="भारत का राज्य प्रतीक / State Emblem of India"
      >
        <svg viewBox="0 0 44 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-11">
          {/* Ashoka Stambh Lions Emblem Representation */}
          {/* Central & Side Lions */}
          <path d="M22 2C19.5 2 17.5 4 17.5 6.5C17.5 8 18.5 9.2 19.5 9.8C18 10.5 16 12 16 14.5C16 16.5 17.5 18 19.5 18.5V21H24.5V18.5C26.5 18 28 16.5 28 14.5C28 12 26 10.5 24.5 9.8C25.5 9.2 26.5 8 26.5 6.5C26.5 4 24.5 2 22 2Z" fill="#0A3D91" />
          {/* Left Facing Lion Silhouette */}
          <path d="M14 6C12 6 10.5 7.5 10.5 9.5C10.5 11 11.5 12.2 12.5 12.8C11 13.5 9.5 15 9.5 17C9.5 19 11 20.5 13 21V23H17V19C15.5 18.5 14.5 17.5 14.5 16C14.5 14.5 15.5 13.5 17 13V10C15.5 9.5 14.5 8.5 14 6Z" fill="#0A3D91" opacity="0.9" />
          {/* Right Facing Lion Silhouette */}
          <path d="M30 6C32 6 33.5 7.5 33.5 9.5C33.5 11 32.5 12.2 31.5 12.8C33 13.5 34.5 15 34.5 17C34.5 19 33 20.5 31 21V23H27V19C28.5 18.5 29.5 17.5 29.5 16C29.5 14.5 28.5 13.5 27 13V10C28.5 9.5 29.5 8.5 30 6Z" fill="#0A3D91" opacity="0.9" />
          {/* Abacus / Capital Base */}
          <rect x="7" y="24" width="30" height="3" rx="1.5" fill="#D97706" />
          {/* Ashoka Chakra in Center */}
          <circle cx="22" cy="31" r="5" stroke="#0A3D91" strokeWidth="1.5" fill="none" />
          <circle cx="22" cy="31" r="1.5" fill="#0A3D91" />
          <path d="M22 26V36M17 31H27M18.5 27.5L25.5 34.5M18.5 34.5L25.5 27.5" stroke="#0A3D91" strokeWidth="0.75" />
          {/* Bull & Horse on sides */}
          <ellipse cx="12" cy="31" rx="3" ry="2" fill="#0A3D91" opacity="0.7" />
          <ellipse cx="32" cy="31" rx="3" ry="2" fill="#0A3D91" opacity="0.7" />
          {/* Lotus Pedestal Base */}
          <rect x="5" y="37" width="34" height="2.5" rx="1" fill="#0A3D91" />
          <rect x="3" y="41" width="38" height="3.5" rx="1" fill="#D97706" />
          {/* Satyameva Jayate (सत्यमेव जयते) in Devanagari script */}
          <text x="22" y="52" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#0A3D91" fontFamily="'Noto Sans Devanagari', sans-serif">
            सत्यमेव जयते
          </text>
        </svg>
      </div>

      {/* Official Government Text Block */}
      <div className="flex flex-col text-left">
        {/* Ministry & Government Header */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-slate-800 tracking-wide">
            भारत सरकार | GOVERNMENT OF INDIA
          </span>
        </div>
        <div className="text-[10px] text-slate-600 font-medium leading-tight">
          उपभोक्ता मामले, खाद्य और सार्वजनिक वितरण मंत्रालय | Ministry of Consumer Affairs, Food & Public Distribution
        </div>

        {/* Portal & Bureau Name */}
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm sm:text-base font-extrabold text-[#0A3D91] tracking-tight leading-none">
            भारतीय मानक ब्यूरो | BUREAU OF INDIAN STANDARDS
          </span>
          <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#FEF08A] text-[#78350F] border border-[#F59E0B] shadow-2xs">
            मानक पोर्टल
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-bold text-[#0A3D91]">
              BISENCE
            </span>
            <span className="text-[11px] text-slate-600 font-medium">
              National Standards Discovery & Compliance Navigator
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

