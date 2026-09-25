import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Globe, 
  Moon, 
  Sun, 
  BookOpen, 
  Pill, 
  Sparkles, 
  Menu, 
  X, 
  Building2
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import type { Language } from '../i18n/translations';

export type NavTab = 'find' | 'duty' | 'cities' | 'health' | 'medications' | 'how' | 'ai';

interface HeaderProps {
  currentCity: string;
  onCityClick: () => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  onCityClick,
  activeTab,
  onTabChange
}) => {
  const { t, language, setLanguage, isRTL } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const langMenuRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string; native: string }[] = [
    { code: 'FR', name: 'Français', native: 'Français' },
    { code: 'AR', name: 'Arabic', native: 'العربية' },
    { code: 'EN', name: 'English', native: 'English' }
  ];

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setShowLangMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Body Scroll Lock when Mobile Menu is Open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-6">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => {
                onTabChange('find');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 group text-left transition"
            >
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 text-white font-bold text-lg sm:text-xl shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                ✚
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-none font-sans flex items-center gap-1">
                  PHARMA<span className="text-emerald-600 dark:text-emerald-400">NOW</span>
                  <span className="text-xs">🇲🇦</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                  Morocco Health & Duty Rota
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-semibold">
            <button
              onClick={() => onTabChange('find')}
              className={`px-3.5 py-1.5 rounded-full transition ${
                activeTab === 'find'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.navFindPharmacy}
            </button>

            <button
              onClick={() => onTabChange('duty')}
              className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
                activeTab === 'duty'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t.navOnDuty}</span>
            </button>

            <button
              onClick={() => onTabChange('ai')}
              className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1 font-bold ${
                activeTab === 'ai'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>PHARMA AI</span>
            </button>

            <button
              onClick={() => onTabChange('cities')}
              className={`px-3.5 py-1.5 rounded-full transition ${
                activeTab === 'cities'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.navCities}
            </button>

            <button
              onClick={() => onTabChange('health')}
              className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1 ${
                activeTab === 'health'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Health Guide</span>
            </button>

            <button
              onClick={() => onTabChange('medications')}
              className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1 ${
                activeTab === 'medications'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>Medications</span>
            </button>
          </nav>

          {/* Right Controls: Location Badge, i18n Selector, Theme Toggle & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* City Location Button */}
            <button
              onClick={onCityClick}
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition"
              title={t.cityModalTitle}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate max-w-[55px] xs:max-w-[75px] sm:max-w-[120px]">{currentCity}</span>
            </button>

            {/* i18n Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition"
                title="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>{language}</span>
              </button>

              {showLangMenu && (
                <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-1.5 z-50 animate-fade-in`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left flex items-center justify-between px-3 py-2 text-xs font-semibold transition ${
                        language === lang.code
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark/Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition active:scale-95"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Mobile Hamburger Navigation Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition active:scale-95 flex items-center justify-center"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer / Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 top-16 bg-slate-950/80 backdrop-blur-xl z-50 flex flex-col justify-start animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800/90 p-4 sm:p-5 shadow-2xl rounded-b-3xl flex flex-col gap-2.5 max-h-[calc(100dvh-4rem)] overflow-y-auto w-full max-w-lg mx-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Mobile Navigation"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 mb-1 border-b border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold text-base shadow-sm">
                  ✚
                </div>
                <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
                  PHARMA<span className="text-emerald-600 dark:text-emerald-400">NOW</span> Navigation
                </span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items Grid/List (ALL 6 RELEVANT OPTIONS VISIBLE AT ONCE) */}
            <div className="flex flex-col gap-2">
              
              {/* 1. Trouver une pharmacie */}
              <button
                onClick={() => {
                  onTabChange('find');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-extrabold transition-all border ${
                  activeTab === 'find'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${activeTab === 'find' ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-800'}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">{t.navFindPharmacy}</span>
                </div>
                <span className="text-xs opacity-60">➔</span>
              </button>

              {/* 2. Pharmacies de garde */}
              <button
                onClick={() => {
                  onTabChange('duty');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-extrabold transition-all border ${
                  activeTab === 'duty'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${activeTab === 'duty' ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-800'}`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">{t.navOnDuty}</span>
                </div>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </button>

              {/* 3. PHARMA AI */}
              <button
                onClick={() => {
                  onTabChange('ai');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-extrabold transition-all border ${
                  activeTab === 'ai'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                    : 'bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${activeTab === 'ai' ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-900 text-amber-400 border border-emerald-500/30'}`}>
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  </div>
                  <span className="text-sm font-bold">PHARMA AI Assistant</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/30">
                  AI
                </span>
              </button>

              {/* 4. Villes */}
              <button
                onClick={() => {
                  onTabChange('cities');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-extrabold transition-all border ${
                  activeTab === 'cities'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${activeTab === 'cities' ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-800'}`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">{t.navCities}</span>
                </div>
                <span className="text-xs opacity-60">➔</span>
              </button>

              {/* 5. Health Guide */}
              <button
                onClick={() => {
                  onTabChange('health');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-extrabold transition-all border ${
                  activeTab === 'health'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${activeTab === 'health' ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-800'}`}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">Health Guide</span>
                </div>
                <span className="text-xs opacity-60">➔</span>
              </button>

              {/* 6. Médications */}
              <button
                onClick={() => {
                  onTabChange('medications');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-extrabold transition-all border ${
                  activeTab === 'medications'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${activeTab === 'medications' ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-800'}`}>
                    <Pill className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">Medications</span>
                </div>
                <span className="text-xs opacity-60">➔</span>
              </button>

            </div>

          </div>
        </div>
      )}

    </header>
  );
};
