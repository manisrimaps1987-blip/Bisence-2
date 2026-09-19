import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SAMPLE_NOTIFICATIONS } from '../data/notificationsData';
import { DisclaimerBanner } from '../components/TrustBadge';
import { MovingTextTicker } from '../components/MovingTextTicker';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  FlaskConical, 
  Gem, 
  Compass, 
  FileCheck, 
  Bell, 
  ExternalLink, 
  FileText,
  Shield,
  HelpCircle,
  Landmark,
  CheckCircle2,
  Award,
  Calendar,
  Clock,
  Megaphone,
  AlertTriangle,
  Newspaper,
  Users,
  UserCheck,
  BookOpen,
  Smartphone,
  Globe,
  Library,
  GraduationCap,
  Layers,
  X,
  Radio,
  PhoneCall,
  Info
} from 'lucide-react';

// Official Government Portal Images
import bisGovHeroImg from '../assets/images/bis_gov_headquarters_1789717915753.jpg';
import labTestingImg from '../assets/images/laboratory_testing_nabl_1789717935649.jpg';
import hallmarkingImg from '../assets/images/hallmarking_gold_assay_1789717954100.jpg';
import factoryAuditImg from '../assets/images/factory_quality_audit_1789717971374.jpg';
import consumerIsiImg from '../assets/images/consumer_isi_check_1789717994905.jpg';

interface HomeViewProps {
  language: LanguageCode;
  onAnalyzeProduct: (desc: string) => void;
  onNavigate: (tab: string) => void;
  onCheckOfficial: (url: string, name: string) => void;
}

