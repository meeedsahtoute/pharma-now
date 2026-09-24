import React from 'react';
import { 
  MapPin, 
  Phone, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  Bookmark, 
  Share2, 
  Sparkles
} from 'lucide-react';
import type { Pharmacy } from '../types/pharmacy';
import { formatDistance, formatETA } from '../utils/timeUtils';
import { useTranslation } from '../context/LanguageContext';

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  onSelect: () => void;
  onFocusOnMap?: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export const PharmacyCard: React.FC<PharmacyCardProps> = ({
  pharmacy,
  onSelect,
  isSaved = false,
  onToggleSave
}) => {
  const { t } = useTranslation();

  const status = pharmacy.calculatedStatus?.status || 'unknown';
  const statusLabel = pharmacy.calculatedStatus?.statusLabel || t.statusUnknown;
  const subtext = pharmacy.calculatedStatus?.subtext || t.unverifiedWarningText;

  // Status Styling Logic
  const getBadgeStyle = () => {
    switch (status) {
      case 'on_duty':
        return 'bg-emerald-600 text-white shadow-sm font-extrabold';
      case 'open':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold';
      case 'closed':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-semibold';
      case 'conflicting':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-semibold';
      case 'unknown':
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/30 font-semibold';
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.lat},${pharmacy.lng}`;

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: pharmacy.name,
        text: `Find ${pharmacy.name} on PHARMA NOW`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${pharmacy.name} - ${pharmacy.address}`);
    }
  };

  return (
    <div
      onClick={onSelect}
      className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-5 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all cursor-pointer flex flex-col gap-3"
    >
      
      {/* Card Header: Name & Status Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            
            {/* Status Badge */}
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] tracking-wide uppercase ${getBadgeStyle()}`}>
              {status === 'on_duty' && <Sparkles className="w-3 h-3 fill-white" />}
              {status === 'open' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
              <span>{statusLabel}</span>
            </span>

            {/* Duty Shift Indicator */}
            {pharmacy.dutyInfo?.isOnDutyTonight && (
              <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                🌙 ON DUTY TONIGHT
              </span>
            )}
          </div>

          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
            {pharmacy.name}
          </h3>
        </div>

        {/* Save/Bookmark Button */}
        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className={`p-2 rounded-xl transition ${
              isSaved
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isSaved ? t.btnSaved : t.btnSave}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600 dark:fill-emerald-400' : ''}`} />
          </button>
        )}
      </div>

      {/* Subtext / Hours / Status Details */}
      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>{subtext}</span>
      </p>

      {/* Location Address & Distance Info */}
      <div className="flex flex-col gap-1 py-1 border-y border-slate-100 dark:border-slate-800/80">
        
        <div className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <span className="line-clamp-1">{pharmacy.address}, {pharmacy.city}</span>
        </div>

        {/* Distance & ETA */}
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
          <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
            📍 {formatDistance(pharmacy.distanceMeters)}
          </span>
          {pharmacy.drivingTimeMin && (
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">
              {formatETA(pharmacy.drivingTimeMin, pharmacy.walkingTimeMin)}
            </span>
          )}
        </div>
      </div>

      {/* Verification Freshness & Source Transparency */}
      <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>{pharmacy.source || 'Verified Syndicate Rota'}</span>
        </div>
        <span>{pharmacy.verifiedAt ? `${t.lastVerifiedLabel}: ${pharmacy.verifiedAt}` : 'Verified today'}</span>
      </div>

      {/* Duty Instructions Note if Available */}
      {pharmacy.dutyInfo?.dutyNote && (
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
          <span className="font-bold text-emerald-600 dark:text-emerald-400">{t.dutyNoteTitle} </span>
          {pharmacy.dutyInfo.dutyNote}
        </div>
      )}

      {/* Primary Action Buttons */}
      <div className="flex items-center gap-2 pt-1">
        
        {/* GET DIRECTIONS CTA */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition active:scale-95"
        >
          <Navigation className="w-3.5 h-3.5 fill-white" />
          <span>{t.btnGetDirections}</span>
        </a>

        {/* CALL CTA */}
        {pharmacy.phone ? (
          <a
            href={`tel:${pharmacy.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-xs font-bold transition active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.btnCall}</span>
          </a>
        ) : (
          <span className="flex-1 flex items-center justify-center py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 text-slate-400 text-xs font-medium border border-slate-200 dark:border-slate-800">
            No Phone Listed
          </span>
        )}

        {/* SHARE CTA */}
        <button
          onClick={handleShare}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
          title={t.btnShare}
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>

      </div>

    </div>
  );
};
