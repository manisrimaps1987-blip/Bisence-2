import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/TrustBadge';
import { MovingTextTicker, TickerItem } from '../components/MovingTextTicker';
import { 
  Gem, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  HelpCircle, 
  ExternalLink, 
  Building2,
  Sparkles,
  AlertCircle,
  Triangle
} from 'lucide-react';
import hallmarkImg from '../assets/images/hallmarking_gold_assay_1789717954100.jpg';

interface HallmarkingViewProps {
  onCheckOfficial: (url: string, name: string) => void;
}

export const HallmarkingView: React.FC<HallmarkingViewProps> = ({ onCheckOfficial }) => {
  const [huidInput, setHuidInput] = useState('');
  const [huidResult, setHuidResult] = useState<any | null>(null);
  const [journeyMode, setJourneyMode] = useState<'CONSUMER' | 'JEWELLER'>('CONSUMER');

  const goldPurityTable = [
    { karat: '24 Karat', fineness: '999', percentage: '99.9% Pure Gold', description: 'Bullion coins, bars, and pure investment gold' },
    { karat: '23 Karat', fineness: '958', percentage: '95.8% Pure Gold', description: 'Specialized traditional jewellery' },
    { karat: '22 Karat', fineness: '916', percentage: '91.6% Pure Gold', description: 'Most popular Indian wedding and daily jewellery' },
    { karat: '20 Karat', fineness: '833', percentage: '83.3% Pure Gold', description: 'Durable antique and gemstone-studded ornaments' },
    { karat: '18 Karat', fineness: '750', percentage: '75.0% Pure Gold', description: 'Modern diamond and gemstone fine jewellery' },
    { karat: '14 Karat', fineness: '585', percentage: '58.5% Pure Gold', description: 'Lightweight, high-tensile contemporary pieces' },
    { karat: '9 Karat', fineness: '375', percentage: '37.5% Pure Gold', description: 'Affordable modern everyday accessories' }
  ];

  const handleVerifyHuid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!huidInput.trim()) return;

    const code = huidInput.trim().toUpperCase();
    if (code.length !== 6) {
      setHuidResult({
        status: 'INVALID_FORMAT',
        message: 'A valid HUID code must be exactly 6 alphanumeric characters (e.g., AB12CD).'
      });
      return;
    }

    if (code.includes('99') || code.includes('XX')) {
      setHuidResult({
        status: 'NOT_FOUND',
        huid: code,
        message: 'No assay record matching this HUID in demo ledger. Confirm on official BIS Care App.'
      });
    } else {
      setHuidResult({
        status: 'VERIFIED',
        huid: code,
        articleType: 'Gold Bangle / Kada (Pair)',
        purity: '22K (916 Fineness)',
        jewellerName: 'Kalyan & Co. Certified Jewellers',
        ahcCenter: 'Central Assaying & Hallmarking Centre, Mumbai (AHC-4001)',
        hallmarkingDate: '12 January 2026',
        weightRecorded: '34.250 grams'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        {/* Official Header Banner with Gold Hallmarking Photo */}
        <div className="rounded-xl border-2 border-slate-300 p-6 bg-slate-50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF08A] border border-[#F59E0B] text-xs font-extrabold text-[#78350F]">
              <Gem className="w-4 h-4 text-[#B45309]" />
              <span>स्वर्ण एवं रजत हॉलमार्किंग | Precious Metals Conformity & Trust</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A3D91]">
              Gold & Silver Hallmarking (HUID) Navigator
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
              Understand mandatory 6-digit Hallmark Unique Identification (HUID), legal purity standards under IS 1417, and verify genuine hallmarked jewellery before purchase.
            </p>
          </div>

          <div className="w-full md:w-64 h-36 rounded-lg overflow-hidden border-2 border-[#0A3D91] shadow-md shrink-0 relative">
            <img 
              src={hallmarkImg} 
              alt="Assaying officer laser inspecting genuine gold hallmarking HUID code" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-[#0A3D91]/90 text-white text-[10px] font-bold text-center py-1">
              BIS Hallmarked 6-Digit HUID
            </div>
          </div>
        </div>

        {/* Hallmarking Moving Advisory Ticker */}
        <MovingTextTicker
          badgeHindi="हॉलमार्क चेतावनी"
          badgeText="Advisory"
          speedSeconds={40}
          variant="gold"
          items={[
            {
              id: 'hm-1',
              title: 'Mandatory District Rule: Sale of unhallmarked gold jewellery is legally prohibited across 343+ Indian districts under BIS Act 2016.',
              category: 'कानूनी नियम / Mandatory',
              date: 'Enforced'
            },
            {
              id: 'hm-2',
              title: 'Verify 3 Marks: 1. BIS Triangle Standard Logo, 2. Purity Fineness (e.g. 22K916), 3. 6-character laser-etched alphanumeric HUID.',
              category: 'जांच / Check'
            },
            {
              id: 'hm-3',
              title: 'Jewellers: Instant online registration on manakonline.in with zero government fee for micro-retailers in designated clusters.',
              category: 'ज्वैलर्स / Jewellers',
              url: 'https://www.manakonline.in',
              portalName: 'manakonline.in'
            },
            {
              id: 'hm-4',
              title: 'Consumer Redressal: If purity is found lower than marked, jeweller is liable to pay 2x compensation plus refund testing charges.',
              category: 'मुआवजा / Compensation'
            }
          ]}
          onItemClick={(url, name) => onCheckOfficial(url, name)}
        />

        {/* Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div className="flex rounded-lg border-2 border-slate-300 bg-slate-100 p-1 text-xs font-bold">
            <button
              onClick={() => setJourneyMode('CONSUMER')}
              className={`px-4 py-2 rounded-md transition cursor-pointer ${
                journeyMode === 'CONSUMER' 
                  ? 'bg-[#FEF08A] text-[#78350F] border border-[#F59E0B] shadow-2xs font-extrabold' 
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Consumer HUID Verification
            </button>
            <button
              onClick={() => setJourneyMode('JEWELLER')}
              className={`px-4 py-2 rounded-md transition cursor-pointer ${
                journeyMode === 'JEWELLER' 
                  ? 'bg-[#FEF08A] text-[#78350F] border border-[#F59E0B] shadow-2xs font-extrabold' 
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Jeweller Registration Workflow
            </button>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded bg-[#FEF08A] text-[#78350F] border border-[#F59E0B]">
            Mandatory in 343+ Indian Districts
          </span>
        </div>

        {journeyMode === 'CONSUMER' ? (
          <div className="space-y-8">
            {/* HUID Demo Verification Box */}
            <div className="p-6 rounded-xl bg-white border-2 border-slate-300 shadow-xs">
              <h2 className="text-base sm:text-lg font-extrabold text-[#0A3D91] mb-1">
                Verify 6-Digit HUID Laser Mark (Demo Simulator)
              </h2>
              <p className="text-xs text-slate-600 mb-4">
                Every hallmarked gold jewellery piece sold in India must carry a laser-engraved 6-character alphanumeric code.
              </p>

              <form onSubmit={handleVerifyHuid} className="flex flex-col sm:flex-row gap-2 max-w-lg mb-3">
                <input
                  type="text"
                  maxLength={6}
                  value={huidInput}
                  onChange={e => setHuidInput(e.target.value.toUpperCase())}
                  placeholder="Enter 6-character HUID (e.g. AB12CD)"
                  className="flex-1 px-3.5 py-2.5 rounded-lg border-2 border-[#0A3D91] bg-white text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-900 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[#0A3D91] hover:bg-[#072B68] text-white shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Verify HUID</span>
                </button>
              </form>

              <div className="flex gap-2 text-xs text-slate-500 font-semibold">
                <span>Try sample:</span>
                <button
                  type="button"
                  onClick={() => setHuidInput('AB12CD')}
                  className="text-[11px] underline text-[#0A3D91] font-mono font-bold cursor-pointer"
                >
                  AB12CD (Valid Gold Kada)
                </button>
                <button
                  type="button"
                  onClick={() => setHuidInput('XX9999')}
                  className="text-[11px] underline text-rose-600 font-mono font-bold cursor-pointer"
                >
                  XX9999 (Unregistered)
                </button>
              </div>

              {/* HUID Result */}
              {huidResult && (
                <div className="mt-5 p-4 rounded-xl border-2 animate-in fade-in text-xs">
                  {huidResult.status === 'VERIFIED' ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold px-3 py-1 rounded bg-[#FEF08A] text-[#78350F] border border-[#F59E0B] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>GENUINE HALLMARKED GOLD REGISTERED</span>
                        </span>
                        <span className="font-mono font-extrabold text-sm text-[#0A3D91]">
                          HUID: {huidResult.huid}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-[#FEF9C3] border border-amber-300 p-3.5 rounded-lg text-slate-800">
                        <div><strong>Article:</strong> {huidResult.articleType}</div>
                        <div><strong>Purity:</strong> {huidResult.purity}</div>
                        <div><strong>Registered Jeweller:</strong> {huidResult.jewellerName}</div>
                        <div><strong>Assaying Centre (AHC):</strong> {huidResult.ahcCenter}</div>
                        <div><strong>Hallmarking Date:</strong> {huidResult.hallmarkingDate}</div>
                        <div><strong>Assayed Gross Weight:</strong> {huidResult.weightRecorded}</div>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                        <span>Simulated snapshot. Official real-time lookup available on the BIS Care App.</span>
                        <button
                          onClick={() => onCheckOfficial('https://www.manakonline.in', 'Manak Online Hallmarking')}
                          className="font-bold text-[#0A3D91] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Official Hallmarking Portal</span>
                          <ExternalLink className="w-3 h-3 text-amber-600" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-rose-50 text-rose-900 rounded-lg border-2 border-rose-300">
                      <div className="font-bold mb-1 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>Verification Note</span>
                      </div>
                      {huidResult.message}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3 Mandatory Hallmarking Signs with Gold Background */}
            <div className="p-6 rounded-xl bg-[#FEF9C3] border-2 border-[#F59E0B] shadow-xs">
              <h3 className="text-base font-extrabold text-[#78350F] mb-2">
                The 3 Mandatory Marks on Genuine Gold Jewellery
              </h3>
              <p className="text-xs text-slate-800 mb-6">
                Under the Bureau of Indian Standards (Hallmarking) Regulations, every gold article sold by a registered jeweller must carry these three distinct marks:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white border-2 border-[#0A3D91] text-center shadow-xs">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#FEF08A] text-[#78350F] border border-[#F59E0B] flex items-center justify-center font-black text-xl mb-2">
                    <Triangle className="w-6 h-6 fill-[#78350F] text-[#78350F]" />
                  </div>
                  <h4 className="text-sm font-extrabold text-[#0A3D91] mb-1">1. BIS Standard Logo</h4>
                  <p className="text-xs text-slate-600">
                    Triangular standardized emblem indicating official conformity with Indian Standard IS 1417.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white border-2 border-[#0A3D91] text-center shadow-xs">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#FEF08A] text-[#78350F] border border-[#F59E0B] flex items-center justify-center font-bold text-xs mb-2">
                    22K916
                  </div>
                  <h4 className="text-sm font-extrabold text-[#0A3D91] mb-1">2. Purity & Fineness</h4>
                  <p className="text-xs text-slate-600">
                    Karatage and fineness mark (e.g. 22K916, 18K750, 14K585) confirming exact pure gold proportion.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white border-2 border-[#0A3D91] text-center shadow-xs">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#FEF08A] text-[#78350F] border border-[#F59E0B] flex items-center justify-center font-mono font-bold text-xs mb-2">
                    AB12CD
                  </div>
                  <h4 className="text-sm font-extrabold text-[#0A3D91] mb-1">3. 6-Digit HUID Code</h4>
                  <p className="text-xs text-slate-600">
                    Unique alphanumeric laser identification number guaranteeing traceability to the specific assaying centre.
                  </p>
                </div>
              </div>
            </div>

            {/* Gold Purity Standards Table */}
            <div className="bg-white rounded-xl border-2 border-slate-300 shadow-xs overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <h3 className="text-base font-extrabold text-[#0A3D91]">
                  Official Indian Standards Gold Fineness Scale (IS 1417)
                </h3>
                <span className="text-xs text-slate-600">
                  Authorized purities permitted for hallmarking in India
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FEF9C3] text-[#78350F] uppercase font-bold border-b border-amber-300">
                    <tr>
                      <th className="px-4 py-3">Karatage</th>
                      <th className="px-4 py-3">Fineness Value</th>
                      <th className="px-4 py-3">Purity Percentage</th>
                      <th className="px-4 py-3">Application & Usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {goldPurityTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-amber-50/50 transition">
                        <td className="px-4 py-3 font-bold text-[#0A3D91]">
                          {row.karat}
                        </td>
                        <td className="px-4 py-3 font-mono font-extrabold text-[#78350F]">
                          {row.fineness}
                        </td>
                        <td className="px-4 py-3 text-slate-800 font-semibold">
                          {row.percentage}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {row.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Jeweller Registration Journey */
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border-2 border-slate-300 shadow-xs">
              <h2 className="text-lg font-extrabold text-[#0A3D91] mb-2">
                Jeweller Registration Workflow on Manak Online
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed mb-6 max-w-2xl">
                Any jeweller selling gold or silver articles in mandatory hallmarked districts must register their sales outlet. Under government deregulation, zero registration fees are charged by BIS for jeweller registration.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#0A3D91] text-white flex items-center justify-center font-bold text-xs mb-2">1</div>
                  <h4 className="font-bold text-[#0A3D91] mb-1">Create e-BIS Account</h4>
                  <p className="text-slate-600">Sign up on manakonline.in with verified GSTIN, trade licence, and Aadhaar/PAN of proprietor.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#0A3D91] text-white flex items-center justify-center font-bold text-xs mb-2">2</div>
                  <h4 className="font-bold text-[#0A3D91] mb-1">Instant Certificate</h4>
                  <p className="text-slate-600">Upon online document verification, the digital Certificate of Registration is issued instantly without physical pre-inspection.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#0A3D91] text-white flex items-center justify-center font-bold text-xs mb-2">3</div>
                  <h4 className="font-bold text-[#0A3D91] mb-1">Tie-up with AHC</h4>
                  <p className="text-slate-600">Map your retail showroom to any BIS-recognized Assaying and Hallmarking Centre (AHC) to submit raw jewellery for testing.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#0A3D91] text-white flex items-center justify-center font-bold text-xs mb-2">4</div>
                  <h4 className="font-bold text-[#0A3D91] mb-1">Laser HUID Applied</h4>
                  <p className="text-slate-600">AHC conducts XRF and fire assay testing, assigns 6-digit HUID, and laser-marks each piece before showroom retail sale.</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">Statutory portal: e-BIS Hallmarking Module</span>
                <button
                  onClick={() => onCheckOfficial('https://www.manakonline.in/MANAK/hallmarkingNewAction', 'Jeweller Registration on Manak Online')}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-[#0A3D91] hover:bg-[#072B68] text-white flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Register Jeweller Showroom</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>
            </div>
          </div>
        )}

        <DisclaimerBanner />
      </div>
    </div>
  );
};
