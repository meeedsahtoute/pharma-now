import React from 'react';
import { BookOpen, Activity, Heart, Thermometer, Wind, Bandage, ChevronRight } from 'lucide-react';
import { HEALTH_ARTICLES, type HealthArticle } from '../data/healthData';
import { useTranslation } from '../context/LanguageContext';

interface HealthTodaySectionProps {
  onOpenArticle: (article: HealthArticle) => void;
  onOpenFullGuide: () => void;
}

export const HealthTodaySection: React.FC<HealthTodaySectionProps> = ({
  onOpenArticle,
  onOpenFullGuide
}) => {
  const { language } = useTranslation();

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
              Health Guide & Educational Insights
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Learn about common health conditions and when to consult a pharmacist or physician in Morocco.
          </p>
        </div>

        <button
          onClick={onOpenFullGuide}
          className="hidden sm:flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <span>View All Articles</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {HEALTH_ARTICLES.slice(0, 5).map((article) => {
          const title = article.title[language] || article.title.FR;
          const summary = article.summary[language] || article.summary.FR;

          return (
            <div
              key={article.id}
              onClick={() => onOpenArticle(article)}
              className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between gap-3"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 w-fit mb-3 group-hover:scale-110 transition-transform">
                  {renderIcon(article.iconName)}
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 mb-1">
                  {title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {summary}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <span>Read Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
