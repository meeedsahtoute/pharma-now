import React from 'react';
import { Sparkles, Clock, Truck } from 'lucide-react';
import type { FilterOptions } from '../types/pharmacy';
import { useTranslation } from '../context/LanguageContext';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resultCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  resultCount
}) => {
  const { t } = useTranslation();

  const toggleFilter = (key: keyof FilterOptions) => {
    onFilterChange(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col gap-3">
        
        {/* Top Row: Quick Filter Badges */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
            
            {/* ON DUTY Filter (Primary highlight) */}
            <button
              onClick={() => toggleFilter('onlyOnDuty')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filters.onlyOnDuty
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.filterOnDuty}</span>
            </button>

            {/* OPEN NOW Filter */}
            <button
              onClick={() => toggleFilter('onlyOpenNow')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filters.onlyOpenNow
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{t.filterOpenNow}</span>
            </button>

            {/* 24/7 Filter */}
            <button
              onClick={() => toggleFilter('only247')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filters.only247
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              <span>{t.filter247}</span>
            </button>

            {/* Delivery Filter */}
            <button
              onClick={() => toggleFilter('onlyDelivery')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filters.onlyDelivery
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{t.filterDelivery}</span>
            </button>

          </div>

          {/* Results Counter Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl">
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{resultCount}</span> {t.resultsCount}
            </span>
          </div>

        </div>

        {/* Bottom Row: Sorting & Radius Control */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400">
          
          {/* Sorting */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">{t.sortByLabel}</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 text-slate-800 dark:text-slate-200 text-xs font-bold focus:outline-none focus:border-emerald-500"
            >
              <option value="distance">{t.sortNearest}</option>
              <option value="status">{t.sortFastest}</option>
              <option value="name">{t.sortVerified}</option>
            </select>
          </div>

          {/* Radius Slider */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {t.radiusLabel} <span className="text-emerald-600 dark:text-emerald-400">{filters.maxRadiusKm} km</span>
            </span>
            <input
              type="range"
              min="1"
              max="50"
              value={filters.maxRadiusKm}
              onChange={(e) => onFilterChange(prev => ({ ...prev, maxRadiusKm: Number(e.target.value) }))}
              className="w-24 sm:w-32 accent-emerald-600"
            />
          </div>

        </div>

      </div>
    </div>
  );
};
