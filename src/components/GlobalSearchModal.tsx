import React, { useState, useEffect } from 'react';
import { SAMPLE_STANDARDS } from '../data/standardsData';
import { SAMPLE_NOTIFICATIONS } from '../data/notificationsData';
import { Search, X, Compass, Bell, Shield, ArrowRight } from 'lucide-react';
import { TrustBadge } from './TrustBadge';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStandard: (stdId: string) => void;
  onSelectNotification: (notifId: string) => void;
  onNavigate: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectStandard,
  onSelectNotification,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // trigger toggle handled in parent
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const term = searchTerm.toLowerCase().trim();

  const filteredStandards = SAMPLE_STANDARDS.filter(s => 
    !term || 
    s.title.toLowerCase().includes(term) ||
    s.code.toLowerCase().includes(term) ||
    s.keywords.some(k => k.toLowerCase().includes(term)) ||
    s.category.toLowerCase().includes(term)
  ).slice(0, 4);

  const filteredNotifs = SAMPLE_NOTIFICATIONS.filter(n =>
    !term ||
    n.title.toLowerCase().includes(term) ||
    n.summary.toLowerCase().includes(term) ||
    n.category.toLowerCase().includes(term)
  ).slice(0, 3);

  return (
    <div 
      id="global-search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div 
        id="global-search-modal-dialog"
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            id="global-search-input"
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search standards, keywords (e.g., sink, cooker, mixer, water, toy, LED)..."
            className="w-full bg-transparent text-sm md:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Section: Standards */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#0F2C61] dark:text-amber-400" />
                <span>Relevant Indian Standards ({filteredStandards.length})</span>
              </span>
              <button 
                onClick={() => { onNavigate('discover'); onClose(); }}
                className="text-xs text-[#0F2C61] dark:text-blue-400 hover:underline capitalize"
              >
                View all in Discover
              </button>
            </div>
            <div className="space-y-2">
              {filteredStandards.map(std => (
                <div
                  key={std.id}
                  onClick={() => { onSelectStandard(std.id); onClose(); }}
                  className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition flex items-center justify-between gap-3 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-xs text-[#0F2C61] dark:text-blue-300">
                        {std.code}
                      </span>
                      <TrustBadge level={std.trustLabel} size="sm" />
                    </div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {std.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Category: {std.category} • Risk: {std.riskArea}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 transition shrink-0" />
                </div>
              ))}
              {filteredStandards.length === 0 && (
                <div className="text-xs text-slate-500 py-3 text-center">
                  No standards directly matching "{searchTerm}". Try general terms like "kitchen", "cooker", "electric", "water".
                </div>
              )}
            </div>
          </div>

          {/* Section: Notifications */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-amber-500" />
                <span>Notifications & QCO Alerts</span>
              </span>
              <button 
                onClick={() => { onNavigate('notifications'); onClose(); }}
                className="text-xs text-[#0F2C61] dark:text-blue-400 hover:underline capitalize"
              >
                All notifications
              </button>
            </div>
            <div className="space-y-2">
              {filteredNotifs.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => { onSelectNotification(notif.id); onClose(); }}
                  className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-amber-700 dark:text-amber-400">{notif.category}</span>
                    <span>{notif.publishedDate}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {notif.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Official verification destination: <strong>manakonline.in</strong></span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
