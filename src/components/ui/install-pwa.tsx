import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPwaButton({ loading = false }: { loading?: boolean }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone PWA mode
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // Check if device is iOS Safari
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    setIsIos(isIosDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setDeferredPrompt(null);
        setIsStandalone(true);
      }
    } else if (isIos) {
      setShowIosModal(true);
    } else {
      // Fallback modal for browsers where event hasn't fired yet
      setShowIosModal(true);
    }
  };

  // Don't render button if app is already installed & running in standalone mode
  if (isStandalone) {
    return null;
  }

  if (loading) {
    return (
      <div className="h-8 w-24 rounded-full bg-white/10 animate-pulse border border-white/10" />
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        title="Install Indian Garage OS as an App"
        className="group relative flex items-center gap-1.5 rounded-full border border-accent-radio/50 bg-gradient-to-r from-accent-radio/25 via-accent-radio/15 to-white/5 px-3 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_4px_16px_-4px_rgba(251,191,36,0.35)] backdrop-blur-md transition-all duration-300 hover:border-accent-radio hover:scale-105 hover:shadow-[0_0_20px_var(--accent)] active:scale-95 cursor-pointer"
      >
        <svg className="size-3.5 fill-current text-accent-radio transition-transform group-hover:-translate-y-0.5" viewBox="0 0 24 24">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
        <span>INSTALL APP</span>
      </button>

      {/* iOS / Fallback Installation Guide Modal */}
      {showIosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md animate-fade-in-up">
          <div className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-zinc-900/95 p-6 text-center shadow-2xl backdrop-blur-2xl">
            <button
              type="button"
              onClick={() => setShowIosModal(false)}
              className="absolute right-4 top-4 flex size-7 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
            >
              ✕
            </button>

            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-accent-radio/20 text-accent-radio ring-1 ring-accent-radio/40">
              <svg className="size-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
            </div>

            <h3 className="font-mono text-sm uppercase tracking-wider font-semibold text-white">
              Install Indian Garage OS
            </h3>
            <p className="mt-1 text-xs text-white/60">
              Install this 90s garage radio directly to your home screen for quick offline access!
            </p>

            <div className="mt-4 flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-black/40 p-3.5 text-left text-[11.5px] text-white/80">
              <div className="flex items-start gap-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-radio/20 text-[10px] font-mono font-bold text-accent-radio">
                  1
                </span>
                <span>
                  Tap the <strong className="text-white">Share button</strong> (square with up arrow icon at bottom of browser).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-radio/20 text-[10px] font-mono font-bold text-accent-radio">
                  2
                </span>
                <span>
                  Scroll down and tap <strong className="text-white">"Add to Home Screen"</strong>.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-radio/20 text-[10px] font-mono font-bold text-accent-radio">
                  3
                </span>
                <span>Launch Indian Garage OS anytime like a native app! 📻</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIosModal(false)}
              className="mt-5 w-full rounded-full bg-gradient-to-r from-accent-radio to-accent-radio-strong py-2.5 font-mono text-xs uppercase tracking-wider font-semibold text-black shadow-lg transition active:scale-95 cursor-pointer"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
