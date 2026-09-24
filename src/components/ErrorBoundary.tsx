import { Component, type ReactNode, type ErrorInfo } from 'react';
import { clearAppCacheAndReload } from '../services/pwaService';
import { AlertTriangle, RefreshCw, Trash2, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[PHARMA NOW ErrorBoundary] Uncaught runtime error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleClearCache = async () => {
    await clearAppCacheAndReload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-center space-y-6">
            
            {/* Header / Logo */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                ✚
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                PHARMA<span className="text-emerald-400">NOW</span>
              </span>
            </div>

            {/* Error Badge */}
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            {/* Title & Description */}
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white mb-2">
                Something went wrong
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                PHARMA NOW encountered an unexpected error during rendering. This could be due to a stale cached version or a temporary system issue.
              </p>
            </div>

            {/* Technical Error Details */}
            {this.state.error && (
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left overflow-x-auto text-[11px] font-mono text-rose-300 max-h-32">
                <div className="font-bold text-slate-500 mb-1 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>Error Summary:</span>
                </div>
                <div>{this.state.error.toString()}</div>
              </div>
            )}

            {/* Action CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Application</span>
              </button>

              <button
                onClick={this.handleClearCache}
                className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition flex items-center justify-center gap-2 active:scale-95"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>Clear Cached App & Reset Service Worker</span>
              </button>
            </div>

            <p className="text-[10px] text-slate-500">
              Clearing cached app data removes stale files and re-fetches the latest verified production release.
            </p>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
