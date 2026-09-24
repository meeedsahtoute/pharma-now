import React, { useState, useMemo } from 'react';
import { X, Search, MapPin, Globe } from 'lucide-react';
import { PRESET_CITIES, geocodeLocation } from '../services/geocodingService';
import { useTranslation } from '../context/LanguageContext';

interface CitySearchModalProps {
  currentCity: string;
  onSelectCity: (cityName: string) => void;
  onClose: () => void;
}

export const CitySearchModal: React.FC<CitySearchModalProps> = ({
  currentCity,
  onSelectCity,
  onClose
}) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isSearchingGlobal, setIsSearchingGlobal] = useState(false);

  const filteredPresets = useMemo(() => {
    if (!query.trim()) return PRESET_CITIES;
    const q = query.toLowerCase().trim();
    return PRESET_CITIES.filter(
      c => c.name.toLowerCase().includes(q) ||
           c.country.toLowerCase().includes(q) ||
           c.displayName.toLowerCase().includes(q)
    );
  }, [query]);

  const handleGlobalSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearchingGlobal(true);
    const result = await geocodeLocation(query);
    setIsSearchingGlobal(false);

    if (result) {
      onSelectCity(result.name);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              {t.cityModalTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global City Search Input */}
        <form onSubmit={handleGlobalSearch} className="py-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.citySearchPlaceholder}
              className="w-full pl-10 pr-24 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={isSearchingGlobal || !query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition"
            >
              {isSearchingGlobal ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* City Directory List */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4">
          
          {/* Popular Morocco & Global Cities Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Popular Cities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredPresets.map((city) => (
                <button
                  key={city.displayName}
                  onClick={() => {
                    onSelectCity(city.name);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl border text-left flex flex-col transition ${
                    currentCity.toLowerCase() === city.name.toLowerCase()
                      ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-500'
                  }`}
                >
                  <span className="text-xs font-bold truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{city.name}</span>
                  </span>
                  <span className="text-[10px] opacity-75 truncate">{city.country}</span>
                </button>
              ))}
            </div>
          </div>

          {filteredPresets.length === 0 && (
            <div className="text-center py-6 text-slate-400 text-xs">
              <p>{t.citySearchNoResults}</p>
              <p className="text-[11px] mt-1 text-slate-500">Press "Search" above to lookup global geocoding.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
