import React, { useState } from 'react';
import { Logo } from './Logo';
import { LanguageCode, UserRole } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MovingTextTicker, TickerItem } from './MovingTextTicker';
import { SatelliteOrbit } from './SatelliteOrbit';
import { 
  Search, 
  Globe, 
  Menu, 
  X, 
  UserCheck, 
  ChevronDown,
  FileCheck,
  Compass,
  Bell,
  Shield,
  Building2,
  FlaskConical,
  Gem,
  FileSearch,
  Network,
  Bot,
  SlidersHorizontal,
  LogOut,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  userRole: UserRole | null;
  userName: string | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenGlobalSearch: () => void;
  onCheckOfficial?: (url: string, name: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  language,
  onLanguageChange,
  userRole,
  userName,
  onOpenAuth,
  onSignOut,
  onOpenGlobalSearch,
  onCheckOfficial
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' }
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  const navLinks = [
    { id: 'discover', label: t.nav.discover, icon: Compass },
    { id: 'journey', label: 'My BIS Journey', icon: FileCheck },
    { id: 'notifications', label: t.nav.notifications, icon: Bell },
    { id: 'consumer', label: t.nav.consumer, icon: Shield },
    { id: 'industry', label: t.nav.industry, icon: Building2 },
    { id: 'labs', label: t.nav.labFinder, icon: FlaskConical },
    { id: 'hallmarking', label: t.nav.hallmarking, icon: Gem },
    { id: 'ai-assistant', label: t.nav.aiAssistant, icon: Bot, isHighlighted: true },
  ];

  const secondaryNavLinks = [
    { id: 'docs', label: t.nav.docIntelligence, icon: FileSearch },
    { id: 'graph', label: t.nav.knowledgeGraph, icon: Network },
    { id: 'admin', label: t.nav.adminDemo, icon: SlidersHorizontal }
  ];

  const headerTickerItems: TickerItem[] = [
    {
      id: 'qco-2024',
      title: 'Mandatory Quality Control Orders (QCOs) 2024-25 enforced for electronics, kitchenware, safety footwear, helmets & packaged water.',
      category: 'राजपत्र / Gazette',
      date: 'Active',
      url: 'https://www.manakonline.in',
      portalName: 'manakonline.in'
    },
    {
      id: 'huid-mandatory',
      title: 'Gold Hallmarking mandatory across 343+ Indian Districts. Always inspect the 3 marks: BIS Logo, Purity (916/750), and 6-digit laser HUID.',
      category: 'हॉलमार्किंग / Hallmarking',
      date: 'Mandatory',
      url: 'https://www.manakonline.in',
      portalName: 'manakonline.in'
    },
    {
      id: 'msme-concession',
      title: 'MSME Concession: 50% waiver on testing charges and 80% rebate for micro-enterprises under Udyam Registration.',
      category: 'एमएसएमई / MSME',
      date: 'Benefit'
    },
    {
      id: 'bis-care-app',
      title: 'Consumer Protection: Verify genuine ISI Mark and CM/L licence validity on BIS Care App or national portal manakonline.in.',
      category: 'सत्यापन / Verify',
      date: 'Public Notice'
    },
    {
      id: 'lab-accreditation',
      title: 'NABL & BIS Recognized Testing Labs: Mandatory synchronization with e-BIS Laboratory Information Management System (LIMS).',
      category: 'प्रयोगशाला / Labs',
      date: 'Circular'
    },
    {
      id: 'consumer-helpline',
      title: 'National Consumer Helpline (NCH): Dial 1915 toll-free for reporting substandard goods or fake ISI marks.',
      category: 'हेल्पलाइन / 1915'
    }
  ];

  const handleNavClick = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200 select-none">
      {/* 1. Official Indian Tricolor Strip */}
      <div className="gov-tricolor-strip" />

      {/* 2. Official Government of India Top Banner */}
      <div className="bg-[#072B68] text-white text-[11px] py-1.5 px-4 font-medium border-b border-[#0A3D91]">
        <div className="container mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-amber-300">भारत सरकार</span>
            <span className="text-slate-400">|</span>
            <span>GOVERNMENT OF INDIA</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-200">मानक भवन, 9 बहादुर शाह ज़फ़र मार्ग, नई दिल्ली-110002</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Highlighting matter with gold background */}
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-bold text-[10px] bg-[#FEF08A] text-[#78350F] border border-[#F59E0B]">
              <AlertCircle className="w-3 h-3 text-[#B45309]" />
              <span>Gazette QCOs 2024-25 Active</span>
            </span>

            <span className="hidden md:inline text-slate-400">|</span>
            <a 
              href="https://www.manakonline.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-slate-200 hover:text-amber-300 transition"
            >
              <span>manakonline.in</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. Official Portal Masthead Header */}
      <div className="bg-white py-3 px-4 border-b border-slate-200">
        <div className="container mx-auto flex items-center justify-between gap-4">
          {/* Logo & Ministry details */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-hidden group cursor-pointer"
          >
            <Logo size="lg" showTagline={true} />
          </button>

          {/* Right Government Badges */}
          <div className="hidden lg:flex items-center gap-4">
            {/* BIS Standards Assurance Badge */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-left">
              <ShieldCheck className="w-7 h-7 text-[#0A3D91]" />
              <div className="text-[11px] leading-tight">
                <div className="font-extrabold text-[#0A3D91]">मानक पथप्रदर्शक</div>
                <div className="text-slate-600 font-medium">Standards Purity & Quality</div>
              </div>
            </div>

            {/* Official Manakonline Direct Link Badge with Gold Highlight */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FEF3C7] border border-[#F59E0B] text-left">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <div className="text-[11px] leading-tight">
                <div className="font-bold text-[#78350F]">National Portal Synchronized</div>
                <div className="text-slate-700 text-[10px]">e-BIS & LIMS Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Official Navigation Bar in Royal Blue */}
      <div className="bg-[#0A3D91] text-white border-b-2 border-[#D97706]">
        <div className="container mx-auto px-4 flex items-center justify-between h-12">
          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              const isYellowButton = link.isHighlighted || isActive;
              const btn = (
                <button
                  key={link.id}
                  id={`nav-tab-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#FEF08A] text-[#78350F] shadow-sm'
                      : link.isHighlighted
                      ? 'bg-[#F59E0B] text-[#072B68] hover:bg-[#FBBF24]'
                      : 'text-white hover:bg-[#1652B5]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#78350F]' : 'text-amber-300'}`} />
                  <span>{link.label}</span>
                </button>
              );

              if (link.isHighlighted) {
                return (
                  <SatelliteOrbit key={link.id} showTrack={false}>
                    {btn}
                  </SatelliteOrbit>
                );
              }

              return btn;
            })}

            {/* More dropdown */}
            <div className="relative group">
              <button 
                className="px-2.5 py-1.5 rounded-md text-xs font-bold text-white hover:bg-[#1652B5] transition flex items-center gap-1 cursor-pointer"
              >
                <span>More</span>
                <ChevronDown className="w-3 h-3 text-amber-300" />
              </button>
              <div className="absolute left-0 top-full mt-1 w-52 bg-white text-slate-800 border-2 border-[#0A3D91] rounded-lg shadow-xl p-1.5 hidden group-hover:block animate-in fade-in duration-100 z-50">
                {secondaryNavLinks.map(link => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className="w-full text-left px-3 py-2 rounded-md text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-[#0A3D91] flex items-center gap-2 transition cursor-pointer"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#0A3D91]" />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search Trigger */}
            <button
              id="global-search-trigger"
              onClick={onOpenGlobalSearch}
              className="px-2.5 py-1.5 rounded-md bg-[#072B68] hover:bg-[#062456] text-white border border-blue-400/40 flex items-center gap-2 text-xs transition cursor-pointer"
              title="Search Indian Standards (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden md:inline font-medium text-slate-200">Search Standards...</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[9px] bg-blue-950/60 rounded border border-blue-400/30 text-amber-300 font-mono">Ctrl+K</kbd>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                id="language-switcher-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="px-2.5 py-1.5 rounded-md bg-[#072B68] hover:bg-[#062456] text-white border border-blue-400/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Select Indian Language / भाषा चुनें"
              >
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>{currentLangObj.native}</span>
                <ChevronDown className="w-3 h-3 text-slate-300" />
              </button>

              {langDropdownOpen && (
                <div 
                  id="language-dropdown-menu"
                  className="absolute right-0 top-full mt-1.5 w-44 bg-white text-slate-900 border-2 border-[#0A3D91] rounded-lg shadow-2xl p-1.5 z-50"
                >
                  <div className="px-2 py-1 text-[10px] font-bold text-[#0A3D91] uppercase tracking-wider border-b border-slate-100">
                    भाषा चयन / Select Language
                  </div>
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between font-medium transition cursor-pointer ${
                        language === lang.code
                          ? 'bg-[#FEF08A] text-[#78350F] font-bold'
                          : 'text-slate-700 hover:bg-blue-50 hover:text-[#0A3D91]'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] opacity-70">({lang.label})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sign In / User Auth */}
            {userName ? (
              <div className="relative">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="px-3 py-1.5 rounded-md bg-[#FEF08A] text-[#78350F] border border-[#F59E0B] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#0A3D91]" />
                  <span className="max-w-[100px] truncate">{userName}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-52 bg-white text-slate-900 border-2 border-[#0A3D91] rounded-lg shadow-xl p-2 z-50">
                    <div className="px-2 py-1 border-b border-slate-100 mb-1">
                      <div className="text-xs font-bold text-[#0A3D91] truncate">{userName}</div>
                      <div className="text-[10px] text-amber-700 font-semibold">{userRole || 'Manufacturer / MSME'}</div>
                    </div>
                    <button
                      onClick={() => {
                        handleNavClick('industry');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-slate-700 hover:bg-amber-50 hover:text-[#0A3D91] rounded flex items-center gap-2 cursor-pointer"
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#0A3D91]" />
                      <span>My Products Workspace</span>
                    </button>
                    <button
                      onClick={() => {
                        onSignOut();
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded flex items-center gap-2 mt-1 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="header-sign-in-btn"
                onClick={onOpenAuth}
                className="px-3 py-1.5 rounded-md text-xs font-bold bg-[#FEF08A] hover:bg-[#FDE047] text-[#78350F] border border-[#F59E0B] shadow-2xs transition flex items-center gap-1 cursor-pointer"
              >
                <span>{t.nav.signIn}</span>
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-md text-white hover:bg-[#1652B5] transition cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Official Gazette Quality Notice Moving Text Marquee Strip */}
      <MovingTextTicker
        items={headerTickerItems}
        badgeHindi="राजपत्र अधिसूचना"
        badgeText="Gazette Live"
        speedSeconds={35}
        variant="gold"
        onItemClick={(url, name) => {
          if (onCheckOfficial) {
            onCheckOfficial(url, name);
          } else {
            window.open(url, '_blank', 'noopener,noreferrer');
          }
        }}
      />

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="lg:hidden border-t-2 border-[#0A3D91] bg-white p-4 space-y-2 shadow-2xl"
        >
          <div className="text-[10px] font-bold text-[#0A3D91] uppercase tracking-wider px-2">
            Standards & Services Navigation
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[...navLinks, ...secondaryNavLinks].map(link => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`p-2.5 rounded-md text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                    isActive
                      ? 'bg-[#FEF08A] text-[#78350F] border border-[#F59E0B]'
                      : 'bg-slate-50 text-slate-800 hover:bg-blue-50 hover:text-[#0A3D91] border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#0A3D91] shrink-0" />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

