import { useEffect, useState } from "react";

interface SiteLoaderProps {
  isLoading: boolean;
  onFinish?: () => void;
}

export function SiteLoader({ isLoading, onFinish }: SiteLoaderProps) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [freq, setFreq] = useState(88.0);
  const [progress, setProgress] = useState(0);

  // Frequency tuner counter animation
  useEffect(() => {
    const timer = setInterval(() => {
      setFreq((prev) => {
        if (prev >= 93.5) return 93.5;
        return Number((prev + 0.3).toFixed(1));
      });
      setProgress((prev) => Math.min(100, prev + 6));
    }, 80);

    return () => clearInterval(timer);
  }, []);

  // Handle exit transition when loading becomes false
  useEffect(() => {
    if (!isLoading && visible && !exiting) {
      setExiting(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        onFinish?.();
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, visible, exiting, onFinish]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl transition-all duration-700 ease-out ${
        exiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-40" />

      {/* Main retro loader box */}
      <div className="relative flex w-11/12 max-w-md flex-col items-center justify-center rounded-[32px] border border-white/15 bg-gradient-to-b from-white/[0.12] to-white/[0.03] p-8 text-center backdrop-blur-3xl shadow-[0_24px_80px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.25)] animate-scale-in">
        {/* Logo / Badge */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute -inset-4 rounded-full bg-accent-radio/20 blur-xl animate-pulse-glow" />
          <img
            src="/bg/logo.png"
            alt="Indian Garage Logo"
            className="relative h-20 w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Cassette Tape Spools Animation */}
        <div className="mb-6 flex items-center gap-6 rounded-2xl border border-white/10 bg-black/40 px-6 py-3.5 backdrop-blur-md shadow-inner">
          <div className="relative size-10 shrink-0 rounded-full border-2 border-white/20 bg-zinc-900 p-1">
            <div className="size-full rounded-full border-2 border-dashed border-accent-radio animate-spin [animation-duration:3s]" />
            <div className="absolute inset-0 m-auto size-3 rounded-full bg-black ring-1 ring-white/30" />
          </div>

          <div className="flex flex-col items-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-radio font-semibold">
              {freq >= 93.5 ? "93.5 FM" : `${freq.toFixed(1)} MHz`}
            </span>
            <div className="mt-1 flex items-center gap-1">
              <span className="size-1 rounded-full bg-accent-radio animate-ping" />
              <span className="font-mono text-[9.5px] uppercase tracking-widest text-white/60">
                TUNING RADIO
              </span>
            </div>
          </div>

          <div className="relative size-10 shrink-0 rounded-full border-2 border-white/20 bg-zinc-900 p-1">
            <div className="size-full rounded-full border-2 border-dashed border-accent-radio animate-spin [animation-duration:3s]" />
            <div className="absolute inset-0 m-auto size-3 rounded-full bg-black ring-1 ring-white/30" />
          </div>
        </div>

        {/* Radio Dial Sweep Gauge */}
        <div className="relative h-2.5 w-full overflow-hidden rounded-full border border-white/10 bg-black/50 p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 shadow-[0_0_12px_var(--accent)] transition-all duration-150 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
          <div className="animate-radio-dial absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        {/* Text readout */}
        <div className="mt-4 flex flex-col items-center gap-1">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-white/90">
            Indian Garage OS — 90s Radio
          </h2>
          <p className="text-[11px] text-white/50 font-mono tracking-wider italic">
            Chai, dhool aur 90s ke gaane...
          </p>
        </div>
      </div>
    </div>
  );
}
