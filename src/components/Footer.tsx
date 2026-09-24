import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import type { Language } from '../i18n/translations';

interface FooterProps {
  onTabChange: (tab: 'find' | 'duty' | 'cities' | 'how') => void;
  onCityClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange, onCityClick }) => {
  const { t, language, setLanguage } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-base">
                ✚
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                PHARMA<span className="text-emerald-400 ms-1">NOW</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.footerDesc}
            </p>

            {/* Privacy Notice */}
            <div className="mt-2 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
              <span className="font-bold text-white flex items-center gap-1 mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {t.privacyNotice}
              </span>
              <span>{t.privacyText}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 flex flex-col gap-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-2">
              {t.footerLinksTitle}
            </h4>

            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li>
                <button onClick={() => onTabChange('find')} className="hover:text-emerald-400 transition">
                  {t.navFindPharmacy}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('duty')} className="hover:text-emerald-400 transition">
                  {t.navOnDuty}
                </button>
              </li>
              <li>
                <button onClick={onCityClick} className="hover:text-emerald-400 transition">
                  {t.navCities}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('how')} className="hover:text-emerald-400 transition">
                  {t.navHowItWorks}
                </button>
              </li>
            </ul>
          </div>

          {/* Language Selector in Footer */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-1">
              Language / اللغة
            </h4>

            <div className="flex items-center gap-2">
              {(['EN', 'FR', 'AR'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    language === lang
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {lang === 'EN' ? 'English' : lang === 'FR' ? 'Français' : 'العربية'}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <span>{t.copyright}</span>
          <span className="flex items-center gap-1 text-[11px]">
            Designed for urgent care & medical discovery
          </span>
        </div>

      </div>
    </footer>
  );
};
