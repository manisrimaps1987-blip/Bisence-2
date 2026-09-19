import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExternalExitModal } from './components/ExternalExitModal';
import { WhyStandardModal } from './components/WhyStandardModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { FloatingAssistant } from './components/FloatingAssistant';
import { AuthModal } from './views/AuthModal';

// Views
import { HomeView } from './views/HomeView';
import { DiscoverView } from './views/DiscoverView';
import { JourneyView } from './views/JourneyView';
import { NotificationsView } from './views/NotificationsView';
import { ConsumerView } from './views/ConsumerView';
import { IndustryWorkspaceView } from './views/IndustryWorkspaceView';
import { LabFinderView } from './views/LabFinderView';
import { HallmarkingView } from './views/HallmarkingView';
import { DocIntelligenceView } from './views/DocIntelligenceView';
import { KnowledgeGraphView } from './views/KnowledgeGraphView';
import { AiAssistantView } from './views/AiAssistantView';
import { AdminDemoView } from './views/AdminDemoView';

import { LanguageCode, UserRole, StandardItem, ProductIntelligence } from './types';
import { SAMPLE_STANDARDS } from './data/standardsData';

export default function App() {
  // Navigation & UI State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Authentication State
  const [userRole, setUserRole] = useState<UserRole | null>('MANUFACTURER');
  const [userName, setUserName] = useState<string | null>('Ananya Sharma');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  // Search & Modal State
  const [globalSearchOpen, setGlobalSearchOpen] = useState<boolean>(false);
  const [externalExit, setExternalExit] = useState<{ isOpen: boolean; url: string; portalName: string }>({
    isOpen: false,
    url: '',
    portalName: ''
  });
  const [whyModal, setWhyModal] = useState<{
    isOpen: boolean;
    standard: StandardItem | null;
    dna: ProductIntelligence | null;
  }>({
    isOpen: false,
    standard: null,
    dna: null
  });

  // Active Product Scoping Context
  const [initialProductPrompt, setInitialProductPrompt] = useState<string>('');
  const [activeDna, setActiveDna] = useState<ProductIntelligence | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<StandardItem | null>(SAMPLE_STANDARDS[0]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll to top on tab change
  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safe external link interceptor
  const handleCheckOfficial = (url: string, name: string) => {
    setExternalExit({
      isOpen: true,
      url,
      portalName: name
    });
  };

  // Product Analysis trigger from Home or Workspace
  const handleAnalyzeFromHome = (desc: string) => {
    setInitialProductPrompt(desc);
    setCurrentTab('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWhyModal = (std: StandardItem, dna: ProductIntelligence | null) => {
    setWhyModal({
      isOpen: true,
      standard: std,
      dna: dna
    });
  };

  const handleAuthSuccess = (role: UserRole, name: string) => {
    setUserRole(role);
    setUserName(name);
  };

  const handleSignOut = () => {
    setUserRole(null);
    setUserName(null);
  };

  const handleSelectStandardFromSearch = (stdId: string) => {
    const std = SAMPLE_STANDARDS.find(s => s.id === stdId);
    if (std) {
      setSelectedStandard(std);
      setCurrentTab('discover');
    }
  };

  const handleSelectNotifFromSearch = (notifId: string) => {
    setCurrentTab('notifications');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-amber-200 selection:text-amber-950 transition-colors">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        userRole={userRole}
        userName={userName}
        onOpenAuth={() => setAuthModalOpen(true)}
        onSignOut={handleSignOut}
        onOpenGlobalSearch={() => setGlobalSearchOpen(true)}
        onCheckOfficial={handleCheckOfficial}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            language={language}
            onAnalyzeProduct={handleAnalyzeFromHome}
            onNavigate={handleNavigate}
            onCheckOfficial={handleCheckOfficial}
          />
        )}

        {currentTab === 'discover' && (
          <DiscoverView
            initialProductDesc={initialProductPrompt}
            onCheckOfficial={handleCheckOfficial}
            onOpenWhyModal={handleOpenWhyModal}
            onAddToJourney={(std) => {
              setSelectedStandard(std);
              handleNavigate('journey');
            }}
          />
        )}

        {currentTab === 'journey' && (
          <JourneyView
            productDna={activeDna}
            selectedStandard={selectedStandard}
            onCheckOfficial={handleCheckOfficial}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'notifications' && (
          <NotificationsView
            onCheckOfficial={handleCheckOfficial}
          />
        )}

        {currentTab === 'consumer' && (
          <ConsumerView
            onCheckOfficial={handleCheckOfficial}
          />
        )}

        {currentTab === 'industry' && (
          <IndustryWorkspaceView
            onNavigate={handleNavigate}
            onCheckOfficial={handleCheckOfficial}
            onNewAnalysis={handleAnalyzeFromHome}
          />
        )}

        {currentTab === 'labs' && (
          <LabFinderView
            onCheckOfficial={handleCheckOfficial}
          />
        )}

        {currentTab === 'hallmarking' && (
          <HallmarkingView
            onCheckOfficial={handleCheckOfficial}
          />
        )}

        {currentTab === 'docs' && (
          <DocIntelligenceView
            onCheckOfficial={handleCheckOfficial}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'graph' && (
          <KnowledgeGraphView
            onCheckOfficial={handleCheckOfficial}
          />
        )}

        {currentTab === 'ai-assistant' && (
          <AiAssistantView
            language={language}
            onCheckOfficial={handleCheckOfficial}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDemoView />
        )}
      </main>

      {/* Floating Assistant Trigger */}
      <FloatingAssistant
        onOpenFullAssistant={() => handleNavigate('ai-assistant')}
        onCheckOfficial={handleCheckOfficial}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onCheckOfficial={handleCheckOfficial}
      />

      {/* Modals */}
      <ExternalExitModal
        isOpen={externalExit.isOpen}
        onClose={() => setExternalExit({ isOpen: false, url: '', portalName: '' })}
        destinationUrl={externalExit.url}
        portalName={externalExit.portalName}
      />

      <WhyStandardModal
        isOpen={whyModal.isOpen}
        onClose={() => setWhyModal({ isOpen: false, standard: null, dna: null })}
        standard={whyModal.standard}
        productDna={whyModal.dna}
        onCheckOfficial={handleCheckOfficial}
      />

      <GlobalSearchModal
        isOpen={globalSearchOpen}
        onClose={() => setGlobalSearchOpen(false)}
        onSelectStandard={handleSelectStandardFromSearch}
        onSelectNotification={handleSelectNotifFromSearch}
        onNavigate={handleNavigate}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
