import React from 'react';
import { Navigation, AlertTriangle, CheckCircle2, MapPin, Loader2 } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import type { StructuredLocationState } from '../services/locationService';

interface LocationStatusCardProps {
  locationState?: StructuredLocationState;
  isPermissionDenied: boolean;
  isPermissionGranted: boolean;
  isLocating: boolean;
  currentCity: string;
  onSelectCityClick: () => void;
  onRequestGPS: () => void;
}

export const LocationStatusCard: React.FC<LocationStatusCardProps> = ({
  locationState,
  isPermissionDenied,
  isPermissionGranted,
  isLocating,
  currentCity,
  onSelectCityClick,
  onRequestGPS
}) => {
  const { t } = useTranslation();

  const sourceLabel = locationState?.source === 'gps'
    ? 'GPS ACTIVE'
    : locationState?.source === 'manual'
    ? 'MANUAL CITY'
    : 'SAVED CITY';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-2">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm transition">
        
        {/* State 1: Locating in progress */}
        {isLocating && (
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Detecting your location in Morocco...
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Accessing browser geolocation coordinates & reverse geocoding...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* State 2: Permission Granted & Live GPS Active */}
        {!isLocating && isPermissionGranted && (
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>{currentCity}</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                    {sourceLabel}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Showing verified on-duty pharmacies near <span className="font-semibold text-slate-700 dark:text-slate-300">{currentCity}</span> ({locationState?.region || 'Morocco'})
                </p>
              </div>
            </div>

            <button
              onClick={onSelectCityClick}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.locationSelectCityBtn}</span>
            </button>
          </div>
        )}

        {/* State 3: Permission Denied or Location Unavailable */}
        {!isLocating && (isPermissionDenied || !isPermissionGranted) && (
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>{currentCity}</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase">
                    MANUAL CITY
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t.locationDisabledSubtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onRequestGPS}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t.locationEnableBtn}</span>
              </button>

              <button
                onClick={onSelectCityClick}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition active:scale-95"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{t.locationSelectCityBtn}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
