# Feature: migrate-to-react

Branch: `feat/migrate-to-react` (user wrote `feat/migrate-yo-react`; the existing identical-to-master branch was used)

## Objective
Migrate the static vanilla HTML/CSS/JS portfolio (index.html + dashboard.html) to React, styled with Tailwind CSS and the Preline design system (`npm i preline`).

## Constraints / user-mandated styles
- Buttons (pill): primary = `py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-hover disabled:opacity-50 disabled:pointer-events-none`
- Buttons secondary = `py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full bg-layer border border-layer-line text-layer-foreground shadow-2xs hover:bg-layer-hover focus:outline-hidden focus:bg-layer-hover disabled:opacity-50 disabled:pointer-events-none`
- Form inputs: `py-2.5 sm:py-3 px-4 rounded-full block w-full bg-layer border-layer-line sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none`
- Behavior must be preserved: i18n (js/i18n.js), contact form -> API (js/api-config.js, localStorage fallback), dashboard (stats, list, status updates), typewriter, scroll animations, smooth scroll, nav.

## Decisions
- Vite + React + TypeScript at repo root; legacy files removed after migration (git history keeps them).
- Tailwind v4 (`@import "tailwindcss"`) + `preline/theme.css` + `preline/variants.css` + `@tailwindcss/forms`.
- `react-router-dom`: `/` portfolio, `/dashboard`. Static hosts need SPA fallback.
- Static assets (img, tittles, cv) move to `public/` keeping paths. `tittles/` spelling preserved.
- Test-first exception: repo has no test runner and this is a UI port; proof = `tsc`, `vite build`, lint, dev-server smoke. No runner invented.
- Delivery: strategy `ask-on-risk`; forecast >400 lines, so slices follow task boundaries; PR chain choice asked when the user requests a PR.

## Tasks
- [x] T1 Scaffold: Vite+React+TS, Tailwind v4, Preline theme, router, .gitignore, public assets, shared Button/Input components, ApiConfig/ApiService/StorageService ported to TS, i18n provider ported
- [x] T2 Portfolio page (`/`): Navbar, Hero (typewriter), About, Projects, Contact form (Preline button/input styles), Footer, scroll animations, language switch
- [x] T3 Dashboard page (`/dashboard`): stats, message list, status updates, filters as in js/dashboard.js
- [ ] T4 Cleanup: delete legacy index.html/dashboard.html/js/css, update README.md + CLAUDE.md, final build check

## Progress / Evidence
- T1: route=delegated-writer, commit=see git log: `chore: scaffold vite react tailwind preline app` (babd72b at time of writing). Observed: `npm run typecheck` ok, `npm run lint` ok, `npm run build` ok (CSS contains all user-mandated Button/Input utilities incl. `bg-primary`, `border-layer-line`, `placeholder:text-muted-foreground-1`, `focus:ring-primary-focus`), `npx vite --port 5173` serves HTML and /img, /cv, /tittles assets (200). No test runner (documented exception).
  - Notes: preline exports map does not expose CSS, so `src/index.css` imports `../node_modules/preline/variants.css` and `../node_modules/preline/css/themes/theme.css`. Legacy brand orange (#FF6B2B) mapped onto Preline `--primary-500/600/700`; `.dark` class on `<html>` with legacy near-black background. Legacy used Poppins; per task spec the new app uses Inter + JetBrains Mono. `StorageService` lived in legacy/js/dashboard.js (not api-config.js) and was ported into src/services/api.ts.
- T2: route=delegated-writer, commit=2250fd0 `feat: port portfolio page to react with preline styles` (22 files, ~1100 lines: larger than the 400-line heuristic because it covers the whole page: 7 sections, navbar, footer, 5 hooks, 3 shared UI helpers, new i18n keys). Observed: `npm run typecheck` ok, `npm run lint` ok, `npm run build` ok (CSS includes `animate-cursor-blink`, `bg-primary`, `scroll-mt-20`), `npx vite --port 5173` serves HTML (stopped afterwards). Headless Chromium (playwright from ~/.cache/playwright-mobile-qa) at 1280px and 375px: no console/page errors, no horizontal overflow, typewriter running, active nav highlight, mobile menu opens and navigates, empty-submit shows validation message and re-translates on language switch. No test runner (documented exception).
  - Notes: sections/ids follow legacy (`home`, `about`, `skills`, `resume`, `projects`, `contact`); Paqueteria24/TecniServi/Hostal stay hidden as in legacy. New i18n keys (en+es): `nav.switchLang`, `nav.main`, `projects.liveDemo`, `contact.form.validation.*`, `contact.form.sending|success|error`. Gaps vs legacy: AOS replaced by `Reveal` (IntersectionObserver, fade/slide only, honours reduced motion; no zoom variants); hero photo appears at the `lg` (1024px) breakpoint instead of 968px; form submits via `ApiService.createMessage` so a down API now falls back to localStorage (legacy showed an error); phone field is optional (legacy `required` was inert under `novalidate`).
- T3: route=delegated-writer, commit=22878e3 `feat: port dashboard page to react with preline styles` (13 files, ~700 lines: above the 400-line heuristic because it ports stats, filters, list, detail dialog, status actions and a data hook in one slice). Observed: `npm run typecheck` ok, `npm run lint` ok (after restructuring the load effect to satisfy `react-hooks/set-state-in-effect`), `npm run build` ok, `npx vite --port 5173` serves `/dashboard`, `/src/main.tsx` and `/src/pages/DashboardPage.tsx` (200; stopped afterwards). Headless Chromium (playwright from ~/.cache/playwright-mobile-qa) at 1280px and 375px with the API unreachable (localStorage fallback, 4 seeded messages): stats 4/1/2, search/status/date filters, empty state, opening an unread message marks it read, Escape and backdrop close the dialog, Reply marks replied, Mark All Read, Refresh, cross-tab `storage` event reload, no horizontal overflow, only expected API-unreachable console errors. No test runner (documented exception).
  - Notes: legacy dashboard had hardcoded English and no i18n, so copy stays English in `src/components/dashboard/strings.ts`. Legacy had no delete, no sorting, no export and no auto-refresh, so none were added (`ApiService.deleteMessage` stays unused). Dropped: the same-window `newContactMessage`/`messageUpdated` custom events (the contact form lives on another route now); the `storage` listener is kept. Intentional changes: week filter starts Sunday 00:00 (legacy compared against the current time of day, excluding early-week messages); dialog is a native `<dialog>` and cards are native buttons; modal shows "Replied" for replied messages and "Already Read" for read ones; labels hide nothing on mobile (legacy hid button text); `ContactMessage` gained optional `_id`; invalid dates render empty instead of throwing; load errors show the empty state as in legacy. Home/"View Contact Form" are plain anchors (`/`, `/#contact`) so the browser handles hash scrolling.

## Next step
T4
