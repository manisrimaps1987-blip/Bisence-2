import React, { useState } from 'react';
import { SAMPLE_LABS } from '../data/labsData';
import { LabItem } from '../types';
import { TrustBadge, DisclaimerBanner } from '../components/TrustBadge';
import { 
  FlaskConical, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Building2, 
  ShieldCheck,
  Filter,
  RotateCcw
} from 'lucide-react';
import labImg from '../assets/images/laboratory_testing_nabl_1789717935649.jpg';

interface LabFinderViewProps {
  onCheckOfficial: (url: string, name: string) => void;
}

export const LabFinderView: React.FC<LabFinderViewProps> = ({ onCheckOfficial }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');

  const regions = ['All', 'North', 'West', 'South', 'East', 'Central'];
  const disciplines = ['All', 'Mechanical', 'Chemical', 'Electrical', 'Electronics', 'Biological'];

  const term = searchTerm.toLowerCase().trim();
  const filteredLabs = SAMPLE_LABS.filter(lab => {
    const labCity = lab.city || '';
    const labState = lab.state || '';
    const labDisciplines = lab.disciplines || (lab.discipline ? [lab.discipline] : []);
    const labStandards = lab.applicableStandards || (lab.scope ? [lab.scope] : []);

    const matchesSearch = !term ||
      lab.name.toLowerCase().includes(term) ||
      labCity.toLowerCase().includes(term) ||
      labState.toLowerCase().includes(term) ||
      labDisciplines.some(d => d.toLowerCase().includes(term)) ||
      labStandards.some(s => s.toLowerCase().includes(term));

    const matchesRegion = selectedRegion === 'All' || lab.region.toLowerCase().includes(selectedRegion.toLowerCase());
    const matchesDiscipline = selectedDiscipline === 'All' || labDisciplines.some(d => d.toLowerCase().includes(selectedDiscipline.toLowerCase()));

    return matchesSearch && matchesRegion && matchesDiscipline;
  });

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        {/* Official Header Banner with Laboratory Photo */}
        <div className="rounded-xl border-2 border-slate-300 p-6 bg-slate-50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF08A] border border-[#F59E0B] text-xs font-extrabold text-[#78350F]">
              <FlaskConical className="w-4 h-4 text-[#B45309]" />
              <span>मानक परीक्षण प्रयोगशालाएं | NABL & BIS Recognized Testing Labs</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A3D91]">
              Testing Laboratory Finder
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
              Locate government, BIS-recognized, and NABL-accredited testing laboratories across India to execute mandatory sample testing and conformity assessments under Indian Standards.
            </p>
          </div>

          <div className="w-full md:w-64 h-36 rounded-lg overflow-hidden border-2 border-[#0A3D91] shadow-md shrink-0 relative">
            <img 
              src={labImg} 
              alt="BIS recognized high-precision laboratory testing facility" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-[#0A3D91]/90 text-white text-[10px] font-bold text-center py-1">
              National Laboratory Network
            </div>
          </div>
        </div>

        {/* Highlighted Statutory Public Notice */}
        <div className="p-4 rounded-xl bg-[#FEF9C3] border-2 border-[#F59E0B] text-xs text-slate-800 flex items-start gap-3 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-sm text-[#78350F] block mb-1">
              Statutory Scope Advisory for Manufacturers & Importers:
            </span>
            Always confirm current accreditation validity and specific IS clause testing capabilities directly through the official BIS Laboratory Information Management System (LIMS) on <strong>manakonline.in</strong> or NABL portal before dispatching commercial test batches.
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-5 rounded-xl bg-slate-50 border-2 border-slate-300 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#0A3D91] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by lab name, city, state, or standard (e.g. 'IS 13983', 'Bangalore', 'Mechanical', 'Chemical')..."
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border-2 border-[#0A3D91] bg-white text-xs sm:text-sm text-slate-900 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Region:</label>
              <select
                value={selectedRegion}
                onChange={e => setSelectedRegion(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium"
              >
                {regions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Discipline:</label>
              <select
                value={selectedDiscipline}
                onChange={e => setSelectedDiscipline(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium"
              >
                {disciplines.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="flex items-end">
              {(selectedRegion !== 'All' || selectedDiscipline !== 'All' || searchTerm) && (
                <button
                  onClick={() => { setSelectedRegion('All'); setSelectedDiscipline('All'); setSearchTerm(''); }}
                  className="w-full p-2 rounded-lg bg-[#FEF08A] hover:bg-[#FDE047] border border-[#F59E0B] text-[#78350F] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-600 flex items-center justify-between border-b border-slate-200 pb-2">
            <span>Found {filteredLabs.length} testing laboratories matching criteria</span>
            <span className="text-[#78350F] bg-[#FEF08A] px-2 py-0.5 rounded border border-[#F59E0B] text-[11px]">Demo Registry</span>
          </div>

          {filteredLabs.map(lab => (
            <div
              key={lab.id}
              className="p-5 rounded-xl bg-white border-2 border-slate-300 shadow-xs space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-[#FEF08A] text-[#78350F] border border-[#F59E0B]">
                      {lab.region} Region
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      Accreditation: {lab.accreditationNumber || 'NABL/BIS-REC-2024'}
                    </span>
                    <TrustBadge level={lab.trustLabel} size="sm" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#0A3D91]">
                    {lab.name}
                  </h3>
                </div>

                <button
                  onClick={() => onCheckOfficial(lab.officialLimsUrl || lab.officialLink || 'https://www.manakonline.in', `${lab.name} on LIMS`)}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-[#0A3D91] hover:bg-[#072B68] text-white flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                >
                  <span>Verify Scope on LIMS</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>

              {/* Address & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700 bg-slate-50 border border-slate-200 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{lab.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{lab.contactPhone || '+91 (011) 2323-0131'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#0A3D91] shrink-0" />
                  <span>{lab.contactEmail}</span>
                </div>
              </div>

              {/* Disciplines and Standards */}
              <div className="space-y-2 text-xs pt-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-bold text-slate-800">Disciplines:</span>
                  {(lab.disciplines || (lab.discipline ? [lab.discipline] : [])).map((d: string, i: number) => (
                    <span key={i} className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold border border-slate-300">
                      {d}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-bold text-slate-800">Testing Scope / Standards:</span>
                  {(lab.applicableStandards || (lab.scope ? lab.scope.split(', ') : [])).map((std: string, i: number) => (
                    <span key={i} className="font-mono font-bold px-2 py-0.5 rounded bg-[#FEF08A] text-[#78350F] border border-[#F59E0B]">
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <DisclaimerBanner />
      </div>
    </div>
  );
};
