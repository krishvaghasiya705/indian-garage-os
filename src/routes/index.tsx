import { createFileRoute } from "@tanstack/react-router";
import { RadioPlayer } from "@/components/radio/player";
import { Clock, ListenerCount, SocialLinks } from "@/components/radio/top-bar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Indian Garage OS — 90s Garage Radio" },
      {
        name: "description",
        content:
          "A 90s Indian garage radio: Bollywood and Indipop classics from official label uploads, playing in a glass player over a dusty workshop at golden hour.",
      },
      { property: "og:title", content: "Indian Garage OS — 90s Garage Radio" },
      {
        property: "og:description",
        content: "Chai, dhool aur 90s ke gaane. A nostalgia radio for the roadside garage.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <div className="hero-bg fixed inset-0 -z-20 bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
      </div>
      <div className="grain-overlay pointer-events-none fixed inset-0 -z-10" />

      <div className="safe-t safe-l safe-r fixed z-10 flex items-start justify-between gap-4">
        <Clock />
        <div className="hidden sm:block">
          <ListenerCount />
        </div>
        <SocialLinks />
      </div>

      <header className="safe-t pointer-events-none mt-24 px-6 text-center sm:mt-28">
        <h1 className="font-mono text-[13px] uppercase tracking-[0.4em] text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Indian Garage OS
        </h1>
        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/45">
          90s Garage Radio · Asia/Kolkata
        </p>
      </header>

      <div className="safe-b z-10 flex w-full justify-center px-4 pb-4 pt-10">
        <RadioPlayer />
      </div>
    </main>
  );
}
