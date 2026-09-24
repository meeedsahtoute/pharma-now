import React from 'react';
import { WifiOff, Database } from 'lucide-react';

interface OfflineBannerProps {
  isOffline: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOffline }) => {
  if (!isOffline) return null;

  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 shadow-md">
      <WifiOff className="w-4 h-4 animate-bounce shrink-0" />
      <span>Offline Mode Active — Browsing cached verified pharmacy database for 100% emergency continuity.</span>
      <Database className="w-4 h-4 shrink-0 opacity-80" />
    </div>
  );
};
