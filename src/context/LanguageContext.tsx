import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, type Language, type Translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'pharma_now_language_preference';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && (saved === 'EN' || saved === 'FR' || saved === 'AR')) {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'EN';
  });

  const isRTL = language === 'AR';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.warn('Failed to persist language setting:', e);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isRTL) {
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'ar');
      root.classList.add('rtl');
    } else {
      root.setAttribute('dir', 'ltr');
      root.setAttribute('lang', language.toLowerCase());
      root.classList.remove('rtl');
    }
  }, [language, isRTL]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: TRANSLATIONS[language] || TRANSLATIONS.EN,
    isRTL
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
