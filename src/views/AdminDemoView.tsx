import React from 'react';
import { DisclaimerBanner } from '../components/TrustBadge';
import { 
  SlidersHorizontal, 
  Search, 
  BookOpen, 
  Bell, 
  ThumbsUp, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck,
  CheckCircle2,
  Users
} from 'lucide-react';

export const AdminDemoView: React.FC = () => {
  const topCategories = [
    { name: 'Kitchen & Food Service Utensils', count: 1842, percentage: 88 },
    { name: 'Household Electrical Appliances', count: 1420, percentage: 68 },
    { name: 'Gold & Jewellery Hallmarking (HUID)', count: 1195, percentage: 56 },
    { name: 'Electronics & IT Products (CRS)', count: 980, percentage: 46 },
    { name: 'Plumbing & Sanitaryware', count: 640, percentage: 30 }
  ];

  const knowledgeGapAlerts = [
    {
      query: 'Lithium battery pack storage in extreme desert conditions',
      category: 'Energy Storage & Electric Vehicles',
      committee: 'Electrotechnical Division (ETD)',
      status: 'Draft Standard Formulation Underway'
    },
    {
      query: 'Smart biodegradable polymers for agricultural mulch films',
      category: 'Plastics & Petrochemicals',
      committee: 'Petroleum, Coal and Related Products (PCD)',
      status: 'PCD 12 Reviewing ISO Harmonization'
    },
    {
      query: 'AI diagnostic medical equipment software safety classification',
      category: 'Medical Equipment & Hospital Planning',
      committee: 'Medical Equipment and Hospital Planning (MHD)',
      status: 'Inter-ministerial Expert Committee Convened'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Operational Telemetry & System Oversight</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Platform Analytics & Administrative Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Real-time monitoring of citizen queries, standard discoveries, feedback accuracy, and standards knowledge gaps.
            </p>
          </div>
          <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            DEMO ADMIN VIEW
          </span>
        </div>
      </div>

      {/* 5 Core Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Intake Queries</span>
            <Search className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">24,580</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-600 inline" />
            <span>+18.4% this month</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Standards Searched</span>
            <BookOpen className="w-4 h-4 text-[#0F2C61] dark:text-blue-300" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">8,920</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">IS 13983 top searched</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Notifications Viewed</span>
            <Bell className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">12,410</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Cookware QCO spike</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Citizen Feedback Score</span>
            <ThumbsUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">96.8%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Positive helpfulness</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Active MSME Accounts</span>
            <Users className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">3,140</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Across 24 States</div>
        </div>
      </div>

      {/* Top Categories Distribution Bar Chart */}
      <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Most Searched Product & Standard Categories
            </h2>
            <p className="text-xs text-slate-500">Breakdown of consumer and manufacturer intake traffic</p>
          </div>
          <span className="text-xs font-semibold text-[#0F2C61] dark:text-blue-400">Past 30 Days</span>
        </div>

        <div className="space-y-3 pt-2">
          {topCategories.map((cat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800 dark:text-slate-200">{cat.name}</span>
                <span className="text-slate-500">{cat.count.toLocaleString()} searches ({cat.percentage}%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#0F2C61] to-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Knowledge Gap & Emerging Standards Alerts */}
      <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Knowledge Gap Alerts & Emerging Standards Requests
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-300">
            Sectional Committee Triage
          </span>
        </div>
        <p className="text-xs text-slate-500">
          User queries where no exact Indian Standard was found, flagged automatically for sectional technical committee review.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Unmatched Citizen/MSME Query</th>
                <th className="px-4 py-3">Industry Domain</th>
                <th className="px-4 py-3">Assigned Committee</th>
                <th className="px-4 py-3">Standardization Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {knowledgeGapAlerts.map((gap, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                    "{gap.query}"
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {gap.category}
                  </td>
                  <td className="px-4 py-3 font-mono text-[#0F2C61] dark:text-blue-300 font-bold">
                    {gap.committee}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {gap.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
