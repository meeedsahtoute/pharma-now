import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Globe, Moon, Sun, BookOpen, Pill, Sparkles } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import type { Language } from '../i18n/translations';

export type NavTab = 'find' | 'duty' | 'cities' | 'health' | 'medications' | 'how' | 'ai';

interface HeaderProps {
  currentCity: string;
  onCityClick: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  onCityClick,
  isDarkMode,
  onToggleDarkMode,
  activeTab,
  onTabChange
}) => {
  const { t, language, setLanguage, isRTL } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string; native: string }[] = [
    { code: 'FR', name: 'Français', native: 'Français' },
    { code: 'AR', name: 'Arabic', native: 'العربية' },
    { code: 'EN', name: 'English', native: 'English' }
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onTabChange('find')}
              className="flex items-center gap-2.5 group text-left transition"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold text-xl shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                ✚
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white leading-none font-sans flex items-center gap-1">
                  PHARMA<span className="text-emerald-600 dark:text-emerald-400">NOW</span>
                  <span className="text-xs">🇲🇦</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
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

          {/* Right Controls: Location Badge, i18n Selector, Theme Toggle */}
          <div className="flex items-center gap-2">
            
            {/* City Location Button */}
            <button
              onClick={onCityClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition"
              title={t.cityModalTitle}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate max-w-[100px] sm:max-w-[120px]">{currentCity}</span>
            </button>

            {/* i18n Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition"
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

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-600" />}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
