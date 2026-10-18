# Desktop Portfolio Template

A portfolio template built around the metaphor of a desktop operating system: menu bar, project folders, case-study windows, Spotlight, widgets and a dock. Clone it, replace the placeholder content with yours and deploy.

## Features

- Interactive desktop where each project is a folder that opens a case-study window.
- Menu bar with an availability indicator and a live clock.
- Dock with tools, your own apps and external links.
- Spotlight search, widgets panel, Notes app and a design-tokens page.
- Three switchable looks: **Tahoe** (macOS 26), **Aqua** (Mac OS X 10.4) and **Classic** (Mac OS 9).
- Mobile-friendly layout.
- Typed content in `src/content`. No backend, no database.

## Stack

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [Motion](https://motion.dev) for animations
- Plain CSS with custom properties
- [Oxlint](https://oxc.rs) for linting

## Getting started

Requires Node.js 20 or newer.

```bash
git clone <your-repo-url> my-portfolio
cd my-portfolio
npm install
npm run dev
```

Then open the URL that Vite prints (usually `http://localhost:5173`).

## Make it yours

All personal content lives in `src/content/`. Search the project for `[TODO]` to find every placeholder you still need to fill in.

| What                          | Where                                   |
| ----------------------------- | --------------------------------------- |
| Name, role, headline, links   | `src/content/dock.ts` → `author`        |
| Notes app (About, CV…)        | `src/content/dock.ts` → `notes`         |
| Dock apps and their dialogs   | `src/content/dock.ts` → `dockItems`     |
| Case studies                  | `src/content/projects.ts`               |
| Menu bar and context menus    | `src/content/menus.ts`                  |
| Wallpapers                    | `public/images/`                        |
| Dock and menu bar icons       | `public/icons-dock/`, `public/icons-menubar/` |
| Looks / themes                | `src/appearance.ts`, `src/styles/`      |

Notes:

- `author` feeds the menu bar, the tab title, About This Mac and the profile card.
- Empty links (`github`, `linkedin`, `spotifyPlaylist`) show a card explaining where to add them.
- Projects are made of typed sections (hero, intro, numbered list, process…) defined in `src/content/types.ts` and rendered by `SectionRenderer`.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Development server with HMR          |
| `npm run build`   | Type-check and production build      |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run Oxlint                           |

## Project structure

```
src/
├─ components/   Desktop, Dock, MenuBar, windows, Spotlight, widgets…
├─ content/      Projects, dock, menus and data types
├─ hooks/        Shared hooks
├─ styles/       Tokens, global styles and per-look themes
├─ appearance.ts Look switcher (Tahoe / Aqua / Classic)
├─ state.ts      Global state
└─ main.tsx      Entry point
public/          Icons, images and static assets
```

## Deploy

`npm run build` outputs a static site to `dist/`. Upload that folder to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages…).

## Credits

Template designed and developed by [Luis Romero](https://romeroloconte.com/). The credit appears in About This Mac and can be changed or removed via `credit` in `src/content/dock.ts`.
