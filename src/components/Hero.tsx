import React from 'react';
import { Search, Navigation, Building2, MapPin } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onFindNearMe: () => void;
  onSelectCity: () => void;
  onSelectCityDirect: (cityName: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onFindNearMe,
  onSelectCity,
  onSelectCityDirect
}) => {
  const { t } = useTranslation();

  const moroccanCities = [
    'Nador',
    'Oujda',
    'Casablanca',
    'Rabat',
    'Tangier',
    'Fes',
    'Marrakesh',
    'Agadir'
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-8 pb-10 sm:pt-14 sm:pb-16 border-b border-slate-200 dark:border-slate-800">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Flag Badge */}
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-6 max-w-full text-center">
          <span>🇲🇦</span>
          <span className="truncate max-w-[210px] sm:max-w-none">ROYAL KINGDOM OF MOROCCO • MOROCCO FIRST</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.15] whitespace-pre-line break-words">
          {t.heroTitle}
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed font-normal">
          {t.heroSubtitle}
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 sm:mb-8 w-full max-w-md mx-auto">
          <button
            onClick={onFindNearMe}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 transition active:scale-95"
          >
            <Navigation className="w-4 h-4 fill-white" />
            <span>{t.heroCtaNearMe}</span>
          </button>

          <button
            onClick={onSelectCity}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold border border-slate-300 dark:border-slate-700 transition active:scale-95"
          >
            <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t.heroCtaSearchCity}</span>
          </button>
        </div>

        {/* Unified Search Bar */}
        <div className="relative max-w-2xl w-full mx-auto mb-6">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 sm:w-5 h-4 sm:h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search pharmacy, city, disease, medication or Darija..."
              className="w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-base font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-2xl transition"
            />
          </div>
        </div>

        {/* Moroccan City Badges */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 text-xs max-w-full">
          <span className="text-slate-500 dark:text-slate-400 font-medium me-1 text-[11px] sm:text-xs">{t.popularCities}</span>
          {moroccanCities.map((cityName) => (
            <button
              key={cityName}
              onClick={() => onSelectCityDirect(cityName)}
              className="px-2.5 sm:px-3 py-1 rounded-xl bg-white dark:bg-slate-800/80 hover:bg-emerald-600 hover:text-white border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-[11px] sm:text-xs transition active:scale-95 flex items-center gap-1 shadow-sm"
            >
              <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>{cityName}</span>
            </button>
          ))}
        </div>

      </div>

    </section>
  );
};
