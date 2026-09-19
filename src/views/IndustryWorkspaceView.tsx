import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/TrustBadge';
import { 
  Building2, 
  PlusCircle, 
  FileCheck, 
  AlertCircle, 
  Bell, 
  Download, 
  ExternalLink, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Trash2,
  Filter
} from 'lucide-react';

interface WorkspaceProduct {
  id: string;
  name: string;
  category: string;
  dnaConfidence: number;
  relevantStandards: string[];
  stage: 'Discovery' | 'Technical Docs' | 'Lab Testing' | 'Application Filing' | 'Certified';
  stageColor: string;
  openActions: number;
  lastUpdated: string;
}

interface IndustryWorkspaceViewProps {
  onNavigate: (tab: string) => void;
  onCheckOfficial: (url: string, name: string) => void;
  onNewAnalysis: (productName: string) => void;
}

export const IndustryWorkspaceView: React.FC<IndustryWorkspaceViewProps> = ({
  onNavigate,
  onCheckOfficial,
  onNewAnalysis
}) => {
  const [products, setProducts] = useState<WorkspaceProduct[]>([
    {
      id: 'prod-1',
      name: 'Commercial Stainless Steel Sink Model CS-400',
      category: 'Kitchen Equipment',
      dnaConfidence: 94,
      relevantStandards: ['IS 13983:1994'],
      stage: 'Technical Docs',
      stageColor: 'bg-amber-100 text-amber-800 border-amber-300',
      openActions: 2,
      lastUpdated: 'Today'
    },
    {
      id: 'prod-2',
      name: 'Electric Food Mixer Grinder 750W Heavy Duty',
      category: 'Household Electrical',
      dnaConfidence: 92,
      relevantStandards: ['IS 302-2-14:2009', 'IS 302-1:2008'],
      stage: 'Lab Testing',
      stageColor: 'bg-blue-100 text-blue-800 border-blue-300',
      openActions: 3,
      lastUpdated: 'Yesterday'
    },
    {
      id: 'prod-3',
      name: 'Hard Anodized Domestic Pressure Cooker 5L',
      category: 'Domestic Cookware',
      dnaConfidence: 96,
      relevantStandards: ['IS 2347:2017'],
      stage: 'Application Filing',
      stageColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      openActions: 1,
      lastUpdated: '3 days ago'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Kitchen Equipment');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const newProd: WorkspaceProduct = {
      id: `prod-${Date.now()}`,
      name: newProductName.trim(),
      category: newProductCategory,
      dnaConfidence: 85,
      relevantStandards: ['IS Standards Pending Verification'],
      stage: 'Discovery',
      stageColor: 'bg-slate-100 text-slate-800 border-slate-300',
      openActions: 4,
      lastUpdated: 'Just now'
    };

    setProducts([newProd, ...products]);
    setShowAddModal(false);
    onNewAnalysis(newProductName.trim());
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleExportSummary = () => {
    const textContent = `BISENCE - MSME Compliance Summary Report
Generated: ${new Date().toLocaleDateString()}
Total Products in Scope: ${products.length}

${products.map(p => `Product: ${p.name}
Category: ${p.category}
Stage: ${p.stage}
DNA Confidence: ${p.dnaConfidence}%
Standards: ${p.relevantStandards.join(', ')}
Open Actions Pending: ${p.openActions}
----------------------------------------`).join('\n\n')}

Notice: BISENCE provides non-statutory compliance roadmap assistance. Official certification must be filed via manakonline.in.`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BISENCE_MSME_Compliance_Summary_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        {/* Header */}
        <div className="border-b-2 border-slate-200 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF08A] border border-[#F59E0B] text-xs font-extrabold text-[#78350F] mb-2">
            <Building2 className="w-4 h-4 text-[#B45309]" />
            <span>उद्योग एवं एमएसएमई कंसोल | Industry & MSME Operations Console</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A3D91]">
                My Products & Compliance Portfolio
              </h1>
              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                Track multi-product Indian Standards discovery, documentation binders, testing milestones, and mandatory QCO deadlines.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleExportSummary}
                className="px-4 py-2 rounded-lg text-xs font-bold text-[#78350F] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#F59E0B] flex items-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Summary</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-[#0A3D91] hover:bg-[#072B68] text-white flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-amber-300" />
                <span>Create Product Profile</span>
              </button>
            </div>
          </div>
        </div>

      {/* 4 Workspace Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Products in Scope</span>
            <Building2 className="w-4 h-4 text-[#0F2C61] dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{products.length}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">3 active in roadmap</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Actions Pending</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">6</div>
          <div className="text-[11px] text-amber-600 font-medium mt-1">Calibration & Lab tests required</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>QCOs Affecting Category</span>
            <Bell className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">2</div>
          <div className="text-[11px] text-rose-600 font-medium mt-1">Mandatory ISI marking enforced</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Documentation Readiness</span>
            <FileCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">74%</div>
          <div className="text-[11px] text-slate-500 mt-1">Across active dossiers</div>
        </div>
      </div>

      {/* My Products Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Monitored Product Portfolio
          </h2>
          <span className="text-xs text-slate-500">
            Click "Resume Journey" to calibrate milestones
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">DNA Confidence</th>
                <th className="px-4 py-3">Relevant Standards</th>
                <th className="px-4 py-3">Compliance Stage</th>
                <th className="px-4 py-3">Open Actions</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{p.name}</div>
                    <div className="text-[10px] text-slate-400">Updated: {p.lastUpdated}</div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300 font-medium">
                    {p.category}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${p.dnaConfidence}%` }} />
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{p.dnaConfidence}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {p.relevantStandards.map((std, idx) => (
                        <span key={idx} className="font-mono text-[11px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-[#0F2C61] dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                          {std}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${p.stageColor}`}>
                      {p.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                      {p.openActions} tasks
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onNavigate('journey')}
                        className="px-2.5 py-1 rounded bg-[#0F2C61] hover:bg-[#163D7A] text-white font-semibold text-[11px] transition flex items-center gap-1"
                      >
                        <span>Resume Journey</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Create New Product Profile
            </h3>
            <p className="text-xs text-slate-500">
              Enter product specifications to trigger the Smart Intake Engine and generate a tailored BIS readiness roadmap.
            </p>

            <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Product Description / Model Name
                </label>
                <input
                  type="text"
                  required
                  value={newProductName}
                  onChange={e => setNewProductName(e.target.value)}
                  placeholder="e.g., Commercial Dishwasher 24V with sanitizer pump"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Primary Category
                </label>
                <select
                  value={newProductCategory}
                  onChange={e => setNewProductCategory(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Kitchen Equipment">Kitchen & Food Service</option>
                  <option value="Household Electrical">Electrical & Electronics</option>
                  <option value="Domestic Cookware">Domestic Cookware & Utensils</option>
                  <option value="Civil & Plumbing">Plumbing & Sanitaryware</option>
                  <option value="Consumer Goods">Consumer Toys & Plastics</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg font-bold bg-[#0F2C61] hover:bg-[#163D7A] text-white"
                >
                  Create & Analyze
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DisclaimerBanner />
    </div>
  </div>
  );
};
