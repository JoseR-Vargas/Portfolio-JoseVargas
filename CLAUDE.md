# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio site for Jose Vargas (Backend Developer): a Vite + React 19 + TypeScript single-page app styled with Tailwind CSS v4 and the Preline design system. The previous vanilla HTML/CSS/JS version was removed in the `migrate-to-react` work; it remains in git history.

## Commands

Requires Node `^20.19.0 || >=22.12.0`.

```bash
npm install
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build -> dist/
npm run preview    # serve dist/
npm run lint       # ESLint
npm run typecheck  # tsc -b
```

There is no test runner. Verify changes with `typecheck`, `lint`, `build` and a dev-server smoke check.

## API

`src/services/api.ts` selects the backend by hostname: `http://localhost:3002/api` on localhost, `https://myportfolio-back-j9ji.onrender.com/api` otherwise. `ApiService` handles `/contacts`; `StorageService` is the `localStorage` fallback used when the API is unreachable.

## Architecture

Routes (`react-router-dom`, defined in `src/App.tsx`):
- `/` — `PortfolioPage` (Navbar, Hero, About, Skills, Resume, Projects, Contact, Footer)
- `/dashboard` — `DashboardPage` (contact messages: stats, filters, list, detail dialog, status updates)

`src/` layout:
- `components/ui/` — shared primitives: `Button`, `Input`, `Container`, `SectionHeading`, `Reveal`
- `components/sections/` — portfolio sections; `components/layout/` — `Navbar`, `Footer`
- `components/dashboard/` — dashboard components, `messageUtils.ts`, `strings.ts` (dashboard copy is English-only)
- `hooks/` — behavior as hooks: `useTypewriter`, `useScrollReveal`, `useActiveSection`, `useMessages`, `useDocumentMeta`, `usePrefersReducedMotion`
- `services/api.ts` — `ApiConfig`, `ApiService`, `StorageService`
- `i18n/` — `I18nProvider` and en/es `translations.ts`
- `data/site.ts` — static site data
- `index.css` — Tailwind v4 entry, Preline theme/variants imports, brand overrides (orange `#FF6B2B` on Preline `--primary-*`, dark theme)

`public/` is served as-is: `img/`, `cv/`, `tittles/` (certificates), `_redirects` (SPA fallback for Netlify/Render static).

## Conventions

- Use the shared `Button` and `Input` from `src/components/ui` (Preline pill styles live there); do not re-declare those utility classes elsewhere.
- Style with Tailwind utilities and Preline theme tokens (`bg-primary`, `bg-layer`, `text-foreground`, ...), not custom CSS classes.
- Add new behavior as a component or hook; keep services framework-free in `src/services`.
- Portfolio strings go through i18n (`useI18n` + `translations.ts`, both `en` and `es`).
- Certificate files live in `public/tittles/` (not `titles/`); keep that spelling consistent with the links in the code.
- Project images go in `public/img/`; prefer `.jpg` for photos, `.png` for screenshots with transparency.
- Code, comments, UI copy and docs are written in English.
