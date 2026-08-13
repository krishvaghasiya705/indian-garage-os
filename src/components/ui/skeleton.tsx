import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse animate-shimmer rounded-lg bg-white/10 border border-white/10 backdrop-blur-md shadow-inner",
        className
      )}
      {...props}
    />
  );
}

function TextSkeleton({
  lines = 1,
  className,
  lineClassName,
}: {
  lines?: number;
  className?: string;
  lineClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2 min-w-0 flex-1", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-3.5 rounded-full bg-white/15",
            i === lines - 1 && lines > 1 ? "w-3/4" : "w-full",
            lineClassName
          )}
        />
      ))}
    </div>
  );
}

function ButtonSkeleton({
  className,
  variant = "pill",
}: {
  className?: string;
  variant?: "pill" | "square" | "circle";
}) {
  return (
    <Skeleton
      className={cn(
        variant === "pill"
          ? "h-8 w-24 rounded-full"
          : variant === "circle"
          ? "size-9 rounded-full"
          : "h-9 w-20 rounded-xl",
        "bg-white/15 border-white/15",
        className
      )}
    />
  );
}

function ImageSkeleton({
  className,
  aspectRatio = "aspect-square",
}: {
  className?: string;
  aspectRatio?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", aspectRatio, className)}>
      <Skeleton className="size-full rounded-2xl bg-white/10" />
      <div className="absolute inset-0 flex items-center justify-center text-white/20">
        <svg className="size-8 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </div>
    </div>
  );
}

function VinylSkeleton({ size = 64 }: { size?: number }) {
  return (
    <div
      className="relative shrink-0 rounded-full border border-white/20 bg-black/40 p-1 backdrop-blur-md"
      style={{ width: size, height: size }}
    >
      <Skeleton className="size-full rounded-full bg-white/10 border-white/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-4 rounded-full bg-black/80 ring-2 ring-white/20" />
      </div>
    </div>
  );
}

function TrackItemSkeleton() {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-black/20 p-2.5 backdrop-blur-md">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Skeleton className="size-7 rounded-lg bg-white/15 shrink-0" />
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <Skeleton className="h-3.5 w-3/5 rounded-full bg-white/20" />
          <Skeleton className="h-2.5 w-2/5 rounded-full bg-white/10" />
        </div>
      </div>
      <Skeleton className="h-3 w-10 rounded-full bg-white/15 shrink-0" />
    </div>
  );
}

function PlayerSkeleton() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3.5 animate-fade-in-up">
      {/* Playlist tabs skeleton */}
      <div className="flex items-center justify-center gap-2">
        <ButtonSkeleton variant="pill" className="w-28 h-7" />
        <ButtonSkeleton variant="pill" className="w-32 h-7" />
        <ButtonSkeleton variant="pill" className="w-28 h-7" />
      </div>

      {/* Songlist box skeleton */}
      <div className="flex flex-col gap-2.5 rounded-[26px] border border-white/10 bg-white/[0.08] p-4 backdrop-blur-3xl shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <Skeleton className="size-6 rounded-lg bg-accent-radio/20 border border-accent-radio/30" />
            <Skeleton className="h-3 w-24 rounded-full bg-white/25" />
          </div>
          <Skeleton className="h-4 w-16 rounded-full bg-white/15" />
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <TrackItemSkeleton />
          <TrackItemSkeleton />
          <TrackItemSkeleton />
          <TrackItemSkeleton />
        </div>
      </div>

      {/* Player pill skeleton */}
      <div className="flex w-full items-center gap-4 rounded-[26px] sm:rounded-full border border-white/10 bg-white/[0.08] p-4 backdrop-blur-3xl shadow-2xl">
        <VinylSkeleton size={64} />
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <Skeleton className="h-4 w-4/5 rounded-full bg-white/25" />
          <Skeleton className="h-3 w-1/2 rounded-full bg-white/15" />
          <Skeleton className="h-1.5 w-full rounded-full bg-white/15 mt-1" />
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <ButtonSkeleton variant="circle" className="size-8" />
          <ButtonSkeleton variant="circle" className="size-11 bg-accent-radio/30 border-accent-radio/40" />
          <ButtonSkeleton variant="circle" className="size-8" />
        </div>
      </div>
    </div>
  );
}

export {
  Skeleton,
  TextSkeleton,
  ButtonSkeleton,
  ImageSkeleton,
  VinylSkeleton,
  TrackItemSkeleton,
  PlayerSkeleton,
};
