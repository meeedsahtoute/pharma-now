import { useState, useEffect } from 'react';
import { usePharmacies } from './hooks/usePharmacies';
import { usePWA } from './hooks/usePWA';
import { useTranslation } from './context/LanguageContext';

import { Header, type NavTab } from './components/Header';
import { Hero } from './components/Hero';
import { DuaSection } from './components/DuaSection';
import { HealthTodaySection } from './components/HealthTodaySection';
import { LocationStatusCard } from './components/LocationStatusCard';
import { EmergencySection } from './components/EmergencySection';
import { DutySectionBanner } from './components/DutySectionBanner';
import { FilterBar } from './components/FilterBar';
import { PharmacyList } from './components/PharmacyList';
import { MapView } from './components/MapView';
import { HealthGuideView } from './components/HealthGuideView';
import { MedicationInfoView } from './components/MedicationInfoView';
import { CityDirectoryView } from './components/CityDirectoryView';
import { PharmaAIView } from './components/PharmaAIView';

import { PharmacyDetailModal } from './components/PharmacyDetailModal';
import { CitySearchModal } from './components/CitySearchModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { OfflineBanner } from './components/OfflineBanner';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { SimulationToolbar } from './components/SimulationToolbar';
import { Footer } from './components/Footer';

import type { Pharmacy } from './types/pharmacy';
import type { HealthArticle } from './data/healthData';
import { Map, List } from 'lucide-react';

