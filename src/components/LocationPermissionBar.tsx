import React from 'react';
import { MapPin, AlertCircle, Compass, Check } from 'lucide-react';
import { CITY_COORDINATES } from '../data/mockPharmacies';

interface LocationPermissionBarProps {
  isPermissionDenied: boolean;
  isLocating: boolean;
  currentCity: string;
  onSelectCity: (city: string) => void;
  onRequestGPS: () => void;
}

export const LocationPermissionBar: React.FC<LocationPermissionBarProps> = ({
  isPermissionDenied,
  isLocating,
  currentCity,
  onSelectCity,
  onRequestGPS
}) => {
  const cities = Object.keys(CITY_COORDINATES);

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Info label */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              {isPermissionDenied ? 'GPS Access Disabled' : 'Location Setup'}
              <span className="text-xs font-normal text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                Manual City Mode
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isPermissionDenied
                ? 'Location permission was denied. Select your current city below or enable GPS to find nearest pharmacies.'
                : 'Select your city to browse verified local on-duty pharmacies instantly.'}
            </p>
          </div>
        </div>

        {/* City selector buttons & GPS Retry */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {cities.map((city) => {
            const isSelected = city.toLowerCase() === currentCity.toLowerCase();
            return (
              <button
                key={city}
                onClick={() => onSelectCity(city)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{city}</span>
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            );
          })}

          {/* GPS Retry */}
          <button
            onClick={onRequestGPS}
            disabled={isLocating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition active:scale-95 disabled:opacity-50"
          >
            <Compass className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'Use My GPS'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
