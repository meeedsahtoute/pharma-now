import React from 'react';
import { PRESET_CITIES, type CityLocation } from '../services/geocodingService';
import { MapPin, Building2, ChevronRight } from 'lucide-react';

interface CityDirectoryViewProps {
  currentCity: string;
  onSelectCity: (cityName: string) => void;
  onGoToPharmacyFinder: () => void;
}

export const CityDirectoryView: React.FC<CityDirectoryViewProps> = ({
  currentCity,
  onSelectCity,
  onGoToPharmacyFinder
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl mb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Kingdom of Morocco 🇲🇦</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Moroccan City Pharmacy Directory
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Select any Moroccan city or region to view live on-duty rosters, open pharmacies, directions, and verified local contact information.
          </p>
        </div>
      </div>

      {/* Grid of Moroccan Cities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {PRESET_CITIES.map((city: CityLocation) => {
          const isCurrent = currentCity.toLowerCase() === city.name.toLowerCase();

          return (
            <div
              key={city.displayName}
              onClick={() => {
                onSelectCity(city.name);
                onGoToPharmacyFinder();
              }}
              className={`group p-5 rounded-3xl border text-left transition cursor-pointer flex flex-col justify-between gap-3 ${
                isCurrent
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-emerald-500/50 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {city.region}
                  </span>
                  {city.isPopular && (
                    <span className="text-[10px] font-extrabold text-emerald-400">
                      ★ Popular
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-lg flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{city.name}</span>
                </h3>

                <p className={`text-xs ${isCurrent ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'} mt-1`}>
                  {city.displayName}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold">
                <span>View Pharmacies</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