export function App() {
  const { t } = useTranslation();

  const {
    location,
    countryCode,
    filters,
    setFilters,
    handleSearchChange,
    setCity,
    requestLocation,
    pharmacies,
    isLoading,
    isFallbackMode,
    errorMessage,
    testOverrides,
    setTestOverrides,
    savedIds,
    toggleSavePharmacy
  } = usePharmacies();

  const { isOffline, canInstall, triggerInstall } = usePWA();

  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [selectedHealthArticle, setSelectedHealthArticle] = useState<HealthArticle | null>(null);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list');
  const [activeTab, setActiveTab] = useState<NavTab>('find');

  const [showCityModal, setShowCityModal] = useState<boolean>(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleResetFilters = () => {
    setFilters(prev => ({
      ...prev,
      searchQuery: '',
      onlyOnDuty: false,
      onlyOpenNow: false,
      only247: false,
      onlyDelivery: false,
      maxRadiusKm: 15,
      sortBy: 'distance'
    }));
  };

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'duty') {
      setFilters(prev => ({ ...prev, onlyOnDuty: true }));
    } else if (tab === 'cities') {
      setShowCityModal(true);
    } else if (tab === 'how') {
      setShowHowItWorksModal(true);
    } else if (tab === 'find') {
      setFilters(prev => ({ ...prev, onlyOnDuty: false }));
    }
  };

  const onDutyCount = pharmacies.filter(p => p.calculatedStatus?.status === 'on_duty').length;

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Offline Alert Banner */}
      <OfflineBanner isOffline={isOffline} />

      {/* Main Header */}
      <Header
        currentCity={location.city}
        onCityClick={() => setShowCityModal(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Main View Switcher depending on Active Tab */}
      {activeTab === 'ai' ? (
        <PharmaAIView
          currentCity={location.city}
          countryCode={countryCode}
          onGoToPharmacySearch={(query) => {
            setActiveTab('find');
            handleSearchChange(query);
          }}
        />
      ) : activeTab === 'health' ? (
        <HealthGuideView
          selectedArticleFromHome={selectedHealthArticle}
          onClearSelectedArticle={() => setSelectedHealthArticle(null)}
          onFindPharmacyForTopic={(topic) => {
            setActiveTab('find');
            handleSearchChange(topic);
          }}
        />
      ) : activeTab === 'medications' ? (
        <MedicationInfoView
          onFindPharmacyForMedication={(medName) => {
            setActiveTab('find');
            handleSearchChange(medName);
          }}
        />
      ) : activeTab === 'cities' ? (
        <CityDirectoryView
          currentCity={location.city}
          onSelectCity={(cityName) => setCity(cityName)}
          onGoToPharmacyFinder={() => setActiveTab('find')}
        />
      ) : (
        <>
          {/* Hero Section with Large Search */}
          <Hero
            searchQuery={filters.searchQuery}
            onSearchChange={handleSearchChange}
            onFindNearMe={requestLocation}
            onSelectCity={() => setShowCityModal(true)}
            onSelectCityDirect={(cityName) => setCity(cityName)}
          />

          {/* Respectful Dua for Healing Section */}
          <DuaSection />

          {/* Dedicated Duty Banner when ON-DUTY mode active */}
          {activeTab === 'duty' && (
            <DutySectionBanner
              currentCity={location.city}
              onDutyCount={onDutyCount}
            />
          )}

          {/* Location Status Card */}
          <LocationStatusCard
            locationState={location}
            isPermissionDenied={location.isPermissionDenied || !!testOverrides.forceLocationPermissionDenied}
            isPermissionGranted={location.isPermissionGranted}
            isLocating={location.isLocating}
            currentCity={location.city}
            onSelectCityClick={() => setShowCityModal(true)}
            onRequestGPS={requestLocation}
          />

          {/* Emergency Hotlines Section (Morocco-aware) */}
          <EmergencySection countryCode={countryCode} />

          {/* Homepage Health Guide Cards */}
          <HealthTodaySection
            onOpenArticle={(article) => {
              setSelectedHealthArticle(article);
              setActiveTab('health');
            }}
            onOpenFullGuide={() => setActiveTab('health')}
          />

          {/* Filters & Control Chips */}
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            resultCount={pharmacies.length}
          />

          {/* Main Section: Pharmacy List & Sticky Map */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col">
            
            {/* Mobile View Switcher Tabs (List / Map) */}
            <div className="flex md:hidden items-center p-1 bg-slate-200 dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-800 mb-4">
              <button
                onClick={() => setMobileTab('list')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition ${
                  mobileTab === 'list'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <List className="w-4 h-4" />
                <span>{t.tabList} ({pharmacies.length})</span>
              </button>

              <button
                onClick={() => setMobileTab('map')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition ${
                  mobileTab === 'map'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Map className="w-4 h-4" />
                <span>{t.tabMap}</span>
              </button>
            </div>

            {/* Dual-Pane Layout: List Left, Sticky Map Right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 items-start">
              
              {/* Left: Pharmacy List */}
              <div className={`md:col-span-6 lg:col-span-5 flex flex-col ${mobileTab === 'list' ? 'block' : 'hidden md:block'}`}>
                <PharmacyList
                  pharmacies={pharmacies}
                  isLoading={isLoading}
                  isFallbackMode={isFallbackMode}
                  errorMessage={errorMessage}
                  onSelectPharmacy={(p) => setSelectedPharmacy(p)}
                  onFocusOnMap={(p) => {
                    setSelectedPharmacy(p);
                    setMobileTab('map');
                  }}
                  onResetFilters={handleResetFilters}
                  onExpandRadius={(newRadius) => setFilters(prev => ({ ...prev, maxRadiusKm: newRadius }))}
                  onSelectCityClick={() => setShowCityModal(true)}
                  currentRadius={filters.maxRadiusKm}
                  savedIds={savedIds}
                  onToggleSave={toggleSavePharmacy}
                />
              </div>

              {/* Right: Interactive Map View */}
              <div className={`md:col-span-6 lg:col-span-7 h-[calc(100vh-220px)] sticky top-24 ${mobileTab === 'map' ? 'block h-[calc(100vh-240px)]' : 'hidden md:block'}`}>
                <MapView
                  pharmacies={pharmacies}
                  location={{
                    lat: location.latitude,
                    lng: location.longitude,
                    city: location.city,
                    isPermissionGranted: location.isPermissionGranted,
                    isPermissionDenied: location.isPermissionDenied,
                    isLocating: location.isLocating,
                    error: location.error
                  }}
                  selectedPharmacy={selectedPharmacy}
                  onSelectPharmacy={(p) => setSelectedPharmacy(p)}
                />
              </div>

            </div>

          </main>
        </>
      )}

      {/* Full Pharmacy Detail Modal */}
      {selectedPharmacy && (
        <PharmacyDetailModal
          pharmacy={selectedPharmacy}
          onClose={() => setSelectedPharmacy(null)}
        />
      )}

      {/* Global City Search Modal */}
      {showCityModal && (
        <CitySearchModal
          currentCity={location.city}
          onSelectCity={(cityName) => {
            setCity(cityName);
            setShowCityModal(false);
          }}
          onClose={() => setShowCityModal(false)}
        />
      )}

      {/* How It Works Modal */}
      {showHowItWorksModal && (
        <HowItWorksModal
          onClose={() => setShowHowItWorksModal(false)}
        />
      )}

      {/* PWA Prompt Banner */}
      <PWAInstallBanner
        canInstall={canInstall}
        onInstall={triggerInstall}
      />

      {/* QA Edge Case Simulation Toolbar */}
      <SimulationToolbar
        testOverrides={testOverrides}
        setTestOverrides={setTestOverrides}
        onSimulateCity={setCity}
        onSimulateSearch={(q) => handleSearchChange(q)}
        isOffline={isOffline}
        canInstall={canInstall}
      />

      {/* Footer */}
      <Footer
        onTabChange={handleTabChange}
        onCityClick={() => setShowCityModal(true)}
      />

    </div>
  );
}
