import React, { useState } from 'react';
import { X, Phone, Navigation, Moon, Copy, Check, Clock, MapPin, ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';
import type { Pharmacy } from '../types/pharmacy';
import { formatDistance } from '../utils/timeUtils';

interface PharmacyDetailModalProps {
  pharmacy: Pharmacy | null;
  onClose: () => void;
}

export const PharmacyDetailModal: React.FC<PharmacyDetailModalProps> = ({
  pharmacy,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!pharmacy) return null;

  const statusInfo = pharmacy.calculatedStatus;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${pharmacy.name}\n${pharmacy.address}, ${pharmacy.city}\nTél: ${pharmacy.phone || 'Non renseigné'}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const days: Array<{ key: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'; label: string }> = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.lat},${pharmacy.lng}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${pharmacy.lat},${pharmacy.lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${pharmacy.lat},${pharmacy.lng}&navigate=yes`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                statusInfo?.badgeColor === 'amber' ? 'bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-500/40' :
                statusInfo?.badgeColor === 'emerald' ? 'bg-emerald-400/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40' :
                statusInfo?.badgeColor === 'rose' ? 'bg-rose-400/20 text-rose-700 dark:text-rose-300 border border-rose-500/40' :
                'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}>
                {statusInfo?.status === 'on_duty' && <Moon className="w-3.5 h-3.5 text-amber-500 animate-pulse" />}
                {statusInfo?.statusLabel}
              </span>

              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                {formatDistance(pharmacy.distanceMeters)}
              </span>
            </div>

            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">{pharmacy.name}</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{pharmacy.address}{pharmacy.neighborhood ? `, ${pharmacy.neighborhood}` : ''}, {pharmacy.city}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Night Duty Instructions */}
          {pharmacy.dutyInfo.dutyNote && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-300 text-sm mb-1">
                <Moon className="w-4 h-4 text-amber-500" />
                <span>Night Bell & Emergency Access</span>
              </div>
              <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed">{pharmacy.dutyInfo.dutyNote}</p>
            </div>
          )}

          {/* Opening Hours Schedule Table */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Weekly Opening Hours</span>
            </h3>

            {pharmacy.openingHours?.isConflicting ? (
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-800 dark:text-yellow-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0" />
                <span>Conflicting or holiday schedule reported. Please call before visiting.</span>
              </div>
            ) : !pharmacy.openingHours || pharmacy.openingHours.hasMissingHours ? (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Opening hours schedule not officially verified for this location.</span>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-200 dark:divide-slate-800/60">
                {days.map(({ key, label }) => {
                  const schedule = pharmacy.openingHours?.[key];
                  return (
                    <div key={key} className="flex items-center justify-between py-2.5 px-4 text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{label}</span>
                      {schedule && !schedule.isClosed ? (
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                          {schedule.open} - {schedule.close}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Closed</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Route Apps Picker */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Open Directions In</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition"
              >
                <span>Waze</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition"
              >
                <span>Apple Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Duty Schedule Verified Today</span>
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Info'}</span>
            </button>
          </div>

        </div>

        {/* Modal Sticky Bottom Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          {pharmacy.phone ? (
            <a
              href={`tel:${pharmacy.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/20 active:scale-95 transition"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call Pharmacy ({pharmacy.phone})</span>
            </a>
          ) : (
            <button
              disabled
              className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold text-xs border border-slate-200 dark:border-slate-700 cursor-not-allowed"
            >
              No Phone Line Available
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
