import { useCallback, useEffect, useRef, useState } from "react";
import { PLAYLISTS, formatTime, type Playlist, type Track } from "@/lib/radio-data";

/* ────────────────────────────  analytics  ──────────────────────────── */

function track(event: string, data: Record<string, unknown>) {
  const w = window as unknown as { va?: (...a: unknown[]) => void };
  if (typeof w.va === "function") w.va("event", { name: event, ...data });
  else console.info("[analytics]", event, data);
}

/* ────────────────────────────  YT typings  ─────────────────────────── */

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (s: number, allow: boolean) => void;
  loadVideoById: (id: string) => void;
  cueVideoById: (id: string) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<void>((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiPromise;
}

/* ────────────────────  module-scope sub-components  ────────────────── */

const GLASS =
  "border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] backdrop-blur-3xl backdrop-saturate-[1.7] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)]";

function Vinyl({ size, playing }: { size: number; playing: boolean }) {
  return (
    <div
      className="relative shrink-0 self-start overflow-hidden rounded-full ring-1 ring-white/15"
      style={{ width: size, height: size }}
    >
      <img
        src="/bg/vinyl.png"
        alt=""
        width={size}
        height={size}
        className="vinyl-spin size-full object-cover"
        style={{ animationPlayState: playing ? "running" : "paused" }}
      />
      <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40" />
    </div>
  );
}

function SeekBar({
  progress,
  onSeek,
}: {
  progress: number;
  onSeek: (ratio: number) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const emit = useCallback(
    (clientX: number) => {
      const el = railRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      onSeek(Math.min(1, Math.max(0, (clientX - r.left) / r.width)));
    },
    [onSeek],
  );

  useEffect(() => {
    const move = (e: PointerEvent) => draggingRef.current && emit(e.clientX);
    const up = () => (draggingRef.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [emit]);

  return (
    <div
      ref={railRef}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      tabIndex={0}
      onPointerDown={(e) => {
        draggingRef.current = true;
        emit(e.clientX);
      }}
      className="group relative flex h-6 w-full cursor-pointer touch-none items-center"
    >
      <div className="h-[3px] w-full rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-accent-radio shadow-[0_0_10px_var(--accent)]"
          style={{ width: `${Math.min(100, progress * 100)}%` }}
        />
      </div>
      <span
        className="absolute size-2.5 -translate-x-1/2 rounded-full bg-accent-radio opacity-0 shadow-[0_0_10px_var(--accent)] transition-opacity group-hover:opacity-100"
        style={{ left: `${Math.min(100, progress * 100)}%` }}
      />
    </div>
  );
}

function IconPrev() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M7 6h2v12H7zM19 6v12l-9-6z" />
    </svg>
  );
}
function IconNext() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M15 6h2v12h-2zM5 6l9 6-9 6z" />
    </svg>
  );
}
function IconPlay({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
      <path d="M7 4.5 19.5 12 7 19.5z" />
    </svg>
  );
}
function IconPause({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
      <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
    </svg>
  );
}

function Transport({
  playing,
  size,
  onPrev,
  onNext,
  onToggle,
}: {
  playing: boolean;
  size: number;
  onPrev: () => void;
  onNext: () => void;
  onToggle: () => void;
}) {
  const side =
    "flex items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white";
  return (
    <div className="flex items-center gap-1">
      <button type="button" aria-label="Previous track" onClick={onPrev} className={side} style={{ width: size, height: size }}>
        <IconPrev />
      </button>
      <button
        type="button"
        aria-label={playing ? "Pause" : "Play"}
        onClick={onToggle}
        className="flex items-center justify-center rounded-full bg-gradient-to-b from-accent-radio to-accent-radio-strong text-black ring-1 ring-white/25 shadow-[0_8px_24px_-6px_var(--accent)] transition active:scale-95"
        style={{ width: size >= 44 ? 52 : 40, height: size >= 44 ? 52 : 40 }}
      >
        {playing ? <IconPause /> : <IconPlay />}
      </button>
      <button type="button" aria-label="Next track" onClick={onNext} className={side} style={{ width: size, height: size }}>
        <IconNext />
      </button>
    </div>
  );
}

