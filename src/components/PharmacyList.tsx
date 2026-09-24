import React from 'react';
import type { Pharmacy } from '../types/pharmacy';
import { PharmacyCard } from './PharmacyCard';
import { SearchX, AlertTriangle } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

interface PharmacyListProps {
  pharmacies: Pharmacy[];
  isLoading: boolean;
  isFallbackMode: boolean;
  errorMessage: string | null;
  onSelectPharmacy: (p: Pharmacy) => void;
  onFocusOnMap: (p: Pharmacy) => void;
  onResetFilters: () => void;
  onExpandRadius: (newRadius: number) => void;
  onSelectCityClick: () => void;
  currentRadius: number;
  savedIds?: string[];
  onToggleSave?: (id: string) => void;
}

export const PharmacyList: React.FC<PharmacyListProps> = ({
  pharmacies,
  isLoading,
  isFallbackMode,
  onSelectPharmacy,
  onFocusOnMap,
  onResetFilters,
  onExpandRadius,
  onSelectCityClick,
  currentRadius,
  savedIds = [],
  onToggleSave
}) => {
  const { t } = useTranslation();

  // 1. Loading Skeletons
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm animate-pulse flex flex-col gap-3"
          >
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-full mt-2"></div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Empty State
  if (pharmacies.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 text-center shadow-sm flex flex-col items-center justify-center my-4">
        
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
          <SearchX className="w-7 h-7" />
        </div>

        <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white mb-2">
          {t.noPharmaciesTitle}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
          {t.noPharmaciesText}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onSelectCityClick}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition active:scale-95"
          >
            {t.btnTryAnotherCity}
          </button>

          <button
            onClick={() => onExpandRadius(Math.min(50, currentRadius + 15))}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition active:scale-95"
          >
            {t.btnExpandRadius} ({currentRadius + 15} km)
          </button>

          <button
            onClick={onResetFilters}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold transition"
          >
            {t.btnResetFilters}
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      
      {/* Resilient Fallback Dataset Transparency Banner */}
      {isFallbackMode && (
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{t.demoDataBadge}: Displaying verified syndicate roster snapshot for this area.</span>
          </div>
        </div>
      )}

      {/* Pharmacy Cards Stack */}
      {pharmacies.map((pharmacy) => (
        <PharmacyCard
          key={pharmacy.id}
          pharmacy={pharmacy}
          onSelect={() => onSelectPharmacy(pharmacy)}
          onFocusOnMap={() => onFocusOnMap(pharmacy)}
          isSaved={savedIds.includes(pharmacy.id)}
          onToggleSave={onToggleSave ? () => onToggleSave(pharmacy.id) : undefined}
        />
      ))}

    </div>
  );
};
