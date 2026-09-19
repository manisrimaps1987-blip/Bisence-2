import React, { useState } from 'react';
import { SatelliteOrbit } from './SatelliteOrbit';
import { 
  Bot, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  FileText, 
  Building2, 
  FlaskConical, 
  Gem, 
  Scale, 
  HelpCircle, 
  Sparkles,
  ChevronRight,
  Globe,
  Award,
  AlertTriangle,
  X,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  Instagram
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onCheckOfficial: (url: string, name: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onCheckOfficial }) => {
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  return (
    <footer className="w-full bg-[#051937] text-slate-200 border-t-2 border-[#D97706] text-xs font-sans">
      {/* =========================================================================
          1. VISUALLY DISTINCT BUT PROFESSIONAL CTA AREA (IMMEDIATELY ABOVE FOOTER)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#072B68] via-[#0A3D91] to-[#072B68] py-8 sm:py-10 px-4 border-b border-blue-900/60 shadow-inner">
        {/* Subtle decorative Government portal watermark texture */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none bg-repeat"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            {/* CTA Text */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Smart India Hackathon PS 26107</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Need help with an Indian Standard?
              </h2>
              <p className="text-sm sm:text-base text-slate-200 mt-1.5 leading-relaxed font-normal">
                Ask e-BIS Sahayak — your AI-powered guide to Indian Standards and BIS services.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 shrink-0">
              {/* Prominent Yellow Button with Orbiting Red Satellite Indicator */}
              <SatelliteOrbit>
                <button
                  id="footer-cta-ask-sahayak-btn"
                  onClick={() => onNavigate('ai-assistant')}
                  className="px-6 py-3 rounded-lg bg-[#F59E0B] hover:bg-[#FBBF24] text-[#072B68] font-black text-xs sm:text-sm tracking-wider uppercase border-2 border-[#D97706] shadow-lg flex items-center gap-2 cursor-pointer select-none transition-colors"
                >
                  <Bot className="w-4 h-4 text-[#072B68]" />
                  <span>ASK e-BIS SAHAYAK</span>
                </button>
              </SatelliteOrbit>

              {/* Smaller Secondary Button (Without satellite) */}
              <button
                id="footer-cta-explore-standards-btn"
                onClick={() => onNavigate('discover')}
                className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm tracking-wide uppercase border border-white/30 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-amber-300" />
                <span>EXPLORE INDIAN STANDARDS</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. OFFICIAL GOVERNMENT UTILITY STRIP & SOCIAL / HELPLINE CHANNELS
          ========================================================================= */}
      <div className="bg-[#04142C] border-b border-blue-950 px-4 py-3">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left utility buttons: BIS Login, FAQ, Media, Blog, Hindi */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-300">
            <button
              onClick={() => onCheckOfficial('https://www.manakonline.in', 'Manak Online Login Portal')}
              className="px-2.5 py-1 rounded bg-blue-950/70 hover:bg-blue-900/80 text-amber-300 border border-blue-800/60 flex items-center gap-1 transition cursor-pointer"
            >
              <span>BIS Login</span>
              <ExternalLink className="w-2.5 h-2.5 text-amber-400" />
            </button>
            <button
              onClick={() => onNavigate('ai-assistant')}
              className="px-2.5 py-1 rounded bg-blue-950/70 hover:bg-blue-900/80 text-slate-200 border border-blue-800/60 transition cursor-pointer"
            >
              FAQ
            </button>
            <button
              onClick={() => onCheckOfficial('https://www.bis.gov.in/media-corner/', 'BIS Media Releases')}
              className="px-2.5 py-1 rounded bg-blue-950/70 hover:bg-blue-900/80 text-slate-200 border border-blue-800/60 transition cursor-pointer"
            >
              Media
            </button>
            <button
              onClick={() => onCheckOfficial('https://www.bis.gov.in', 'BIS Official Blog')}
              className="px-2.5 py-1 rounded bg-blue-950/70 hover:bg-blue-900/80 text-slate-200 border border-blue-800/60 transition cursor-pointer"
            >
              Blog
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold transition cursor-pointer flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-amber-300" />
              <span>हिन्दी (Hindi Portal)</span>
            </button>
          </div>

          {/* Right utility and direct handoffs */}
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <div className="flex items-center gap-2 text-slate-400">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">NCH Helpline: <strong className="text-white">1915</strong></span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onCheckOfficial('https://www.manakonline.in', 'e-BIS / Manak Online')}
                className="hover:text-amber-300 transition text-slate-300 underline font-medium"
              >
                manakonline.in
              </button>
              <span className="text-slate-600">•</span>
              <button
                onClick={() => onCheckOfficial('https://www.bis.gov.in', 'BIS Official Portal')}
                className="hover:text-amber-300 transition text-slate-300 underline font-medium"
              >
                bis.gov.in
              </button>
              <span className="text-slate-600">•</span>
              <button
                onClick={() => onCheckOfficial('https://www.crsbis.in', 'CRS Registration')}
                className="hover:text-amber-300 transition text-slate-300 underline font-medium"
              >
                crsbis.in
              </button>
            </div>

            {/* Official Social Media Channels */}
            <div className="flex items-center gap-1 border-l border-blue-900 pl-3">
              <button
                onClick={() => onCheckOfficial('https://twitter.com/IndianStandards', 'BIS Official X (Twitter)')}
                className="p-1 rounded hover:bg-blue-900/60 text-slate-400 hover:text-amber-300 transition cursor-pointer"
                title="Official Twitter / X"
                aria-label="Official Twitter / X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onCheckOfficial('https://www.facebook.com/IndianStandards', 'BIS Official Facebook')}
                className="p-1 rounded hover:bg-blue-900/60 text-slate-400 hover:text-amber-300 transition cursor-pointer"
                title="Official Facebook"
                aria-label="Official Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onCheckOfficial('https://www.youtube.com/@IndianStandardsBIS', 'BIS Official YouTube')}
                className="p-1 rounded hover:bg-blue-900/60 text-slate-400 hover:text-amber-300 transition cursor-pointer"
                title="Official YouTube"
                aria-label="Official YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onCheckOfficial('https://www.linkedin.com/company/bureau-of-indian-standards', 'BIS Official LinkedIn')}
                className="p-1 rounded hover:bg-blue-900/60 text-slate-400 hover:text-amber-300 transition cursor-pointer"
                title="Official LinkedIn"
                aria-label="Official LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onCheckOfficial('https://www.instagram.com/indianstandards/', 'BIS Official Instagram')}
                className="p-1 rounded hover:bg-blue-900/60 text-slate-400 hover:text-amber-300 transition cursor-pointer"
                title="Official Instagram"
                aria-label="Official Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. MAIN 5-COLUMN INSTITUTIONAL FOOTER CONTENT
          ========================================================================= */}
      <div className="container mx-auto px-4 py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 xl:gap-10">
          
          {/* SECTION 1 — e-BIS Sahayak */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-wider mb-3 pb-2 border-b-2 border-amber-400/80 flex items-center gap-2">
              <Bot className="w-4 h-4 text-amber-400" />
              <span>e-BIS Sahayak</span>
            </h3>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => onNavigate('ai-assistant')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>AI Standards Assistant</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('ai-assistant')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Ask a Question</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('discover')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Find Applicable Standards</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('discover')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Standards Explorer</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('journey')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Certification Guidance</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('journey')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Testing Requirements</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('industry')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>BIS Schemes</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('hallmarking')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Hallmarking Assistant</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('labs')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Laboratory Finder</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('consumer')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Consumer Assistance</span>
                </button>
              </li>
            </ul>
          </div>

          {/* SECTION 2 — Indian Standards */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-wider mb-3 pb-2 border-b-2 border-amber-400/80 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Indian Standards</span>
            </h3>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => onNavigate('discover')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Search Indian Standards</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('discover')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Standard Details</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('graph')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Related Standards</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('discover')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Standards by Product</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('industry')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Standards by Industry</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('notifications')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Standards & Amendments</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('docs')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Technical Information</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onCheckOfficial('https://www.manakonline.in', 'Manak Online Standards Sale Portal')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Download Standards</span>
                </button>
              </li>
            </ul>
          </div>

          {/* SECTION 3 — BIS Services */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-wider mb-3 pb-2 border-b-2 border-amber-400/80 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>BIS Services</span>
            </h3>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => onNavigate('journey')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Product Certification</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('industry')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>System Certification</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onCheckOfficial('https://www.crsbis.in', 'Compulsory Registration Scheme Portal')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Registration Scheme</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('hallmarking')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Hallmarking</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('labs')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Laboratory Services</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('journey')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Licensing</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onCheckOfficial('https://www.manakonline.in', 'Manak Online (e-BIS Portal)')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Online Applications</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('journey')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Certification Process</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onCheckOfficial('https://www.bis.gov.in/training', 'National Institute of Training for Standardization (NITS)')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Training</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('consumer')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Consumer Services</span>
                </button>
              </li>
            </ul>
          </div>

          {/* SECTION 4 — AI Assistant */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-wider mb-3 pb-2 border-b-2 border-amber-400/80 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Assistant</span>
            </h3>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => onNavigate('ai-assistant')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Ask e-BIS Sahayak</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('discover')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Product-Based Standard Search</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('journey')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Certification Eligibility</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('docs')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Explain This Standard</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('labs')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Find Testing Parameters</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('labs')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Find Relevant Laboratory</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('ai-assistant')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Multilingual Assistance</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('docs')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>View Sources & Citations</span>
                </button>
              </li>
            </ul>
          </div>

          {/* SECTION 5 — Help & Support */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-wider mb-3 pb-2 border-b-2 border-amber-400/80 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Help & Support</span>
            </h3>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => onNavigate('ai-assistant')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Frequently Asked Questions</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('journey')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>User Guide</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('consumer')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Consumer Help</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('industry')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>MSME Support</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('ai-assistant')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Technical Support</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onCheckOfficial('https://www.bis.gov.in/contact-us', 'BIS Official Contact Directory')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Contact BIS</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActivePolicyModal('feedback')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Feedback</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onCheckOfficial('https://play.google.com/store/apps/details?id=com.bis.biscare', 'BIS Care Grievance App')} 
                  className="text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5 py-0.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 shrink-0" />
                  <span>Report an Issue</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================================================================
            4. HACKATHON RESEARCH PROTOTYPE TRANSPARENCY BANNER (MOST IMPORTANT)
            ========================================================================= */}
        <div className="mt-10 p-4 sm:p-5 rounded-xl bg-[#031124] border border-blue-900/80 shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                <span className="font-extrabold text-amber-300 block mb-0.5">
                  Smart India Hackathon Problem Statement 26107 Prototype
                </span>
                <span>
                  <strong>Title:</strong> “AI-powered Intelligent Assistant for Indian Standards and BIS Services for Industries and Consumers.”
                </span>
                <span className="block text-[11px] text-slate-400 mt-1">
                  <strong>Academic & Prototype Disclosure:</strong> e-BIS Sahayak is an AI assistant developed specifically for Smart India Hackathon (SIH Problem Statement 26107). It is an independent research prototype designed to assist users in discovering Indian Standards and BIS procedures through natural language. It is <strong>NOT officially operated by the Bureau of Indian Standards (BIS)</strong>. All statutory certification applications, licensing, and gazette notifications must be officially verified on <em>manakonline.in</em> and <em>bis.gov.in</em>.
                </span>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={() => onCheckOfficial('https://www.manakonline.in', 'Manak Online e-BIS Portal')}
                className="px-3 py-1.5 rounded bg-[#0A3D91] hover:bg-[#1652B5] text-white text-[11px] font-bold border border-blue-600 transition flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Verify on e-BIS</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            5. BOTTOM FOOTER (LEGAL, POLICIES, DISCLAIMERS & COPYRIGHT)
            ========================================================================= */}
        <div className="mt-8 pt-6 border-t border-blue-900/60 text-slate-400 text-[11px] space-y-3">
          {/* Main Bottom Identity */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-slate-300">
            <div>
              <div className="font-bold text-white text-xs">
                e-BIS Sahayak — AI-powered assistance for Indian Standards and BIS Services
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Helping industries, MSMEs, laboratories, consumers and citizens discover relevant standards and BIS services through natural-language interaction.
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold text-[11px]">System Status: Operational</span>
            </div>
          </div>

          {/* Policies Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-slate-400 text-[11px]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <button onClick={() => setActivePolicyModal('policies')} className="hover:text-amber-300 transition cursor-pointer">
                Website Policies
              </button>
              <span>|</span>
              <button onClick={() => setActivePolicyModal('terms')} className="hover:text-amber-300 transition cursor-pointer">
                Terms & Conditions
              </button>
              <span>|</span>
              <button onClick={() => setActivePolicyModal('disclaimer')} className="hover:text-amber-300 transition cursor-pointer">
                Disclaimer
              </button>
              <span>|</span>
              <button onClick={() => onNavigate('discover')} className="hover:text-amber-300 transition cursor-pointer">
                Sitemap
              </button>
              <span>|</span>
              <button onClick={() => onNavigate('ai-assistant')} className="hover:text-amber-300 transition cursor-pointer">
                Help
              </button>
            </div>

            <div className="text-slate-400">
              Content and services related to Bureau of Indian Standards.
            </div>
          </div>

          {/* Statutory Copyright */}
          <div className="pt-2 border-t border-blue-950 flex flex-wrap items-center justify-between gap-2 text-slate-500 text-[10.5px]">
            <div>
              © Bureau of Indian Standards. All rights reserved.
            </div>
            <div>
              Built for Smart India Hackathon (SIH PS 26107) • Prototype for demonstration purposes only.
            </div>
          </div>
        </div>

      </div>

      {/* Policy / Feedback Dialog Modal */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#072B68] text-white border-2 border-[#D97706] rounded-xl shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setActivePolicyModal(null)}
              className="absolute top-4 right-4 p-1 rounded-md text-slate-300 hover:text-white hover:bg-blue-900 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {activePolicyModal === 'policies' && (
              <div>
                <h4 className="text-base font-bold text-amber-300 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                  <span>Website Policies</span>
                </h4>
                <div className="text-xs text-slate-200 space-y-2 leading-relaxed max-h-80 overflow-y-auto pr-1">
                  <p><strong>Data Privacy:</strong> Queries submitted to e-BIS Sahayak are processed locally and securely for standards discovery. No sensitive manufacturing trade secrets are stored or shared.</p>
                  <p><strong>Hyperlinking Policy:</strong> Links to external government websites (such as manakonline.in and bis.gov.in) are provided for genuine user convenience and official certification compliance.</p>
                  <p><strong>Accessibility:</strong> Built following Government of India Guidelines for Indian Government Websites (GIGW) for high contrast and responsive multi-device accessibility.</p>
                </div>
              </div>
            )}

            {activePolicyModal === 'terms' && (
              <div>
                <h4 className="text-base font-bold text-amber-300 mb-2 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-amber-300" />
                  <span>Terms & Conditions</span>
                </h4>
                <div className="text-xs text-slate-200 space-y-2 leading-relaxed max-h-80 overflow-y-auto pr-1">
                  <p>This web application is developed as an intelligent prototype under <strong>Smart India Hackathon Problem Statement 26107</strong>.</p>
                  <p>All recommendations generated by the AI assistant are guidance summaries. For legally binding statutory compliance, users must consult official gazette orders and BIS licensing officers.</p>
                </div>
              </div>
            )}

            {activePolicyModal === 'disclaimer' && (
              <div>
                <h4 className="text-base font-bold text-amber-300 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-300" />
                  <span>Disclaimer</span>
                </h4>
                <div className="text-xs text-slate-200 space-y-2 leading-relaxed max-h-80 overflow-y-auto pr-1">
                  <p>e-BIS Sahayak is an educational and hackathon demonstration prototype. It is not an official branch of the Bureau of Indian Standards.</p>
                  <p>Official standards documents (IS codes) are copyrighted by the Bureau of Indian Standards and must be purchased or viewed via <em>manakonline.in</em>.</p>
                </div>
              </div>
            )}

            {activePolicyModal === 'feedback' && (
              <div>
                <h4 className="text-base font-bold text-amber-300 mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-300" />
                  <span>Feedback & Suggestions</span>
                </h4>
                <p className="text-xs text-slate-200 mb-4 leading-relaxed">
                  We welcome evaluation feedback for the SIH 26107 prototype. Let us know how e-BIS Sahayak can better support Indian manufacturers, MSMEs, laboratories, and citizens.
                </p>
                <div className="p-3 rounded-lg bg-[#04142C] border border-blue-800 text-xs text-slate-300 space-y-1">
                  <div><strong>Team:</strong> e-BIS Sahayak Hackathon Engineering Team</div>
                  <div><strong>Problem Statement:</strong> SIH 26107</div>
                  <div><strong>Email:</strong> support@bis-sahayak.prototype.gov.in (Demo)</div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setActivePolicyModal(null)}
                    className="px-4 py-1.5 rounded bg-amber-400 text-slate-900 font-bold text-xs hover:bg-amber-300 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <div className="mt-5 pt-3 border-t border-blue-900/60 flex justify-end">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="px-4 py-1.5 rounded bg-blue-950 hover:bg-blue-900 text-slate-200 text-xs font-bold border border-blue-800 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
