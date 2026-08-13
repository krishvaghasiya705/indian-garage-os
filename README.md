# Retro Vibes Player 📻

> **Indian Garage OS — 90s Garage Radio**  
> Chai, dhool aur 90s ke gaane. A nostalgic web music experience playing 90s Indian Bollywood & Indipop classics inside a retro glass player.

---

## ✨ Features

- 🎵 **Nostalgic 90s Playlists**: Curated playlists including *Morning Shift*, *Garage Ki Shaam*, and *Indi-Pop Corner*.
- 💿 **Retro Vinyl Glass Player**: Responsive floating glass pill interface with spinning vinyl cover art, smooth seekbar, volume control, and full transport controls.
- 🕒 **Live Asia/Kolkata Clock**: Real-time IST clock with blinking colon ticker.
- 👥 **Live Listener Counter**: Real-time simulated listener counter adding to the retro radio vibe.
- 🎨 **Dynamic Atmosphere**: Glassmorphic aesthetic, film grain overlay, and responsive background artwork.
- ⚡ **Built with Modern Web Stack**: Powered by TanStack Start, React 19, Vite, and Tailwind CSS v4.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/latest) (SSR & File-based Routing)
- **UI & View**: [React 19](https://react.dev/)
- **Bundler & Server**: [Vite](https://vitejs.dev/) & [Nitro](https://nitro.unjs.io/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons & Components**: [Lucide React](https://lucide.dev/), Radix UI primitives
- **TypeScript**: Strict type safety throughout

---

## 📁 Project Structure

```
retro-vibes-player/
├── public/                # Static assets (backgrounds, logo, favicons)
├── src/
│   ├── components/        # UI and Radio Player components
│   │   ├── radio/         # Player, vinyl animation, top bar components
│   │   └── ui/            # Reusable UI primitives (dialog, dropdown, slider, etc.)
│   ├── lib/               # Audio data, playlists, error handlers, utilities
│   ├── routes/            # TanStack file-based routes (__root.tsx, index.tsx)
│   ├── server.ts          # SSR server entry point
│   ├── start.ts           # Router initialization
│   └── styles.css         # Tailwind v4 styles and custom glassmorphism utilities
├── vite.config.ts         # Vite configuration with TanStack Start & Tailwind plugins
└── package.json           # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) or **Bun** installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd retro-vibes-player
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. Open `http://localhost:3000` (or the port shown in console) in your browser.

---

## 📜 Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts local development server |
| `npm run build` | Builds production bundle with Nitro |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint code checks |
| `npm run format` | Formats code with Prettier |

---

## 📄 License

MIT License.
