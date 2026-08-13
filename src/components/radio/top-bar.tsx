import { useEffect, useState } from "react";
import { Skeleton, ButtonSkeleton } from "@/components/ui/skeleton";

const fmt = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function Clock({ loading = false }: { loading?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (loading || !now) {
    return (
      <div className="flex flex-col gap-1 pointer-events-none select-none">
        <Skeleton className="h-4 w-20 rounded-full bg-white/20" />
        <Skeleton className="h-2.5 w-10 rounded-full bg-white/10" />
      </div>
    );
  }

  const parts = fmt.formatToParts(now);
  const hour = parts.find((p) => p.type === "hour")?.value ?? "--";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "--";
  const period = parts.find((p) => p.type === "dayPeriod")?.value ?? "";

  return (
    <div className="pointer-events-none select-none font-mono text-[13px] tabular-nums tracking-widest text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] animate-fade-in-up">
      <span>{hour}</span>
      <span className="animate-blink">:</span>
      <span>{minute}</span>
      <span className="ml-1 text-[10px] uppercase text-white/55">{period}</span>
      <div className="mt-0.5 text-[9px] uppercase tracking-[0.25em] text-white/40">IST</div>
    </div>
  );
}

export function ListenerCount({ loading = false }: { loading?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const base = 180 + Math.floor(Math.random() * 90);
    setCount(base);
    const t = setInterval(
      () => setCount((c) => Math.max(120, c + Math.floor(Math.random() * 9) - 4)),
      4000
    );
    return () => clearInterval(t);
  }, []);

  if (loading || count === 0) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 backdrop-blur-md">
        <Skeleton className="size-2 rounded-full bg-accent-radio/50" />
        <Skeleton className="h-3 w-24 rounded-full bg-white/20" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 backdrop-blur-md animate-fade-in-up [animation-delay:150ms]">
      <span className="size-1.5 animate-pulse rounded-full bg-accent-radio shadow-[0_0_8px_var(--accent)]" />
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/70 tabular-nums">
        {count} listening
      </span>
    </div>
  );
}

const SOCIALS: { label: string; href: string; d: string }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/krish_nexus.gg/",
    d: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Zm0 2.2a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4Zm6.6-2.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@aslizaid?si=cblS2UXzCyKVsMeg",
    d: "M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15.2V8.8l5.4 3.2-5.4 3.2Z",
  },
  {
    label: "Contact",
    href: "mailto:kvaghasiya705@gmail.com",
    d: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 8.1 8-5.1H4l8 5.1Z",
  },
];

export function SocialLinks({ loading = false }: { loading?: boolean }) {
  if (loading) {
    return (
      <div className="flex items-center gap-1.5">
        <ButtonSkeleton variant="circle" className="size-9" />
        <ButtonSkeleton variant="circle" className="size-9" />
        <ButtonSkeleton variant="circle" className="size-9" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 animate-fade-in-up [animation-delay:250ms]">
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={s.label}
          className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white/65 backdrop-blur-md transition hover:border-white/25 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
            <path d={s.d} />
          </svg>
        </a>
      ))}
    </div>
  );
}
