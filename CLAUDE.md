# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server (http://localhost:4200)
ng start

# Production build (outputs to dist/performance-tips)
ng build

# Watch mode (development)
ng watch

# Unit tests
ng test

# Run SSR server after build (http://localhost:4000)
node dist/performance-tips/server/server.mjs

# Lint (via Angular CLI)
ng lint
```

## Architecture

**PerformanceTips** is an Angular SSR educational app demonstrating Web Core Vitals and Angular performance optimization techniques through 22 sequential step-by-step lessons.

### SSR / Rendering Strategy

- `src/app/app.config.ts` — Client config with `provideClientHydration(withIncrementalHydration(), withEventReplay(), withHttpTransferCacheOptions(...))`
- `src/app/app.config.server.ts` — Merges base config with server providers and `withRoutes(serverRoutes)`
- `src/app/app.routes.server.ts` — Controls render mode per route:
  - Most routes: `RenderMode.Prerender` (static HTML at build time)
  - Steps 17, 18, 20: `RenderMode.Server` (on-demand SSR, because they use `delayResolver`)

### Routing

All routes lazy-load their components via `loadComponent`. Steps are numbered 1–22 and are located under `src/app/pages/step{N}-*/`. Each pair of steps typically shows a "broken/naive" version and an "optimized" version:

| Steps | Topic |
|-------|-------|
| 1–2   | `@for` vs `*ngFor` with trackBy |
| 3–4   | DNS prefetch optimization |
| 5–6   | Cumulative Layout Shift (CLS) |
| 7–8   | Image intrinsic dimensions |
| 9–10  | Image format (WebP/modern formats) |
| 11–12 | Template function call anti-pattern |
| 13–14 | `OnPush` change detection |
| 15–16 | `@defer` blocks |
| 17–18 | Hydration issues and fixes |
| 19    | Partial hydration |
| 20    | Event replay |
| 21–22 | HTTP caching |

### Component Patterns

- **All components are standalone** — no NgModules, explicit `imports` array in each decorator.
- **Control flow:** New Angular syntax (`@for`, `@if`, `@defer`) used in "fixed" step components; `*ngFor`/`*ngIf` used in "issue" components intentionally.
- **`LifecycleLoggerDirective`** (`src/app/directives/`) — logs create/destroy with styled console output to visualize unnecessary re-renders.
- **`delayResolver`** (`src/app/resolvers/`) — introduces a 3-second artificial delay; forces `RenderMode.Server` for those routes.

### Services

- `ApiService` — fetches product data from `https://fakerapi.it/api/v1/products` (mapped to `Card` interface); uses `withFetch()` HTTP client (no XHR).
- `CardsService` — returns static card array with CDN image URLs.
- HTTP transfer cache is enabled so SSR-fetched data is reused on the client without refetching.

### Deployment

Deployed to Firebase Hosting with Cloud Functions SSR backend:
- `firebase.json` — `frameworksBackend` config for serverless SSR
- `.firebaserc` — project: `ng-performance-tips`
- Google Analytics tracking ID: `G-LDJV9DYQZ8` (production environment only)

### TypeScript Config

Strict mode enabled: `strict`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `strictTemplates`. Target: ES2022.
