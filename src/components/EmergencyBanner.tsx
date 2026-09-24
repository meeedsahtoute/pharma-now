import React from 'react';
import { Shield, Moon, Flame, HeartPulse } from 'lucide-react';

interface EmergencyBannerProps {
  onFilterOnDuty: () => void;
  isOnDutyActive: boolean;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  onFilterOnDuty,
  isOnDutyActive
}) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border-b border-rose-900/30 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left Status message */}
        <div className="flex items-center gap-2 text-slate-300">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="font-semibold text-rose-300">Midnight Emergency Hotline:</span>
          <span className="text-slate-400 hidden sm:inline">Direct access to verified on-duty pharmacies and medical hotlines.</span>
        </div>

        {/* Speed Dials */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {/* SAMU 15 */}
          <a
            href="tel:15"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/50 text-rose-200 font-bold hover:text-white transition"
          >
            <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
            <span>SAMU 15</span>
          </a>

          {/* Police 19 */}
          <a
            href="tel:19"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold hover:text-white transition"
          >
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>Police 19</span>
          </a>

          {/* Fire 15 */}
          <a
            href="tel:150"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold hover:text-white transition"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Secours 150</span>
          </a>

          {/* On Duty Direct Filter */}
          <button
            onClick={onFilterOnDuty}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition ${
              isOnDutyActive
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>{isOnDutyActive ? '✓ Showing On-Duty' : '🌙 Night Duty Only'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
