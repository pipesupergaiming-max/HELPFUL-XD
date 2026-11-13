import React, { useState } from 'react';
import { Download, Smartphone, WifiOff, X } from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';
import { useLanguage } from '../i18n/LanguageContext';

export const PWAInstallButton: React.FC<{ variant?: 'primary' | 'subtle' }> = ({
  variant = 'primary',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const { t } = useLanguage();

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={
          variant === 'primary'
            ? 'inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer'
            : 'inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer'
        }
      >
        <Download className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
        <span>{t.pwa.installApp}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={
            variant === 'primary'
              ? 'inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer'
              : 'inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer'
          }
        >
          <Smartphone className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
          <span>{t.pwa.installIOS}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
            <div className="w-full max-w-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {t.pwa.iosModalTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label={t.pwa.closeAria}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ol className="text-sm text-slate-600 dark:text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                <li>
                  {t.pwa.iosStep1Pre} <strong>{t.pwa.iosStep1Bold}</strong>{' '}
                  {t.pwa.iosStep1Post}
                </li>
                <li>
                  {t.pwa.iosStep2Pre}{' '}
                  <strong>{t.pwa.iosStep2Bold}</strong>.
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-lg bg-slate-900 dark:bg-[#2563EB] py-2 text-sm font-medium text-white hover:bg-slate-800 dark:hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              >
                {t.pwa.iosUnderstood}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const { t } = useLanguage();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-medium text-white border border-amber-700"
    >
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>{t.pwa.offlineBadge}</span>
    </div>
  );
};
