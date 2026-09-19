import React from 'react';
import { ExternalLink, ShieldAlert, X } from 'lucide-react';

interface ExternalExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationUrl: string;
  portalName?: string;
}

export const ExternalExitModal: React.FC<ExternalExitModalProps> = ({
  isOpen,
  onClose,
  destinationUrl,
  portalName = 'Official Government Portal'
}) => {
  if (!isOpen) return null;

  const handleProceed = () => {
    window.open(destinationUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div 
      id="external-exit-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div 
        id="external-exit-modal-dialog"
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-300 dark:border-amber-800">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              You are leaving BISENCE
            </h3>
            <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
              Official External Verification Notice
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          You are navigating from BISENCE to an external official government service portal:
        </p>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-5">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Destination Portal
          </div>
          <div className="text-sm font-bold text-[#0F2C61] dark:text-blue-300 break-all flex items-center gap-1.5">
            <span>{portalName}</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
            {destinationUrl}
          </div>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 bg-amber-50/60 dark:bg-amber-950/20 p-2.5 rounded border border-amber-200 dark:border-amber-900/50 mb-6">
          <strong>Security note:</strong> BISENCE provides guidance and discovery. Official certification applications, fee payments, and legal approvals must be completed solely on official portals like <em>manakonline.in</em> or <em>bis.gov.in</em>.
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            id="stay-on-bisence-btn"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
          >
            Stay on BISENCE
          </button>
          <button
            id="proceed-to-official-btn"
            onClick={handleProceed}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[#0F2C61] hover:bg-[#163D7A] text-white flex items-center gap-2 shadow-sm transition"
          >
            <span>Proceed to Portal</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
