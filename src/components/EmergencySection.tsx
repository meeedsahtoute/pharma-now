import React from 'react';
import { Phone, Ambulance, Shield, Flame, BadgeAlert } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { getEmergencyContactsForCountry, type EmergencyContact } from '../services/emergencyService';

interface EmergencySectionProps {
  countryCode?: string;
}

export const EmergencySection: React.FC<EmergencySectionProps> = ({
  countryCode = 'MA'
}) => {
  const { t } = useTranslation();
  const countryData = getEmergencyContactsForCountry(countryCode);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ambulance':
        return <Ambulance className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'BadgeAlert':
      default:
        return <BadgeAlert className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="rounded-3xl bg-slate-900 dark:bg-slate-950 text-white p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        
        {/* Subtle decorative glow accent */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <h2 className="font-extrabold text-xl sm:text-2xl text-white">
                {t.emergencyTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.emergencySubtitle} ({countryData.countryName})
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
            24/7 HOTLINES
          </div>
        </div>

        {/* Country-Aware Emergency Call Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {countryData.contacts.map((contact: EmergencyContact) => {
            const title = t[contact.nameKey] || contact.nameKey;
            const subtitle = t[contact.subKey] || contact.subKey;

            return (
              <a
                key={contact.id}
                href={`tel:${contact.number}`}
                className="group p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-rose-500/50 transition flex items-center justify-between gap-3 active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 group-hover:scale-105 transition-transform">
                    {renderIcon(contact.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-rose-400 transition-colors">
                      {title}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-rose-400 font-extrabold text-lg group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4 fill-rose-400" />
                  <span>{contact.number}</span>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </div>
  );
};
