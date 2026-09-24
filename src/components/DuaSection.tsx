import React from 'react';
import { HeartHandshake } from 'lucide-react';

export const DuaSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 my-8">
      <div className="rounded-3xl bg-emerald-900/10 dark:bg-emerald-950/40 border border-emerald-500/20 p-6 text-center relative overflow-hidden shadow-sm">
        
        <div className="flex items-center justify-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest">
          <HeartHandshake className="w-4 h-4" />
          <span>دعاء الشفاء • Supplication for Healing</span>
        </div>

        {/* Traditional Authentic Dua Text */}
        <p className="font-serif text-lg sm:text-xl md:text-2xl text-slate-800 dark:text-slate-100 font-bold leading-relaxed mb-3 dir-rtl">
          "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، وَاشْفِ أَنْتَ الشَّافِي، لا شِفَاءَ إِلا شِفَاؤُكَ، شِفَاءً لا يُغَادِرُ سَقَمًا."
        </p>

        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto italic">
          "O Allah, Lord of mankind, remove the hardship and grant healing. You are the Healer; there is no healing except Yours — a healing that leaves no illness behind."
        </p>

        <div className="mt-4 pt-3 border-t border-emerald-500/10 text-[11px] text-slate-400">
          Note: This supplication offers spiritual comfort alongside medical diagnosis and professional pharmacy care.
        </div>

      </div>
    </div>
  );
};
