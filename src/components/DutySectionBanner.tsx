import React from 'react';
import { Moon, Sparkles, MapPin, Calendar, Info } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

interface DutySectionBannerProps {
  currentCity: string;
  onDutyCount: number;
}

export const DutySectionBanner: React.FC<DutySectionBannerProps> = ({
  currentCity,
  onDutyCount
}) => {
  const { t } = useTranslation();

  const formattedDate = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        
        {/* Subtle Glow */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Moon className="w-3.5 h-3.5 fill-emerald-400" />
              <span>{t.dutyTonightBadge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {t.dutyTitle}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {t.dutySubtitle}
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mt-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{formattedDate}</span>
              </span>

              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentCity}</span>
              </span>

              <span className="flex items-center gap-1.5 text-emerald-400 font-extrabold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{onDutyCount} {t.filterOnDuty} Active</span>
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 max-w-xs text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-bold text-white mb-1">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>Verified Duty Rota</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              {t.dutySourceInfo}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
