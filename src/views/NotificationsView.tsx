import React, { useState } from 'react';
import { SAMPLE_NOTIFICATIONS } from '../data/notificationsData';
import { NotificationItem } from '../types';
import { DisclaimerBanner } from '../components/TrustBadge';
import { 
  Bell, 
  Search, 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  Calendar, 
  AlertTriangle, 
  FileText, 
  Archive,
  CheckCircle2
} from 'lucide-react';

interface NotificationsViewProps {
  onCheckOfficial: (url: string, name: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ onCheckOfficial }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['notif-1']);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const categories = [
    'All',
    'Quality Control Orders',
    'Public Alerts & Recalls',
    'Hallmarking',
    'Standards Updates',
    'Committee Drafts',
    'Laboratory Recognition',
    'Consumer Advisories',
    'Gazette Notices'
  ];

  const toggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(b => b !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  const term = searchTerm.toLowerCase().trim();
  const filtered = SAMPLE_NOTIFICATIONS.filter(n => {
    const standards = n.relevantStandards || [];
    const matchesSearch = !term ||
      n.title.toLowerCase().includes(term) ||
      n.summary.toLowerCase().includes(term) ||
      standards.some(s => s.toLowerCase().includes(term));

    const matchesCat = selectedCategory === 'All' || n.category === selectedCategory;

    const matchesBookmarks = !showBookmarksOnly || bookmarkedIds.includes(n.id);

    return matchesSearch && matchesCat && matchesBookmarks;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <Bell className="w-4 h-4" />
          <span>Regulatory Intelligence & Gazette Monitor</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Standards & QCO Notifications
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Live gazettes, Quality Control Orders, laboratory circulars, and consumer safety advisories.
            </p>
          </div>
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            DEMO GAZETTE FEED
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search notifications, QCO topics, or standard codes (e.g. IS 13983)..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition ${
                showBookmarksOnly
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Saved ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>

        {/* 8 Categories Filter Pills */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
            Filter by Regulation Domain:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-[#0F2C61] text-white shadow-2xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Displaying {filtered.length} notifications</span>
          <span>Official verification required on egazette.gov.in & bis.gov.in</span>
        </div>

        {filtered.map(notif => {
          const isSaved = bookmarkedIds.includes(notif.id);

          return (
            <div
              key={notif.id}
              className={`p-5 rounded-xl bg-white dark:bg-slate-900 border transition ${
                notif.isImportant
                  ? 'border-amber-400 dark:border-amber-700 shadow-2xs ring-1 ring-amber-400/30'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#0F2C61] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {notif.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{notif.publishedDate}</span>
                  </span>
                  {notif.isImportant && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center gap-1 border border-rose-300">
                      <AlertTriangle className="w-3 h-3" />
                      <span>CRITICAL COMPLIANCE DEADLINE</span>
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleBookmark(notif.id)}
                  className={`p-1.5 rounded-lg border transition ${
                    isSaved
                      ? 'bg-amber-50 text-amber-600 border-amber-300'
                      : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'
                  }`}
                  title={isSaved ? 'Remove Bookmark' : 'Bookmark Notification'}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {notif.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {notif.summary}
              </p>

              {/* Relevant Standards */}
              {notif.relevantStandards && notif.relevantStandards.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs">
                  <span className="text-slate-500 font-medium">Standards Impacted:</span>
                  {notif.relevantStandards.map((std: string, sIdx: number) => (
                    <span key={sIdx} className="font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {std}
                    </span>
                  ))}
                </div>
              )}

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-[11px] text-slate-500">
                  Authority: <strong>{notif.sourceBadge}</strong>
                </span>
                <button
                  onClick={() => onCheckOfficial(notif.officialSourceLink, notif.title)}
                  className="text-xs font-bold text-[#0F2C61] dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>View Official Gazette Order</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-8 text-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
            No notifications found for the current query or filter.
          </div>
        )}
      </div>

      {/* Archive Notice */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <Archive className="w-4 h-4 text-slate-500" />
          <span>Need historical Gazettes before 2024? Access the e-Gazette repository.</span>
        </div>
        <button
          onClick={() => onCheckOfficial('https://egazette.gov.in', 'The Gazette of India (egazette.gov.in)')}
          className="font-bold text-[#0F2C61] dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <span>Open e-Gazette Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
