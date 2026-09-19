import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, ExternalLink } from 'lucide-react';
import { TrustBadge } from './TrustBadge';

interface FloatingAssistantProps {
  onOpenFullAssistant: () => void;
  onCheckOfficial: (url: string, name: string) => void;
}

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({
  onOpenFullAssistant,
  onCheckOfficial
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query.trim(), language: 'en' })
      });
      if (res.ok) {
        const data = await res.json();
        setResponse(data.reply);
      } else {
        throw new Error('Chat failed');
      }
    } catch {
      setResponse(
        'Potentially relevant standard reference — Official verification required on manakonline.in. In general, check if a mandatory Quality Control Order (QCO) has been gazetted for your product category.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {isOpen ? (
        <div 
          id="floating-assistant-panel"
          className="w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 relative animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0F2C61] text-white flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  BISENCE Quick Assistant
                </h4>
                <span className="text-[10px] text-emerald-600 font-medium">Grounded Compliance AI</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Response or Welcome */}
          <div className="text-xs text-slate-600 dark:text-slate-300 min-h-[100px] max-h-[220px] overflow-y-auto mb-3 space-y-2">
            {loading ? (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center gap-2 text-slate-500">
                <span className="w-3.5 h-3.5 border-2 border-[#0F2C61] border-t-amber-400 rounded-full animate-spin" />
                <span>Checking Indian Standards Knowledge Base...</span>
              </div>
            ) : response ? (
              <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-lg border border-blue-100 dark:border-blue-900/40 text-slate-800 dark:text-slate-200 space-y-2">
                <TrustBadge level="AI_ASSISTED" size="sm" />
                <div className="leading-relaxed whitespace-pre-wrap">{response}</div>
                <div className="pt-2 border-t border-blue-100 dark:border-blue-900/40 flex items-center justify-between text-[10px]">
                  <button
                    onClick={() => onCheckOfficial('https://www.manakonline.in', 'Manak Online')}
                    className="font-bold text-[#0F2C61] dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>Check manakonline.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => { setIsOpen(false); onOpenFullAssistant(); }}
                    className="underline text-slate-500 hover:text-slate-700"
                  >
                    Open Full Assistant
                  </button>
                </div>
              </div>
            ) : (
              <p className="p-2 text-slate-500 leading-relaxed">
                Have a quick compliance question? Type your product idea or standard inquiry below for instant guidance.
              </p>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleAsk} className="flex items-center gap-1.5">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="e.g., Is ISI mark mandatory for kitchen sinks?"
              className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="p-2 rounded-lg bg-[#0F2C61] text-white hover:bg-[#163D7A] transition disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          id="floating-assistant-launcher-btn"
          onClick={() => setIsOpen(true)}
          className="px-4 py-2.5 rounded-full bg-[#0F2C61] hover:bg-[#163D7A] text-white font-bold text-xs shadow-xl flex items-center gap-2 border border-slate-700/30 group transition hover:scale-105 cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <span>Need help finding a standard?</span>
        </button>
      )}
    </div>
  );
};