interface QuickAccessItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  actionType: 'navigate' | 'official' | 'modal';
  target: string;
  description: string;
  officialUrl?: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  language,
  onAnalyzeProduct,
  onNavigate,
  onCheckOfficial
}) => {
  const [productDesc, setProductDesc] = useState('');
  const [selectedNotifFilter, setSelectedNotifFilter] = useState('All');
  const [selectedQuickItem, setSelectedQuickItem] = useState<QuickAccessItem | null>(null);
  const [showJanSunvaiModal, setShowJanSunvaiModal] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleAnalyze = () => {
    const textToAnalyze = productDesc.trim() || 'I manufacture stainless-steel kitchen equipment for commercial restaurants.';
    onAnalyzeProduct(textToAnalyze);
  };

  const handleSearchClick = () => {
    if (productDesc.trim()) {
      onAnalyzeProduct(productDesc.trim());
    } else {
      onNavigate('discover');
    }
  };

  // What's New 6 Updates
  const whatsNewUpdates = [
    {
      id: 'wn-1',
      title: 'Grant of All India First Licence for Carbon Black IS 17440:2020',
      category: 'First Licence',
      standard: 'IS 17440:2020',
      date: 'Latest Grant',
      description: 'Bureau of Indian Standards has granted the All India First Licence for Carbon Black used in the rubber and automotive tyre industry under Scheme-I.',
      isNew: true
    },
    {
      id: 'wn-2',
      title: 'Grant for Rigid PVC Sheets IS 6307:2023',
      category: 'Product Licence',
      standard: 'IS 6307:2023',
      date: 'Latest Grant',
      description: 'First domestic manufacturing licence awarded for unplasticized rigid polyvinyl chloride (PVC) sheets for industrial, chemical and building applications.',
      isNew: true
    },
    {
      id: 'wn-3',
      title: 'Grant for Rubber Hot Water Bottles IS 1867:2023',
      category: 'Consumer Safety',
      standard: 'IS 1867:2023',
      date: 'Latest Grant',
      description: 'Statutory licence granted ensuring strict compliance with burst-pressure, seam endurance, and temperature-retention safety parameters.',
      isNew: true
    },
    {
      id: 'wn-4',
      title: 'Grant for Cylinder Cartridges IS 18841',
      category: 'Industrial Standard',
      standard: 'IS 18841:2024',
      date: 'Latest Grant',
      description: 'All India Licence issued for refillable and non-refillable metallic gas cylinder cartridges complying with PESO safety norms.',
      isNew: true
    },
    {
      id: 'wn-5',
      title: 'Hallmarking of Gold Jewellery Second Amendment Order 2026',
      category: 'Gazette Order',
      standard: 'IS 1417 / IS 15820',
      date: 'Statutory Order',
      description: 'Department of Consumer Affairs notifies phase expansion of mandatory 6-digit laser HUID hallmarking covering additional districts across India.',
      isNew: true
    },
    {
      id: 'wn-6',
      title: 'Stakeholder Consultation Webinar on IS 5175',
      category: 'Public Consultation',
      standard: 'IS 5175 (Revision)',
      date: 'Upcoming Session',
      description: 'Technical sectional committee invites manufacturers and marine industry stakeholders for open review of Polypropylene Ropes standards.',
      isNew: false
    }
  ];

  // 17 Quick Access Grid Items
  const quickAccessItems: QuickAccessItem[] = [
    {
      id: 'qa-1',
      title: 'Standards Watch',
      subtitle: 'Track revisions & amendments',
      icon: Compass,
      badge: 'Live',
      actionType: 'navigate',
      target: 'discover',
      description: 'Monitor drafts under wide circulation, emergent standard revisions, and sectional committee voting schedules.'
    },
    {
      id: 'qa-2',
      title: 'Monthly BIS Newsletter',
      subtitle: 'Official Manak Bulletin',
      icon: Newspaper,
      actionType: 'modal',
      target: 'newsletter',
      description: 'Monthly publication covering national quality milestones, newly formulated standards, committee resolutions, and laboratory upgrades.',
      officialUrl: 'https://www.bis.gov.in/newsletter'
    },
    {
      id: 'qa-3',
      title: 'Join Sectional Committee',
      subtitle: 'Participate as technical expert',
      icon: Users,
      badge: 'Experts',
      actionType: 'modal',
      target: 'sectional-committee',
      description: 'Industry experts, technologists, and academicians can apply to serve on Bureau of Indian Standards Sectional Formulation Committees.',
      officialUrl: 'https://www.manakonline.in'
    },
    {
      id: 'qa-4',
      title: 'Join as Young Professional',
      subtitle: 'BIS YP recruitment & career',
      icon: UserCheck,
      badge: 'Careers',
      actionType: 'modal',
      target: 'young-professional',
      description: 'Dynamic engineering and science graduates can collaborate with BIS departments on standard formulation and digital conformity assessments.',
      officialUrl: 'https://www.bis.gov.in/careers'
    },
    {
      id: 'qa-5',
      title: 'Know your Standard',
      subtitle: 'Clause lookup & scope',
      icon: BookOpen,
      actionType: 'navigate',
      target: 'discover',
      description: 'Search and read the scope, referenced test standards, and mandatory clauses of over 22,000 published Indian Standards.'
    },
    {
      id: 'qa-6',
      title: 'ISI Mark / Compulsory Cert.',
      subtitle: 'Conformity Scheme-I & CRS',
      icon: ShieldCheck,
      badge: 'Mandatory',
      actionType: 'navigate',
      target: 'industry',
      description: 'Complete guidance on obtaining the ISI Mark under Scheme-I and Compulsory Registration Scheme (CRS) for electronics.'
    },
    {
      id: 'qa-7',
      title: 'Hallmarking',
      subtitle: 'Centres / Jewellers / Districts',
      icon: Gem,
      badge: 'HUID',
      actionType: 'navigate',
      target: 'hallmarking',
      description: 'Check list of 343+ mandatory hallmarking districts, search 1,500+ Assaying & Hallmarking Centres (AHC), and verify 6-digit HUID.'
    },
    {
      id: 'qa-8',
      title: 'Training Calendar',
      subtitle: 'NITS courses for industry',
      icon: Calendar,
      actionType: 'modal',
      target: 'training-calendar',
      description: 'National Institute of Training for Standardization (NITS) provides professional courses on auditing, quality management, and ISO standards.',
      officialUrl: 'https://www.bis.gov.in/nits'
    },
    {
      id: 'qa-9',
      title: 'Product Capsules for SMEs',
      subtitle: 'Step-by-step guidance capsules',
      icon: Layers,
      badge: 'MSME',
      actionType: 'navigate',
      target: 'journey',
      description: 'Tailored manufacturing capsules explaining factory quality testing, raw material checks, and testing infrastructure required for small enterprises.'
    },
    {
      id: 'qa-10',
      title: 'BIS Care App',
      subtitle: 'Verify ISI, CRS & HUID on mobile',
      icon: Smartphone,
      badge: 'Mobile',
      actionType: 'official',
      target: 'https://play.google.com/store/apps/details?id=com.bis.biscare',
      description: 'Official Government of India Android/iOS app to verify CM/L licences, registration numbers, and 6-digit HUID authenticity instantly.',
      officialUrl: 'https://play.google.com/store/apps/details?id=com.bis.biscare'
    },
    {
      id: 'qa-11',
      title: 'Complaints (Lodge / Track)',
      subtitle: 'Grievance redressal portal',
      icon: AlertTriangle,
      actionType: 'navigate',
      target: 'consumer',
      description: 'Lodge formal complaints against counterfeit ISI marks, substandard products, or misleading purity claims with direct tracking.'
    },
    {
      id: 'qa-12',
      title: 'eBIS Portal',
      subtitle: 'Online licence application',
      icon: Globe,
      actionType: 'official',
      target: 'https://www.manakonline.in',
      description: 'Statutory end-to-end portal for filing applications, scheduling factory audits, tracking lab test reports, and paying government fees.',
      officialUrl: 'https://www.manakonline.in'
    },
    {
      id: 'qa-13',
      title: 'Catalogue of Standards',
      subtitle: 'Complete repository & pricing',
      icon: Library,
      actionType: 'navigate',
      target: 'discover',
      description: 'Search complete subject catalogue across 15 Division Councils ranging from Civil Engineering to Electrotechnical and Textiles.'
    },
    {
      id: 'qa-14',
      title: 'Standards Clubs',
      subtitle: 'Schools & college initiatives',
      icon: GraduationCap,
      actionType: 'modal',
      target: 'standards-clubs',
      description: 'Educational initiative reaching over 10,000 schools across India to cultivate scientific temper, consumer rights, and quality consciousness among youth.',
      officialUrl: 'https://www.bis.gov.in/standards-clubs'
    },
    {
      id: 'qa-15',
      title: 'Internship with BIS',
      subtitle: 'National internship program',
      icon: Award,
      actionType: 'modal',
      target: 'internship',
      description: 'Hands-on experiential learning for engineering, law, chemistry, and management students in standard formulation and conformity assessment.',
      officialUrl: 'https://www.bis.gov.in/internships'
    },
    {
      id: 'qa-16',
      title: 'All India First Licences',
      subtitle: 'Pioneering manufacturers',
      icon: CheckCircle2,
      actionType: 'modal',
      target: 'first-licences',
      description: 'Official hall of pioneering domestic manufacturers who received the first national ISI licence for freshly formulated Indian Standards.'
    },
    {
      id: 'qa-17',
      title: 'Gram Panchayat Portal',
      subtitle: 'Rural quality awareness',
      icon: Building2,
      actionType: 'modal',
      target: 'gram-panchayat',
      description: 'Empowering village local bodies and rural consumers to recognize genuine ISI certified seeds, piping, fertilizers, and consumer appliances.',
      officialUrl: 'https://www.bis.gov.in/gram-panchayat'
    }
  ];

  const handleQuickItemClick = (item: QuickAccessItem) => {
    if (item.actionType === 'navigate') {
      onNavigate(item.target);
    } else if (item.actionType === 'official' && item.officialUrl) {
      onCheckOfficial(item.officialUrl, item.title);
    } else {
      setSelectedQuickItem(item);
    }
  };

  const audienceCards = [
    {
      title: 'Industry & MSMEs',
      desc: 'Identify applicable Indian Standards, calculate testing scopes, and streamline QCO compliance.',
      icon: Building2,
      tab: 'industry',
      badge: 'Manufacturers',
      image: factoryAuditImg,
      alt: 'Indian factory quality assurance and manufacturing compliance audit'
    },
    {
      title: 'Citizen & Consumers',
      desc: 'Verify genuine ISI markings, understand CM/L licences, and report substandard or fake products.',
      icon: Shield,
      tab: 'consumer',
      badge: 'Public Protection',
      image: consumerIsiImg,
      alt: 'Consumer checking genuine ISI certification stamp on appliances and helmets'
    },
    {
      title: 'Testing Laboratories',
      desc: 'Discover NABL & BIS-recognized testing laboratories across India by discipline and testing scope.',
      icon: FlaskConical,
      tab: 'labs',
      badge: 'Laboratory Network',
      image: labTestingImg,
      alt: 'NABL certified testing laboratory in India with scientific instrumentation'
    },
    {
      title: 'Jewellers & Hallmarking',
      desc: 'Understand 6-digit HUID laser marking, gold purity standards (916 / 750), and AHC registration.',
      icon: Gem,
      tab: 'hallmarking',
      badge: 'Precious Metals',
      image: hallmarkingImg,
      alt: 'Authentic Indian gold jewellery inspection and laser HUID assaying'
    }
  ];

  const whyBisence = [
    {
      title: 'Natural-Language Discovery',
      desc: 'Type your product idea naturally without knowing standard terminology. Our engine extracts Product DNA.',
      icon: Sparkles
    },
    {
      title: 'Evidence-Backed Guidance',
      desc: 'Zero hallucinated standards. Every match links strictly to actual Sectional Committees and Gazette notifications.',
      icon: ShieldCheck
    },
    {
      title: 'Explainable Recommendations',
      desc: 'Visual 4-step sequence showing exactly why a standard was matched based on technical characteristics.',
      icon: HelpCircle
    }
  ];

  const notifCategories = ['All', 'Quality Control Orders', 'Public Alerts & Recalls', 'Hallmarking', 'Standards Updates'];

  const filteredNotifs = SAMPLE_NOTIFICATIONS.filter(n => 
    selectedNotifFilter === 'All' || n.category === selectedNotifFilter
  ).slice(0, 4);

  return (
    <div className="space-y-8 pb-16 bg-white text-slate-800">
      
      {/* 1. Header Identity: Official National Standards Body Statement */}
      <section className="bg-[#0F2C61] text-white py-3.5 px-4 border-b-2 border-amber-400">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
              <Landmark className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <p className="text-sm md:text-base font-bold text-white leading-snug">
                "We're BIS, The National Standards Body of India - We develop & publish Indian Standards, Implement Conformity Assessment, Run Labs, Implement Hallmarking, Work for Consumer empowerment"
              </p>
              <p className="text-xs text-amber-300 font-semibold mt-0.5 flex items-center justify-center md:justify-start gap-2">
                <span>मानक: पथप्रदर्शक:</span>
                <span className="text-white/60">•</span>
                <span>Established under the Bureau of Indian Standards Act, 2016</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('discover')}
              className="px-3 py-1.5 rounded-md bg-[#FEF08A] hover:bg-[#FDE047] text-[#78350F] font-bold text-xs border border-[#F59E0B] transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Explore Standards</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#78350F]" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Top Highlight Banner / Alerts (From Screenshot Specifications) */}
      <section className="container mx-auto max-w-6xl px-4 pt-2">
        <div className="space-y-4">
          
          {/* Card 1: Yellow background #FFEB3B with thick Red border #FF0000, rounded-2xl, center text bold 18px navy with blue NEW badge #0F2C61 */}
          <div 
            className="w-full bg-[#FFEB3B] rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition"
            style={{ border: '4px solid #FF0000' }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-[#0F2C61] text-white text-xs font-black tracking-wider uppercase shrink-0 shadow-xs">
                NEW
              </span>
              <span className="text-[#0F2C61] font-black text-lg sm:text-xl tracking-tight leading-snug">
                National Building Construction Standards 2026
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigate('discover')}
                className="px-4 py-2 rounded-xl bg-[#0F2C61] text-white text-xs sm:text-sm font-extrabold hover:bg-[#071F47] transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Standard</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
              <button
                onClick={() => onCheckOfficial('https://www.bis.gov.in', 'BIS National Building Code Portal')}
                className="px-3 py-2 rounded-xl bg-white/90 hover:bg-white text-[#0F2C61] border border-[#0F2C61] text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#0F2C61]" />
              </button>
            </div>
          </div>

          {/* Card 2: Below it, light green card #E6F4EA with Jan Sunvai (Public Hearing) in Red */}
          <div 
            className="w-full bg-[#E6F4EA] rounded-2xl p-5 sm:p-6 shadow-md border border-emerald-300 text-left relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2 max-w-4xl">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                  <h3 className="text-xl sm:text-2xl font-black text-[#FF0000] tracking-tight">
                    Jan Sunvai (Public Hearing)
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200">
                    Direct Public Grievance Interaction
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs sm:text-sm font-bold text-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-900">
                    <Calendar className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Schedule: <strong className="text-red-700">Every Wednesday</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-900">
                    <Clock className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Time: <strong className="text-red-700">14:00 - 15:00 hours</strong></span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  This initiative is aimed at providing an opportunity to directly interact with BIS officials to get your queries/grievance resolved and for inviting suggestions and feedback.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0">
                <button
                  onClick={() => setShowJanSunvaiModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm shadow-sm transition flex items-center gap-2 cursor-pointer"
                >
                  <Radio className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>Join Jan Sunvai (VC Link)</span>
                </button>
                <button
                  onClick={() => onNavigate('consumer')}
                  className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm transition cursor-pointer"
                >
                  <span>Submit Query</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Live Moving Gazette Feed */}
      <section className="container mx-auto max-w-6xl px-4">
        <MovingTextTicker
          badgeHindi="ताज़ा राजपत्र"
          badgeText="Live Gazette & QCO Ticker"
          speedSeconds={40}
          variant="gold"
          items={[
            {
              id: 'hv-1',
              title: 'Mandatory QCO for Solar Photovoltaic (PV) modules & inverters enforceable under IS 14286 & IS 61730.',
              category: 'Solar Energy',
              date: 'Active',
              url: 'https://www.manakonline.in',
              portalName: 'manakonline.in'
            },
            {
              id: 'hv-2',
              title: 'New Standard Published: IS 18112:2022 for digital television receivers with built-in satellite tuners.',
              category: 'Electronics'
            },
            {
              id: 'hv-3',
              title: 'e-BIS Fast Track: Domestic product certification granted within 30 days for pre-tested batch samples.',
              category: 'e-BIS Fast-track'
            },
            {
              id: 'hv-4',
              title: 'Laboratory Recognition: 1,200+ NABL & BIS accredited laboratories mapped across Indian industrial clusters.',
              category: 'Testing Labs',
              url: 'https://www.manakonline.in',
              portalName: 'manakonline.in'
            },
            {
              id: 'hv-5',
              title: 'Consumer Protection Alert: Non-ISI marked two-wheeler helmets (IS 4151) prohibited from sale across India.',
              category: 'Consumer Alert'
            },
            {
              id: 'hv-6',
              title: 'MSME Assistance: 50% concession on testing charges and 80% on annual licence fees under Udyam Scheme.',
              category: 'MSME Scheme'
            }
          ]}
          onItemClick={(url, name) => onCheckOfficial(url, name)}
        />
      </section>

      {/* 4. Natural Language Intake Search & Manak Bhavan Banner */}
      <section className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left: Headline & AI Intake Prompt */}
          <div className="lg:col-span-7 text-left space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF08A] border border-[#F59E0B] text-xs font-bold text-[#78350F] mb-2">
                <Landmark className="w-3.5 h-3.5 text-[#B45309]" />
                <span>मानक अन्वेषण एवं अनुपालन सुविधा | Official Indian Standards Discovery Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C61] tracking-tight leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {t.heroSubtitle}
              </p>
            </div>

            {/* Intake Box */}
            <div className="bg-white rounded-xl border-2 border-[#0F2C61] shadow-md p-4 sm:p-5 text-left focus-within:ring-2 focus-within:ring-[#F59E0B] transition">
              <label htmlFor="hero-product-input" className="block text-xs font-extrabold text-[#0F2C61] uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span>Describe your product or manufacturing idea:</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#FEF08A] text-[#78350F] font-bold border border-[#F59E0B]">
                  AI Discovery
                </span>
              </label>
              <textarea
                id="hero-product-input"
                rows={3}
                value={productDesc}
                onChange={e => setProductDesc(e.target.value)}
                placeholder={t.heroPlaceholder}
                className="w-full bg-white text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-hidden resize-none leading-relaxed border-0"
              />

              {/* Prompt sample chips */}
              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-bold text-[11px]">Popular Samples:</span>
                <button 
                  type="button"
                  onClick={() => setProductDesc('Commercial stainless-steel kitchen sinks for restaurants')}
                  className="px-2.5 py-1 rounded bg-[#FEF9C3] hover:bg-[#FEF08A] text-[#78350F] text-[11px] font-semibold border border-amber-300 transition cursor-pointer"
                >
                  Stainless Steel Sinks
                </button>
                <button 
                  type="button"
                  onClick={() => setProductDesc('Household electric mixer grinder and food processor')}
                  className="px-2.5 py-1 rounded bg-[#FEF9C3] hover:bg-[#FEF08A] text-[#78350F] text-[11px] font-semibold border border-amber-300 transition cursor-pointer"
                >
                  Electric Mixer (IS 302)
                </button>
                <button 
                  type="button"
                  onClick={() => setProductDesc('Aluminium domestic pressure cooker with safety valve')}
                  className="px-2.5 py-1 rounded bg-[#FEF9C3] hover:bg-[#FEF08A] text-[#78350F] text-[11px] font-semibold border border-amber-300 transition cursor-pointer"
                >
                  Pressure Cooker (IS 2347)
                </button>
                <button 
                  type="button"
                  onClick={() => setProductDesc('Packaged drinking water 1-litre bottled potable water')}
                  className="px-2.5 py-1 rounded bg-[#FEF9C3] hover:bg-[#FEF08A] text-[#78350F] text-[11px] font-semibold border border-amber-300 transition cursor-pointer"
                >
                  Packaged Water (IS 14543)
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-slate-600 font-medium">
                  Strictly mapped to Gazette QCOs and Bureau Sectional Committees.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    id="hero-search-standards-btn"
                    onClick={handleSearchClick}
                    className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold text-[#0F2C61] hover:bg-blue-50 border border-[#0F2C61] transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-[#0F2C61]" />
                    <span>{t.searchBtn}</span>
                  </button>
                  <button
                    id="hero-analyze-btn"
                    onClick={handleAnalyze}
                    className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#0F2C61] hover:bg-[#071F47] text-white shadow-sm transition flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{t.analyzeBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Manak Bhavan Photo & Key Statistics */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="relative rounded-xl overflow-hidden border-2 border-slate-300 shadow-md bg-white">
              <img 
                src={bisGovHeroImg} 
                alt="Official Indian Standards Inspection Headquarters Manak Bhavan New Delhi"
                referrerPolicy="no-referrer"
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2C61]/90 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#FEF08A] text-[#78350F]">
                    राष्ट्रीय मानक संस्थान
                  </span>
                  <span className="text-xs font-semibold text-slate-200">Manak Bhavan, New Delhi</span>
                </div>
                <h3 className="text-sm font-bold text-white leading-tight">
                  Bureau of Indian Standards — Statutory National Standards Body of India
                </h3>
              </div>
            </div>

            {/* Statistics Row */}
            <div className="p-3.5 rounded-xl bg-[#FEF9C3] border border-[#F59E0B] shadow-2xs grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-extrabold text-[#0F2C61]">22,000+</div>
                <div className="text-[10px] font-bold text-slate-700">Indian Standards</div>
              </div>
              <div className="border-x border-amber-300 px-1">
                <div className="text-lg font-extrabold text-[#B45309]">500+</div>
                <div className="text-[10px] font-bold text-slate-700">Mandatory QCOs</div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-[#0F2C61]">1,200+</div>
                <div className="text-[10px] font-bold text-slate-700">Accredited Labs</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <DisclaimerBanner />
        </div>
      </section>

      {/* 5. Two Alert Boxes: Industry Alert & Consumer Alert */}
      <section className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Industry Alert Box */}
          <div className="rounded-2xl border-2 border-amber-400 bg-amber-50/70 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0F2C61]">
                    Industry Alert: Upcoming QCOs Notified
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300">
                  Statutory
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Mandatory Quality Control Orders issued under BIS Act 2016 due for phased enforcement. Domestic manufacturers and importers must obtain BIS Certification prior to the cutoff date:
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-amber-200 flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-900 block">Cookware, Utensils & Pressure Cookers</span>
                    <span className="text-slate-600 text-[11px]">Stainless Steel IS 14756 & Pressure Cooker IS 2347</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 shrink-0">Enforced</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-amber-200 flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-900 block">Electrical Accessories & Switches</span>
                    <span className="text-slate-600 text-[11px]">Plugs, socket-outlets & switches under IS 1293</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 shrink-0">Mandatory</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-amber-200 flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-900 block">Toys & Children Safety Products</span>
                    <span className="text-slate-600 text-[11px]">Safety of toys (Electric & Non-Electric) IS 9873</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 shrink-0">100% Mandatory</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-amber-200 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Prepare factory lab testing & audits</span>
              <button
                onClick={() => onNavigate('notifications')}
                className="font-bold text-[#0F2C61] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Check All QCO Dates</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </button>
            </div>
          </div>

          {/* Consumer Alert Box */}
          <div className="rounded-2xl border-2 border-red-300 bg-red-50/70 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-extrabold text-red-900">
                    Consumer Alert: Product Recalls & Substandard Goods
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-red-200 text-red-900 text-xs font-bold border border-red-300">
                  Public Safety
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Public safety advisory issued by Bureau of Indian Standards against unauthorized and counterfeit ISI mark goods seized during enforcement raids:
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-red-200 flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-red-900 block">Prohibition on Non-ISI Two-Wheeler Helmets</span>
                    <span className="text-slate-600 text-[11px]">Manufacture, storage & sale of helmets without ISI mark (IS 4151) is a cognizable offense.</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white shrink-0">Prohibited</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-red-200 flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-red-900 block">Packaged Drinking Water Verification</span>
                    <span className="text-slate-600 text-[11px]">Always scan the 7 or 8-digit CM/L number on water bottles via the BIS Care App before purchase.</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 shrink-0">Verification</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-red-200 flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-red-900 block">Substandard Pressure Cooker Recall</span>
                    <span className="text-slate-600 text-[11px]">Uncertified pressure cookers failing thermal explosion tests seized from unauthorized e-commerce vendors.</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 shrink-0">Enforcement</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-red-200 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Report fake ISI: Call Helpline 1915</span>
              <button
                onClick={() => onNavigate('consumer')}
                className="font-bold text-red-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Verify Genuine Marks</span>
                <ArrowRight className="w-3.5 h-3.5 text-red-600" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. What's New Section (6 Latest Updates as Cards) */}
      <section className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2C61]">
                What's New at BIS
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Latest statutory certifications, All India First Licences, Gazette orders, and stakeholder sessions.
            </p>
          </div>
          <button
            onClick={() => onNavigate('notifications')}
            className="text-xs font-bold text-[#0F2C61] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Notifications</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {whatsNewUpdates.map(update => (
            <div
              key={update.id}
              className="p-4 rounded-xl bg-white border border-slate-300 hover:border-[#0F2C61] shadow-2xs hover:shadow-sm transition flex flex-col justify-between text-left"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-extrabold text-[#78350F] bg-[#FEF08A] px-2 py-0.5 rounded text-[11px] border border-[#F59E0B]">
                    {update.category}
                  </span>
                  <span className="text-slate-500 font-bold text-[11px]">{update.date}</span>
                </div>
                <h3 className="text-sm font-bold text-[#0F2C61] leading-snug">
                  {update.title}
                </h3>
                <div className="inline-block text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Standard: {update.standard}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {update.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-medium">Bureau of Indian Standards</span>
                <button
                  onClick={() => onNavigate('notifications')}
                  className="font-bold text-[#0F2C61] hover:underline flex items-center gap-1 cursor-pointer text-xs"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3 text-amber-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Quick Access Grid (17 Items with Icons) */}
      <section className="container mx-auto max-w-6xl px-4">
        <div className="mb-5 pb-2 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2C61]">
                Quick Access Portal
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Direct access to key Bureau of Indian Standards services, catalogues, portals, and citizen touchpoints.
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-[#0F2C61] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded">
              17 Key Portals
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {quickAccessItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleQuickItemClick(item)}
                className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#0F2C61] shadow-2xs hover:shadow-sm text-left transition flex flex-col justify-between group cursor-pointer h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0F2C61]/5 group-hover:bg-[#0F2C61] text-[#0F2C61] group-hover:text-white flex items-center justify-center transition shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#FEF08A] text-[#78350F] border border-[#F59E0B]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-[#0F2C61] group-hover:text-[#071F47] leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-[#0F2C61]">
                  <span>Access</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 8. Official Audience Pathways Cards with Authentic Images */}
      <section className="container mx-auto max-w-6xl px-4">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FEF08A] border border-[#F59E0B] text-[#78350F] text-xs font-extrabold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>नागरिक एवं उद्योग सेवाएँ / Public & Industrial Services</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#0F2C61]">
            Official Compliance Portals by Sector
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Access calibrated guidance designed for Indian manufacturers, citizens, laboratories, and jewellers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audienceCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                onClick={() => onNavigate(card.tab)}
                className="rounded-xl border border-slate-300 bg-white hover:border-[#0F2C61] shadow-2xs hover:shadow-md transition overflow-hidden cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 overflow-hidden bg-slate-100">
                    <img 
                      src={card.image} 
                      alt={card.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#FEF08A] text-[#78350F] border border-[#F59E0B] shadow-xs">
                        {card.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 text-left">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0F2C61] flex items-center justify-center mb-2">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-extrabold text-[#0F2C61] mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 text-left">
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0F2C61] group-hover:translate-x-1 transition">
                    <span>Open Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. About BIS Section: 2-line about BIS Act 2016 */}
      <section className="container mx-auto max-w-6xl px-4">
        <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#0F2C61]" />
                <h2 className="text-xl font-extrabold text-[#0F2C61]">
                  About the Bureau of Indian Standards (BIS)
                </h2>
              </div>
              <p className="text-xs text-amber-800 font-semibold mt-0.5">
                The National Standards Body of India • Established under the BIS Act, 2016
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onCheckOfficial('https://www.bis.gov.in', 'Official BIS Portal')}
                className="px-3 py-1.5 rounded-lg bg-white border border-[#0F2C61] text-[#0F2C61] text-xs font-bold hover:bg-blue-50 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>bis.gov.in</span>
                <ExternalLink className="w-3 h-3 text-[#0F2C61]" />
              </button>
            </div>
          </div>

          {/* 2-line description of BIS Act 2016 */}
          <div className="space-y-3 text-left">
            <p className="text-sm text-slate-800 font-medium leading-relaxed">
              The Bureau of Indian Standards (BIS) is the National Standards Body of India established under the <strong>BIS Act 2016</strong> for the harmonious development of the activities of standardization, marking and quality certification of goods and for matters connected therewith or incidental thereto.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Through standards formulation, product certification (ISI Mark), hallmarking of precious metals, laboratory testing, and consumer empowerment, BIS has been providing traceable and tangible benefits to the national economy, safeguarding consumers, and elevating the competitiveness of Indian industry globally.
            </p>
          </div>

          {/* Core statutory pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200 text-xs text-center font-bold text-slate-700">
            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <div className="text-[#0F2C61] font-extrabold text-sm">22,000+</div>
              <div className="text-[11px] text-slate-500">Formulated Standards</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <div className="text-[#0F2C61] font-extrabold text-sm">Scheme-I & CRS</div>
              <div className="text-[11px] text-slate-500">Conformity Assessment</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <div className="text-[#0F2C61] font-extrabold text-sm">6-digit HUID</div>
              <div className="text-[11px] text-slate-500">Mandatory Hallmarking</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <div className="text-[#0F2C61] font-extrabold text-sm">1,200+ Network</div>
              <div className="text-[11px] text-slate-500">NABL & BIS Laboratories</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Footer Note & Verification Disclaimers */}
      <section className="container mx-auto max-w-6xl px-4">
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 text-left text-xs text-slate-600 space-y-1.5">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Info className="w-4 h-4 text-[#0F2C61]" />
            <span>Important Verification Notice & Legal Disclaimer</span>
          </div>
          <p className="leading-relaxed">
            All data shown as DEMO/SAMPLE - Official verification at <button onClick={() => onCheckOfficial('https://www.bis.gov.in', 'Official BIS Portal')} className="text-[#0F2C61] font-bold underline cursor-pointer">bis.gov.in</button> & <button onClick={() => onCheckOfficial('https://www.manakonline.in', 'Manak Online')} className="text-[#0F2C61] font-bold underline cursor-pointer">manakonline.in</button>. BISENCE is an assistive discovery platform and is not the official BIS site.
          </p>
          <p className="text-[11px] text-slate-500">
            For statutory licence applications, laboratory testing fee schedules, or official gazetted Quality Control Orders, refer solely to statutory portals published by the Bureau of Indian Standards and Ministry of Consumer Affairs, Food & Public Distribution, Government of India.
          </p>
        </div>
      </section>

      {/* Jan Sunvai Public Hearing Modal */}
      {showJanSunvaiModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border-2 border-red-600 shadow-2xl p-6 relative">
            <button
              onClick={() => setShowJanSunvaiModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-black text-red-600">
                  Jan Sunvai (Public Hearing)
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Bureau of Indian Standards Citizen Grievance Redressal
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="p-3 rounded-lg bg-[#E6F4EA] border border-emerald-300 font-semibold text-emerald-900 space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span>Day: <strong>Every Wednesday</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <span>Time: <strong>14:00 - 15:00 hours (IST)</strong></span>
                </div>
              </div>

              <p className="leading-relaxed">
                This initiative is aimed at providing an opportunity to directly interact with BIS senior officials to get your queries/grievance resolved and for inviting suggestions and feedback.
              </p>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1 text-slate-600">
                <span className="font-bold text-slate-800 block">How to join:</span>
                <p>1. Video conference link is active every Wednesday from 13:50 IST.</p>
                <p>2. Keep your CM/L licence number, complaint ID, or standard clause ready.</p>
                <p>3. Feedback and resolutions are minuted for administrative action.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-2">
              <button
                onClick={() => setShowJanSunvaiModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowJanSunvaiModal(false);
                  onCheckOfficial('https://www.bis.gov.in/jan-sunvai', 'BIS Jan Sunvai Portal');
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open Video Conference Link</span>
                <ExternalLink className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Access Portal Detail Modal */}
      {selectedQuickItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-300 shadow-2xl p-6 relative">
            <button
              onClick={() => setSelectedQuickItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F2C61] flex items-center justify-center">
                <selectedQuickItem.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F2C61]">
                  {selectedQuickItem.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  {selectedQuickItem.subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <p className="leading-relaxed">
                {selectedQuickItem.description}
              </p>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                Official statutory guidelines, registration forms, and circulars are maintained by Bureau of Indian Standards on the national gateway.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-2">
              <button
                onClick={() => setSelectedQuickItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Close
              </button>
              {selectedQuickItem.officialUrl && (
                <button
                  onClick={() => {
                    const url = selectedQuickItem.officialUrl!;
                    const title = selectedQuickItem.title;
                    setSelectedQuickItem(null);
                    onCheckOfficial(url, title);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0F2C61] hover:bg-[#071F47] text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Visit Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
