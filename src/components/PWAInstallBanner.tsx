import React, { useState } from 'react';
import { Download, X } from 'lucide-react';

interface PWAInstallBannerProps {
  canInstall: boolean;
  onInstall: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({
  canInstall,
  onInstall
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (!canInstall || dismissed) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-40 bg-gradient-to-r from-slate-900 to-emerald-950 border border-emerald-500/40 p-4 rounded-2xl shadow-2xl backdrop-blur-md animate-bounce-short">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-emerald-500/30">
            ✚
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white">Install PHARMA NOW</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-tight">
              Get instant 1-tap offline emergency pharmacy access on your home screen.
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          onClick={onInstall}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition"
        >
          <Download className="w-4 h-4" />
          <span>Install App Now</span>
        </button>
      </div>
    </div>
  );
};