function PlaylistTabs({
  playlists,
  activeId,
  onSelect,
}: {
  playlists: Playlist[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {playlists.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSelect(p.id)}
          className={`rounded-full border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] backdrop-blur-md transition ${
            p.id === activeId
              ? "border-accent-radio/60 bg-accent-radio/20 text-white"
              : "border-white/10 bg-black/25 text-white/55 hover:text-white"
          }`}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}

function MarqueeText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const check = () => {
      setIsOverflowing(el.scrollWidth > el.clientWidth + 2);
    };

    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden whitespace-nowrap ${
        isOverflowing
          ? "[mask-image:linear-gradient(to_right,transparent,black_4px,black_calc(100%-8px),transparent)]"
          : ""
      } ${className || ""}`}
      style={style}
    >
      <div
        className={`inline-flex min-w-full ${
          isOverflowing ? "animate-marquee hover:[animation-play-state:paused]" : ""
        }`}
      >
        <span className={`shrink-0 ${isOverflowing ? "pr-8" : "truncate"}`}>{text}</span>
        {isOverflowing && (
          <span className="shrink-0 pr-8" aria-hidden="true">
            {text}
          </span>
        )}
      </div>
    </div>
  );
}

function Meta({
  track: t,
  size,
  playing,
}: {
  track: Track;
  size: "sm" | "md";
  playing?: boolean;
}) {
  const subtext = `${t.artist} · ${t.film} (${t.year})`;

  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <div className="flex items-center gap-2 min-w-0">
        <MarqueeText
          text={t.title}
          className="font-semibold text-white min-w-0 flex-1"
          style={{ fontSize: size === "md" ? 15 : 14 }}
        />
        {playing && <EqualizerVisualizer playing={true} />}
      </div>
      <MarqueeText
        text={subtext}
        className="text-white/70 min-w-0"
        style={{ fontSize: 12.5 }}
      />
    </div>
  );
}

function EqualizerVisualizer({ playing }: { playing: boolean }) {
  return (
    <div className="flex h-3.5 items-end justify-center gap-[2px] w-4 shrink-0">
      <span
        className={`w-[2.5px] h-full rounded-full bg-accent-radio transition-all duration-300 ${
          playing ? "animate-wave-1" : "scale-y-[0.3] origin-bottom opacity-60"
        }`}
      />
      <span
        className={`w-[2.5px] h-full rounded-full bg-accent-radio transition-all duration-300 ${
          playing ? "animate-wave-2" : "scale-y-[0.7] origin-bottom opacity-60"
        }`}
      />
      <span
        className={`w-[2.5px] h-full rounded-full bg-accent-radio transition-all duration-300 ${
          playing ? "animate-wave-3" : "scale-y-[0.4] origin-bottom opacity-60"
        }`}
      />
      <span
        className={`w-[2.5px] h-full rounded-full bg-accent-radio transition-all duration-300 ${
          playing ? "animate-wave-4" : "scale-y-[0.55] origin-bottom opacity-60"
        }`}
      />
    </div>
  );
}

function TimeStamp({ current, duration }: { current: number; duration: number }) {
  return (
    <div className="shrink-0 font-mono text-[10.5px] tabular-nums text-white/60">
      {formatTime(current)} / {formatTime(duration)}
    </div>
  );
}

function SongList({
  tracks,
  currentIndex,
  isPlaying,
  onSelectTrack,
  playlistTagline,
}: {
  tracks: Track[];
  currentIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
  playlistTagline?: string;
}) {
  return (
    <div className={`w-full flex flex-col gap-2.5 rounded-[26px] p-3 sm:p-4 ${GLASS}`}>
      {/* Header section */}
      <div className="flex items-center justify-between px-1.5 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-accent-radio/20 text-accent-radio ring-1 ring-accent-radio/30">
            <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-white/90">
              Tracklist
            </h3>
            {playlistTagline && (
              <p className="text-[10.5px] text-white/50 italic truncate">{playlistTagline}</p>
            )}
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-white/10 border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/70">
          {tracks.length} Tracks
        </span>
      </div>

      {/* Song list scroll area */}
      <div className="max-h-56 sm:max-h-64 overflow-y-auto pr-1 flex flex-col gap-1.5 custom-scrollbar">
        {tracks.map((t, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTrack(idx)}
              className={`group relative flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 border cursor-pointer ${
                isActive
                  ? "border-accent-radio/50 bg-gradient-to-r from-accent-radio/25 via-accent-radio/10 to-white/[0.02] text-white shadow-[0_4px_20px_-4px_rgba(251,191,36,0.25)]"
                  : "border-white/5 bg-black/20 text-white/70 hover:border-white/20 hover:bg-white/[0.08] hover:text-white hover:shadow-md hover:translate-x-0.5"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Track Number / Visualizer / Play Action */}
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs transition-all ${
                    isActive
                      ? "bg-accent-radio/20 text-accent-radio ring-1 ring-accent-radio/40"
                      : "bg-white/5 text-white/40 group-hover:bg-accent-radio group-hover:text-black group-hover:shadow-[0_0_12px_var(--accent)]"
                  }`}
                >
                  {isActive ? (
                    <EqualizerVisualizer playing={isPlaying} />
                  ) : (
                    <>
                      <span className="group-hover:hidden">{String(idx + 1).padStart(2, "0")}</span>
                      <IconPlay className="hidden size-3.5 fill-current group-hover:block" />
                    </>
                  )}
                </div>

                {/* Track Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`truncate font-medium text-xs sm:text-sm transition-colors ${
                        isActive
                          ? "text-white font-semibold"
                          : "text-white/85 group-hover:text-white"
                      }`}
                    >
                      {t.title}
                    </span>
                    {isActive && (
                      <span className="shrink-0 rounded-full bg-accent-radio/25 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-accent-radio border border-accent-radio/40">
                        {isPlaying ? "PLAYING" : "PAUSED"}
                      </span>
                    )}
                  </div>
                  <div className="truncate text-[11px] text-white/50 group-hover:text-white/75 transition-colors">
                    {t.artist} · <span className="italic text-white/60">{t.film}</span> ({t.year})
                  </div>
                </div>
              </div>

              {/* Track Duration */}
              <div
                className={`shrink-0 font-mono text-[11px] tabular-nums transition-colors ${
                  isActive ? "text-accent-radio font-medium" : "text-white/45 group-hover:text-white/80"
                }`}
              >
                {formatTime(t.duration)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────  the player  ─────────────────────────── */

export function RadioPlayer() {
  const [playlistId, setPlaylistId] = useState(PLAYLISTS[0]!.id);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  const playlist: Playlist = PLAYLISTS.find((p) => p.id === playlistId) ?? PLAYLISTS[0]!;
  const trackItem: Track = playlist.tracks[index] ?? playlist.tracks[0]!;

  const playerRef = useRef<YTPlayer | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ index, playing, count: playlist.tracks.length, videoId: trackItem.videoId });
  stateRef.current = { index, playing, count: playlist.tracks.length, videoId: trackItem.videoId };

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % stateRef.current.count);
    setCurrent(0);
  }, []);
  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + stateRef.current.count) % stateRef.current.count);
    setCurrent(0);
  }, []);

  // create the player once
  useEffect(() => {
    let cancelled = false;
    loadYouTubeApi().then(() => {
      if (cancelled || !hostRef.current || playerRef.current) return;
      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId: stateRef.current.videoId,
        playerVars: { rel: 0, playsinline: 1, modestbranding: 1 },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e: { data: number }) => {
            const YT = window.YT;
            if (e.data === YT.PlayerState.PLAYING) setPlaying(true);
            if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
            if (e.data === YT.PlayerState.ENDED) goNext();
          },
          onError: (e: { data: number }) => {
            track("yt_player_error", { code: e.data, videoId: stateRef.current.videoId });
            goNext();
          },
        },
      }) as YTPlayer;
    });
    return () => {
      cancelled = true;
    };
  }, [goNext]);

  // load the selected track
  const firstLoad = useRef(true);
  useEffect(() => {
    const p = playerRef.current;
    if (!p || !ready) return;
    setCurrent(0);
    if (firstLoad.current) {
      firstLoad.current = false;
      p.cueVideoById(trackItem.videoId);
    } else {
      p.loadVideoById(trackItem.videoId);
    }
  }, [trackItem.videoId, ready]);

  // progress ticker
  useEffect(() => {
    const t = setInterval(() => {
      const p = playerRef.current;
      if (!p || typeof p.getCurrentTime !== "function") return;
      setCurrent(p.getCurrentTime() || 0);
      const d = p.getDuration() || 0;
      if (d) setDuration(d);
    }, 400);
    return () => clearInterval(t);
  }, []);

  const total = duration || trackItem.duration;
  const progress = total ? Math.min(1, current / total) : 0;

  const toggle = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (stateRef.current.playing) p.pauseVideo();
    else p.playVideo();
  }, []);

  const seek = useCallback(
    (ratio: number) => {
      const p = playerRef.current;
      const d = duration || trackItem.duration;
      if (!p || !d) return;
      p.seekTo(ratio * d, true);
      setCurrent(ratio * d);
    },
    [duration, trackItem.duration],
  );

  const selectPlaylist = useCallback((id: string) => {
    setPlaylistId(id);
    setIndex(0);
    setCurrent(0);
  }, []);

  const handleSelectTrack = useCallback(
    (i: number) => {
      if (i === index) {
        toggle();
      } else {
        setIndex(i);
        setCurrent(0);
      }
    },
    [index, toggle],
  );

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <PlaylistTabs playlists={PLAYLISTS} activeId={playlistId} onSelect={selectPlaylist} />

      {/* visible YouTube player — never hidden */}
      <div className={`overflow-hidden rounded-[22px] hidden ${GLASS} p-1.5`}>
        <div className="aspect-video w-full overflow-hidden rounded-[16px] bg-black">
          <div ref={hostRef} className="size-full" />
        </div>
      </div>

      <SongList
        tracks={playlist.tracks}
        currentIndex={index}
        isPlaying={playing}
        onSelectTrack={handleSelectTrack}
        playlistTagline={playlist.tagline}
      />

      {/* DESKTOP pill */}

      <div className={`hidden w-full items-center gap-4 rounded-full p-3 pr-5 sm:flex ${GLASS}`}>
        <Vinyl size={80} playing={playing} />
        <div className="min-w-0 flex-1">
          <Meta track={trackItem} size="md" playing={playing} />
          <SeekBar progress={progress} onSeek={seek} />
        </div>
        <TimeStamp current={current} duration={total} />
        <Transport playing={playing} size={36} onPrev={goPrev} onNext={goNext} onToggle={toggle} />
      </div>

      {/* MOBILE card */}
      <div className={`flex w-full flex-col gap-3 rounded-[26px] p-4 sm:hidden ${GLASS}`}>
        <div className="flex items-center gap-3">
          <Vinyl size={64} playing={playing} />
          <Meta track={trackItem} size="sm" playing={playing} />
        </div>
        <SeekBar progress={progress} onSeek={seek} />
        <div className="flex items-center justify-between">
          <TimeStamp current={current} duration={total} />
          <Transport playing={playing} size={44} onPrev={goPrev} onNext={goNext} onToggle={toggle} />
          <div className="w-[74px]" />
        </div>
      </div>
    </div>
  );
}
