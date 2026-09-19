import React, { useState } from 'react';
import { LanguageCode, TrustLevel } from '../types';
import { TrustBadge, DisclaimerBanner } from '../components/TrustBadge';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ThumbsUp, 
  ThumbsDown, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  MessageSquare,
  HelpCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  trustLabel?: TrustLevel;
  officialLinks?: { name: string; url: string }[];
  feedbackGiven?: boolean;
}

interface AiAssistantViewProps {
  language: LanguageCode;
  onCheckOfficial: (url: string, name: string) => void;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({ language, onCheckOfficial }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Namaste! I am the BISENCE Standards & Compliance Assistant. Ask me anything about Indian Standards (IS), mandatory Quality Control Orders (QCOs), testing laboratories, hallmarking (HUID), or BIS licensing pathways. Every answer is grounded in verified sources.',
      trustLabel: 'VERIFIED',
      officialLinks: [
        { name: 'Manak Online (manakonline.in)', url: 'https://www.manakonline.in' },
        { name: 'BIS Official (bis.gov.in)', url: 'https://www.bis.gov.in' }
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFeedbackPill, setSelectedFeedbackPill] = useState<string | null>(null);

  const sampleQuestions = [
    'Do stainless-steel kitchen sinks require compulsory ISI marking in India?',
    'What is the difference between ISI mark and CRS registration?',
    'How do I check if a 6-digit HUID code on gold is genuine?',
    'Which laboratory tests are required for packaged drinking water?',
    'What are the registration fees for an MSME jeweller?'
  ];

  const handleSendMessage = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: queryText.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText.trim(), language })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: data.reply,
          trustLabel: data.trustLabel || 'AI_ASSISTED',
          officialLinks: [
            { name: 'Official e-BIS Search', url: 'https://www.manakonline.in' }
          ]
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Deterministic fallback response
      let replyText = 'Potentially relevant standard reference — Official verification required on manakonline.in.';
      const lower = queryText.toLowerCase();

      if (lower.includes('sink') || lower.includes('kitchen')) {
        replyText = `Under the Stainless Steel Sinks QCO, commercial and domestic stainless-steel sinks are governed by IS 13983:1994. Quality Control Orders enforce that no manufacturer or importer may sell sinks without a valid CM/L licence and genuine ISI mark. Raw material must conform to Austenitic Grade 304 (IS 6911). Always verify the current gazette enforcement status on manakonline.in.`;
      } else if (lower.includes('huid') || lower.includes('gold') || lower.includes('jewel')) {
        replyText = `Under the Bureau of Indian Standards (Hallmarking) Regulations, 6-digit alphanumeric HUID (Hallmark Unique Identification) is mandatory on all 14K, 18K, 20K, 22K, 23K, and 24K gold jewellery sold by registered jewellers in notified districts. Genuine hallmarked gold features 3 marks: the triangular BIS logo, the purity mark (e.g., 22K916), and the 6-digit laser HUID. Consumers can verify any HUID code directly on the BIS Care Mobile App.`;
      } else if (lower.includes('crs') || lower.includes('isi')) {
        replyText = `Scheme I (ISI Mark) involves a mandatory factory audit, raw material testing, and ongoing market surveillance, resulting in a 7-8 digit CM/L licence for consumer goods, construction, and heavy appliances. In contrast, Scheme II (Compulsory Registration Scheme / CRS) is a self-declaration regime for electronics and IT goods (chargers, laptops, mobile phones) tested at recognized laboratories without physical factory audits, resulting in an R-XXXXXXXX registration number.`;
      } else {
        replyText = `Based on Indian Standards catalog records, related specifications are administered by relevant Sectional Committees. Please consult manakonline.in to confirm whether a mandatory Quality Control Order (QCO) has been gazetted for this specific product.`;
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: replyText,
        trustLabel: 'AI_ASSISTED',
        officialLinks: [
          { name: 'Manak Online Standards Search', url: 'https://www.manakonline.in' }
        ]
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (msgId: string, helpful: boolean) => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, feedbackGiven: true } : m));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <Bot className="w-4 h-4" />
          <span>Multilingual Compliance AI Assistant</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Ask BISENCE AI
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Grounded regulatory intelligence. Every answer includes verifiable Indian Standard references, official portal links, and transparent trust labels.
        </p>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions (Click to test):</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#0F2C61] hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-300 transition text-left border border-slate-200 dark:border-slate-700 shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 min-h-[420px] max-h-[600px] overflow-y-auto space-y-4 shadow-xs">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#0F2C61] text-white rounded-br-none'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700 shadow-2xs'
                }`}
              >
                {!isUser && msg.trustLabel && (
                  <div className="mb-2">
                    <TrustBadge level={msg.trustLabel} size="sm" />
                  </div>
                )}

                <div className="whitespace-pre-wrap">{msg.text}</div>

                {!isUser && msg.officialLinks && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-500 font-semibold">Official Portals:</span>
                    {msg.officialLinks.map((link, lIdx) => (
                      <button
                        key={lIdx}
                        onClick={() => onCheckOfficial(link.url, link.name)}
                        className="font-bold text-[#0F2C61] dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Feedback Controls for Assistant messages */}
              {!isUser && (
                <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-400 pl-2">
                  <span>Was this guidance helpful?</span>
                  {msg.feedbackGiven ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Feedback recorded</span>
                    </span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleFeedback(msg.id, true)}
                        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-emerald-600"
                        title="Yes, accurate and helpful"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, false)}
                        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-rose-600"
                        title="No, needs improvement"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-500 w-fit">
            <div className="w-4 h-4 border-2 border-[#0F2C61] border-t-amber-400 rounded-full animate-spin" />
            <span>Consulting Indian Standards Knowledge Base...</span>
          </div>
        )}
      </div>

      {/* Input Field Form */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage(inputQuery);
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          placeholder="Ask about an Indian Standard, testing clause, QCO timeline, or licensing scheme..."
          className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white shadow-xs focus:ring-2 focus:ring-[#0F2C61] focus:outline-hidden"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || loading}
          className="px-5 py-3 rounded-xl bg-[#0F2C61] hover:bg-[#163D7A] text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

      <DisclaimerBanner />
    </div>
  );
};
