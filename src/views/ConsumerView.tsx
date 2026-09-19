import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/TrustBadge';
import { MovingTextTicker } from '../components/MovingTextTicker';
import { 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  Smartphone, 
  FileWarning, 
  CheckCircle2, 
  HelpCircle, 
  ExternalLink,
  Send,
  Building,
  Calendar,
  Sparkles,
  Award,
  Check
} from 'lucide-react';
import consumerIsiImg from '../assets/images/consumer_isi_check_1789717994905.jpg';

interface ConsumerViewProps {
  onCheckOfficial: (url: string, name: string) => void;
}

export const ConsumerView: React.FC<ConsumerViewProps> = ({ onCheckOfficial }) => {
  const [activeTab, setActiveTab] = useState<'VERIFY' | 'UNDERSTAND' | 'ALERTS' | 'REPORT'>('VERIFY');
  const [cmlInput, setCmlInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<any | null>(null);

  // Report form state
  const [reportForm, setReportForm] = useState({
    productName: '',
    storeLocation: '',
    fakeMarkDetails: '',
    submitted: false
  });

  const handleVerifyCml = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmlInput.trim()) return;

    // Deterministic mock verification
    const input = cmlInput.trim().toUpperCase();
    if (input.includes('999') || input.includes('FAKE')) {
      setVerificationResult({
        status: 'INVALID_OR_NOT_FOUND',
        cmlNumber: input,
        message: 'No active BIS licence record found in demo registry. Potential counterfeit risk.'
      });
    } else {
      setVerificationResult({
        status: 'ACTIVE_VERIFIED',
        cmlNumber: input.startsWith('CM/L') ? input : `CM/L-${input}`,
        manufacturerName: 'Bharat Culinary Appliances Ltd.',
        factoryLocation: 'Plot 42, Sector 8, IMT Manesar, Gurugram, Haryana - 122050',
        standardCode: 'IS 13983:1994',
        standardTitle: 'Stainless Steel Sinks for Domestic and Commercial Purposes',
        validTill: '31 March 2027',
        isQcoEnforced: true,
        source: 'Demo Verification Snapshot (Sync with manakonline.in for real-time status)'
      });
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportForm(prev => ({ ...prev, submitted: true }));
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        {/* Official Citizen Masthead with Image */}
        <div className="rounded-xl border-2 border-slate-300 p-6 bg-slate-50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF08A] border border-[#F59E0B] text-xs font-extrabold text-[#78350F]">
              <ShieldCheck className="w-4 h-4 text-[#B45309]" />
              <span>उपभोक्ता संरक्षण एवं गुणवत्ता आश्वासन | Citizen Quality Assurance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A3D91]">
              Citizen Quality & ISI Mark Centre
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
              Learn how to identify genuine ISI quality marks, decode 7/8-digit CM/L licence numbers, check product safety recalls, and report substandard or fake products to protect Indian consumers.
            </p>
          </div>

          <div className="w-full md:w-64 h-36 rounded-lg overflow-hidden border-2 border-[#0A3D91] shadow-md shrink-0 relative">
            <img 
              src={consumerIsiImg} 
              alt="Consumer verifying genuine ISI mark certification on household appliance" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-[#0A3D91]/90 text-white text-[10px] font-bold text-center py-1">
              Verify ISI & HUID Before Buying
            </div>
          </div>
        </div>

        {/* Consumer Protection Moving Ticker */}
        <MovingTextTicker
          badgeHindi="उपभोक्ता सूचना"
          badgeText="Citizen Watch"
          speedSeconds={38}
          variant="gold"
          items={[
            {
              id: 'c-1',
              title: 'Always demand a GST tax invoice with the 6-digit HUID mentioned for gold jewellery purchases.',
              category: 'स्वर्ण / Gold HUID'
            },
            {
              id: 'c-2',
              title: 'Packaged Drinking Water (IS 14543) and Mineral Water (IS 13428) require mandatory ISI mark by law.',
              category: 'पेयजल / Drinking Water'
            },
            {
              id: 'c-3',
              title: 'Verify 7-digit CM/L numbers printed directly below the ISI mark on manakonline.in search portal.',
              category: 'सत्यापन / CM/L Check',
              url: 'https://www.manakonline.in',
              portalName: 'manakonline.in'
            },
            {
              id: 'c-4',
              title: 'Lodge complaints directly on BIS Care App or National Consumer Helpline 1915 for immediate inspection.',
              category: 'हेल्पलाइन / Helpline 1915'
            }
          ]}
          onItemClick={(url, name) => onCheckOfficial(url, name)}
        />

        {/* 4 Pillars Tab Switcher */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('VERIFY')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'VERIFY'
                ? 'bg-[#FEF08A] text-[#78350F] border border-[#F59E0B] shadow-2xs'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Verify Licence (CM/L)</span>
          </button>
          <button
            onClick={() => setActiveTab('UNDERSTAND')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'UNDERSTAND'
                ? 'bg-[#FEF08A] text-[#78350F] border border-[#F59E0B] shadow-2xs'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Anatomy of Genuine ISI</span>
          </button>
          <button
            onClick={() => setActiveTab('ALERTS')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ALERTS'
                ? 'bg-[#FEF08A] text-[#78350F] border border-[#F59E0B] shadow-2xs'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Product Recalls & Alerts</span>
          </button>
          <button
            onClick={() => setActiveTab('REPORT')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'REPORT'
                ? 'bg-[#FEF08A] text-[#78350F] border border-[#F59E0B] shadow-2xs'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <FileWarning className="w-3.5 h-3.5" />
            <span>Report Substandard Goods</span>
          </button>
        </div>

        {/* Tab 1: VERIFY */}
        {activeTab === 'VERIFY' && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border-2 border-slate-300 shadow-xs">
              <h2 className="text-base sm:text-lg font-extrabold text-[#0A3D91] mb-1">
                Demo Licence Verification Engine
              </h2>
              <p className="text-xs text-slate-600 mb-4">
                Enter any 7 or 8-digit CM/L licence number printed below the ISI mark on a product package to inspect its registration snapshot.
              </p>

              <form onSubmit={handleVerifyCml} className="flex flex-col sm:flex-row gap-2 max-w-xl mb-4">
                <input
                  type="text"
                  value={cmlInput}
                  onChange={e => setCmlInput(e.target.value)}
                  placeholder="e.g., CM/L-8400123456 or 8400123"
                  className="flex-1 px-3.5 py-2.5 rounded-lg border-2 border-[#0A3D91] bg-white text-xs sm:text-sm text-slate-900 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[#0A3D91] hover:bg-[#072B68] text-white shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Verify Licence</span>
                </button>
              </form>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-slate-500 font-bold">Try sample test codes:</span>
                <button
                  type="button"
                  onClick={() => setCmlInput('CM/L-8400123456')}
                  className="text-[11px] underline text-[#0A3D91] font-bold cursor-pointer"
                >
                  CM/L-8400123456 (Valid Active)
                </button>
                <button
                  type="button"
                  onClick={() => setCmlInput('CM/L-9990000000')}
                  className="text-[11px] underline text-rose-600 font-bold cursor-pointer"
                >
                  CM/L-9990000000 (Invalid / Flagged)
                </button>
              </div>

              {/* Verification Result Card */}
              {verificationResult && (
                <div className="mt-6 p-4 rounded-xl border-2 animate-in fade-in">
                  {verificationResult.status === 'ACTIVE_VERIFIED' ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FEF08A] text-[#78350F] text-xs font-extrabold border border-[#F59E0B]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>ACTIVE BIS LICENCE VERIFIED</span>
                        </span>
                        <span className="text-xs text-[#0A3D91] font-bold">{verificationResult.cmlNumber}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-800 bg-[#FEF9C3] border border-amber-300 p-4 rounded-lg">
                        <div>
                          <strong>Manufacturer:</strong> {verificationResult.manufacturerName}
                        </div>
                        <div>
                          <strong>Standard:</strong> {verificationResult.standardCode} ({verificationResult.standardTitle})
                        </div>
                        <div className="md:col-span-2">
                          <strong>Factory Address:</strong> {verificationResult.factoryLocation}
                        </div>
                        <div>
                          <strong>Validity Expiry:</strong> {verificationResult.validTill}
                        </div>
                        <div>
                          <strong>Mandatory QCO:</strong> Yes (Quality Control Order enforced)
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-2">
                        <span className="text-[11px] text-slate-500">{verificationResult.source}</span>
                        <button
                          onClick={() => onCheckOfficial('https://www.manakonline.in', 'Manak Online Official Licence Check')}
                          className="font-bold text-[#0A3D91] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Verify on Official BIS Portal</span>
                          <ExternalLink className="w-3 h-3 text-amber-600" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-rose-900 bg-rose-50 p-4 rounded-lg border-2 border-rose-300">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>Licence Not Found in Demo Database</span>
                      </div>
                      <p className="text-xs leading-relaxed">
                        {verificationResult.message} If this code appears on real merchandise in Indian retail, verify immediately via the official BIS Care App or file a consumer grievance.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* BIS Care App Hand-off Banner with Gold Accent */}
            <div className="p-5 rounded-xl bg-[#0A3D91] text-white border-t-4 border-[#F59E0B] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Use the Official BIS Care App</h3>
                  <p className="text-xs text-blue-100 mt-0.5">
                    Scan QR codes on jewellery (HUID) and products (ISI / CRS) directly with your smartphone camera.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onCheckOfficial('https://play.google.com/store/apps/details?id=com.bis.biscare', 'BIS Care Mobile App')}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-[#FEF08A] hover:bg-[#FDE047] text-[#78350F] border border-[#F59E0B] flex items-center gap-1.5 shrink-0 transition cursor-pointer"
              >
                <span>Get BIS Care App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: UNDERSTAND GENUINE ISI */}
        {activeTab === 'UNDERSTAND' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Visual Anatomy of Genuine ISI */}
              <div className="p-6 rounded-xl bg-white border-2 border-slate-300 shadow-xs flex flex-col items-center text-center">
                <h3 className="text-base font-extrabold text-[#0A3D91] mb-2">
                  Anatomy of a Genuine ISI Mark
                </h3>
                <p className="text-xs text-slate-600 mb-6 max-w-sm">
                  A genuine ISI mark must strictly feature three components. Any mark missing the standard code or CM/L number is invalid.
                </p>

                {/* Graphic Illustration */}
                <div className="w-56 p-5 rounded-xl bg-[#FEF9C3] border-2 border-[#F59E0B] flex flex-col items-center space-y-3">
                  {/* 1. IS Code at top */}
                  <div className="px-3 py-1 rounded bg-[#FEF08A] text-[#78350F] text-xs font-extrabold border border-[#F59E0B]">
                    IS 13983
                  </div>

                  {/* 2. Abstract Geometric ISI Monogram */}
                  <div className="w-20 h-20 rounded-lg bg-[#0A3D91] text-white flex flex-col items-center justify-center p-2 shadow-sm">
                    <div className="text-xl font-black tracking-tighter font-serif">ISI</div>
                    <div className="text-[9px] uppercase font-bold text-amber-300">Standard</div>
                  </div>

                  {/* 3. CM/L Number at bottom */}
                  <div className="px-3 py-1 rounded bg-white text-[#0A3D91] text-[11px] font-mono font-bold border-2 border-[#0A3D91]">
                    CM/L - 8400123456
                  </div>
                </div>

                <div className="mt-4 text-xs text-slate-700 max-w-sm">
                  <strong>Rule of Thumb:</strong> If a package only prints the letters "ISI" without the top IS code or bottom 7-8 digit CM/L number, it is not an authorized BIS certification.
                </div>
              </div>

              {/* Explanations & Common Frauds */}
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-white border-2 border-slate-300 shadow-xs">
                  <h4 className="text-sm font-extrabold text-[#0A3D91] mb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FEF08A] text-[#78350F] font-bold flex items-center justify-center text-xs border border-[#F59E0B]">1</span>
                    <span>What does CM/L mean?</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    CM/L stands for <strong>Certification of Marks / Licence</strong>. It is a unique 7-digit or 10-digit number assigned exclusively to a specific manufacturing unit and factory address. Two factories cannot share the same CM/L.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border-2 border-slate-300 shadow-xs">
                  <h4 className="text-sm font-extrabold text-[#0A3D91] mb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FEF08A] text-[#78350F] font-bold flex items-center justify-center text-xs border border-[#F59E0B]">2</span>
                    <span>CRS Registration Number (R-XXXXXXXX)</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    For IT and electronics (laptops, mobile chargers, LED lamps, smart watches), BIS operates the Compulsory Registration Scheme (CRS). These items bear a standard self-declaration mark with registration number starting with <strong>R-</strong> followed by 8 digits.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border-2 border-slate-300 shadow-xs">
                  <h4 className="text-sm font-extrabold text-[#0A3D91] mb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 font-bold flex items-center justify-center text-xs border border-rose-300">3</span>
                    <span>Common Counterfeit Deceptions</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Beware of statements like "Designed as per ISI standards" or "Conforming to IS 302" on packaging without an actual CM/L number. Self-claims without licensing violate the Bureau of Indian Standards Act, 2016.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: PRODUCT ALERTS & RECALLS */}
        {activeTab === 'ALERTS' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#FFFBEB] border-2 border-[#F59E0B] flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-800">
                <span className="font-extrabold text-sm text-[#78350F] block mb-1">Public Quality & Safety Advisory</span>
                Products listed below failed routine market surveillance testing or were found bearing unauthorized marks. Never purchase uncertified electric immersion rods, helmets, or domestic cookers.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border-2 border-slate-300 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Surveillance Failure
                </span>
                <h4 className="text-sm font-extrabold text-[#0A3D91] mt-2 mb-1">
                  Substandard Domestic Aluminium Pressure Cookers
                </h4>
                <p className="text-xs text-slate-600 mb-2">
                  Samples seized in regional markets lacked safety valves compliant with IS 2347:2017, presenting explosion hazards.
                </p>
                <div className="text-[11px] text-slate-500 font-semibold">Action: Licence cancelled and retail confiscation ordered.</div>
              </div>

              <div className="p-4 rounded-xl bg-white border-2 border-slate-300 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-[#78350F] bg-[#FEF08A] px-2 py-0.5 rounded border border-[#F59E0B]">
                  Unregistered Electronics
                </span>
                <h4 className="text-sm font-extrabold text-[#0A3D91] mt-2 mb-1">
                  Counterfeit Mobile Chargers & Adapters
                </h4>
                <p className="text-xs text-slate-600 mb-2">
                  Substandard power adapters lacking mandatory CRS registration under IS 13252 (Part 1):2010 found with severe shock risk.
                </p>
                <div className="text-[11px] text-slate-500 font-semibold">Action: Seizures under Section 28 of BIS Act, 2016.</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: REPORT SUBSTANDARD GOODS */}
        {activeTab === 'REPORT' && (
          <div className="p-6 rounded-xl bg-white border-2 border-slate-300 shadow-xs max-w-2xl">
            <h2 className="text-base sm:text-lg font-extrabold text-[#0A3D91] mb-1">
              File Substandard Quality Complaint
            </h2>
            <p className="text-xs text-slate-600 mb-4">
              Encountered a fake ISI mark, expired CM/L number, or unsafe product? Submit evidence for official investigation.
            </p>

            {reportForm.submitted ? (
              <div className="p-4 rounded-xl bg-[#FEF9C3] border border-[#F59E0B] text-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm text-[#78350F]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Complaint Recorded (Demo Mode)</span>
                </div>
                <p>
                  Your complaint regarding "{reportForm.productName}" has been logged for regional officer review.
                </p>
                <p className="font-semibold text-slate-700">
                  For official grievance redressal, please also file on the BIS Care App or email <span className="underline text-[#0A3D91]">complaints@bis.gov.in</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Description / Brand Name:</label>
                  <input
                    type="text"
                    required
                    value={reportForm.productName}
                    onChange={e => setReportForm(prev => ({ ...prev, productName: e.target.value }))}
                    placeholder="e.g., Unbranded electric immersion heater"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Store / Online Platform Name & Location:</label>
                  <input
                    type="text"
                    required
                    value={reportForm.storeLocation}
                    onChange={e => setReportForm(prev => ({ ...prev, storeLocation: e.target.value }))}
                    placeholder="e.g., Local hardware store, Main Bazaar, Jaipur"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nature of Defect or Fake Mark:</label>
                  <textarea
                    rows={3}
                    required
                    value={reportForm.fakeMarkDetails}
                    onChange={e => setReportForm(prev => ({ ...prev, fakeMarkDetails: e.target.value }))}
                    placeholder="Describe missing CM/L number, poor print, sparking, or absence of standard mark."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg font-bold bg-[#0A3D91] hover:bg-[#072B68] text-white shadow-xs transition flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Quality Report</span>
                </button>
              </form>
            )}
          </div>
        )}

        <div className="pt-4">
          <DisclaimerBanner />
        </div>
      </div>
    </div>
  );
};
