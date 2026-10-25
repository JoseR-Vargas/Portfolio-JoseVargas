# MyPortfolio2024

Personal portfolio of Jose Vargas (Backend Developer), built as a single-page app with React, TypeScript and Vite. Styling uses Tailwind CSS v4 on top of the Preline design system.

- `/` — portfolio (Hero, About, Skills, Resume, Projects, Contact), English/Spanish.
- `/dashboard` — admin view of contact form submissions (stats, filters, status updates).

## Requirements

- Node.js `^20.19.0` or `>=22.12.0` (required by Vite 8)
- npm

## Getting started

```bash
npm install
npm run dev
```

| Script              | Purpose                              |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Vite dev server with HMR             |
| `npm run build`     | Type-check (`tsc -b`) and build to `dist/` |
| `npm run preview`   | Serve the production build locally   |
| `npm run lint`      | ESLint                               |
| `npm run typecheck` | TypeScript project build check       |

There is no test runner.

## API and storage

`src/services/api.ts` picks the backend from the hostname:

- `localhost` / `127.0.0.1` → `http://localhost:3002/api`
- anything else → `https://myportfolio-back-j9ji.onrender.com/api`

The contact form and the dashboard use `/contacts`. If the API is unreachable, messages fall back to `localStorage`, so the form and dashboard keep working offline.

## Project structure

```
index.html            Vite entry (fonts, icons CDN, meta tags)
public/               Served as-is: img/, cv/, tittles/ (certificates), _redirects
src/
  main.tsx, App.tsx   Bootstrap and routes
  index.css           Tailwind v4 + Preline theme + brand overrides
  pages/              PortfolioPage, DashboardPage
  components/
    ui/               Shared Button, Input, Container, SectionHeading, Reveal
    sections/         Portfolio sections
    layout/           Navbar, Footer
    dashboard/        Dashboard components, helpers and strings
  hooks/              useTypewriter, useScrollReveal, useActiveSection, useMessages, ...
  services/api.ts     ApiConfig, ApiService, StorageService
  i18n/               I18nProvider and en/es translations
  data/site.ts        Static site data
```

## Design system notes

- Tailwind v4 is loaded with `@import "tailwindcss"` plus Preline's `variants.css` and `theme.css` (imported from `node_modules` in `src/index.css`) and `@tailwindcss/forms`.
- The brand orange (`#FF6B2B`) is mapped onto Preline's `--primary-*` scale; the app runs in dark mode (`class="dark"` on `<html>`).
- Pill-shaped button and input styles live in `src/components/ui/Button.tsx` and `src/components/ui/Input.tsx`. Use these components instead of repeating the utility classes.

## Deployment

The build output (`dist/`) is fully static. Because `/dashboard` is a client-side route, the host must fall back to `index.html` for unknown paths:

- Netlify and Render static sites: `public/_redirects` is copied to `dist/` and handles it.
- Other hosts need their own rule (for example `vercel.json` rewrites, or a `404.html` copy of `index.html` on GitHub Pages). None is configured here because the frontend host is not recorded in the repository.
