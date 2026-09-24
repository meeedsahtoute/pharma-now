import React, { useState } from 'react';
import { 
  HEALTH_ARTICLES, 
  type HealthArticle 
} from '../data/healthData';
import { useTranslation } from '../context/LanguageContext';
import { 
  BookOpen, 
  Search, 
  AlertTriangle, 
  Stethoscope, 
  Pill, 
  MapPin, 
  X,
  ChevronRight,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Bandage
} from 'lucide-react';

interface HealthGuideViewProps {
  onFindPharmacyForTopic?: (topic: string) => void;
  selectedArticleFromHome?: HealthArticle | null;
  onClearSelectedArticle?: () => void;
}

export const HealthGuideView: React.FC<HealthGuideViewProps> = ({
  onFindPharmacyForTopic,
  selectedArticleFromHome,
  onClearSelectedArticle
}) => {
  const { t, language } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<HealthArticle | null>(selectedArticleFromHome || null);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'Thermometer':
        return <Thermometer className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Bandage':
      default:
        return <Bandage className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const filteredArticles = HEALTH_ARTICLES.filter((art) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const title = (art.title[language] || art.title.FR).toLowerCase();
    const summary = (art.summary[language] || art.summary.FR).toLowerCase();
    return title.includes(q) || summary.includes(q) || art.category.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl mb-8 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Public Health Guide • Morocco</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            Morocco Health Knowledge Base
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Educational health information, symptoms, pharmacist guidance, and emergency indicators referenced against Moroccan Ministry of Health guidelines.
          </p>

          {/* Search Input */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search health condition (e.g., Diabète, Hypertension, Grippe, Asthme)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Elegant Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 text-xs font-semibold mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-slate-900 dark:text-white mb-0.5">Medical Information Disclaimer</span>
          <span>{t.privacyText || 'PHARMA NOW provides general health information for educational purposes. It does not replace diagnosis, medical advice or emergency care from a qualified healthcare professional.'}</span>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const title = article.title[language] || article.title.FR;
          const summary = article.summary[language] || article.summary.FR;

          return (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                    {renderIcon(article.iconName)}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                    {article.category}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                  {title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Explore Guide</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Article Modal View */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 inline-block">
                  {activeArticle.category}
                </span>
                <h2 className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  {activeArticle.title[language] || activeArticle.title.FR}
                </h2>
              </div>
              <button
                onClick={() => {
                  setActiveArticle(null);
                  if (onClearSelectedArticle) onClearSelectedArticle();
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto flex-1 py-4 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pr-2">
              
              {/* Morocco Public Health Note if present */}
              {activeArticle.moroccoContextNote && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-xs">
                  <span className="font-bold block mb-1">🇲🇦 Morocco Public Health Context</span>
                  <span>{activeArticle.moroccoContextNote[language] || activeArticle.moroccoContextNote.FR}</span>
                </div>
              )}

              {/* What is it? */}
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5">
                  What is it?
                </h4>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                  {activeArticle.whatIsIt[language] || activeArticle.whatIsIt.FR}
                </p>
              </div>

              {/* Symptoms */}
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2">
                  Common Symptoms
                </h4>
                <ul className="space-y-1.5">
                  {(activeArticle.symptoms[language] || activeArticle.symptoms.FR).map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Causes */}
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2">
                  Causes & Risk Factors
                </h4>
                <ul className="space-y-1.5">
                  {(activeArticle.causes[language] || activeArticle.causes.FR).map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* When Pharmacist May Help */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1.5">
                  <Pill className="w-4 h-4" />
                  <span>When a Pharmacist May Help</span>
                </h4>
                <p className="text-xs leading-relaxed">
                  {activeArticle.pharmacistRole[language] || activeArticle.pharmacistRole.FR}
                </p>
              </div>

              {/* When Doctor Is Needed */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5 flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4" />
                  <span>When a Physician Is Needed</span>
                </h4>
                <p className="text-xs leading-relaxed">
                  {activeArticle.doctorRole[language] || activeArticle.doctorRole.FR}
                </p>
              </div>

              {/* Emergency Warning Signs */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-900 dark:text-rose-300">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Emergency Warning Signs</span>
                </h4>
                <ul className="space-y-1">
                  {(activeArticle.emergencySigns[language] || activeArticle.emergencySigns.FR).map((e, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Source Attribution */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Source: {activeArticle.source}</span>
                <span>Reviewed: {activeArticle.lastReviewed}</span>
              </div>

            </div>

            {/* Contextual CTA connecting Health Guide to Core Pharmacy Finder */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Need advice or medicine? Find an open pharmacy near you.
              </span>
              <button
                onClick={() => {
                  const topicName = activeArticle.title[language] || activeArticle.title.FR;
                  setActiveArticle(null);
                  if (onClearSelectedArticle) onClearSelectedArticle();
                  if (onFindPharmacyForTopic) onFindPharmacyForTopic(topicName);
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition active:scale-95 flex items-center gap-1.5 shrink-0"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Find Pharmacy</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
