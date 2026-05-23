# Al Marfa Technologies — Claude Code Context

## Platform Identity

This is NOT a startup landing page or SaaS marketing site.

This IS:

- an enterprise frontend architecture authority platform
- a semantic engineering publication ecosystem
- a static-first technical knowledge platform

AI-assisted work must preserve: calm editorial composition, semantic discoverability, low-maintenance operations.

## Validation Commands

Before reporting any task complete, run:

```bash
pnpm check-types
pnpm lint
pnpm build
```

Confirm `apps/web/out/` contains `sitemap.xml`, `robots.txt`, and `rss.xml` after build.

## Capability Registry

See [SKILLS.md](SKILLS.md) for approved patterns and explicit avoids across:

- Editorial Page Composition
- Semantic Content Publishing
- Expertise Taxonomy
- SEO & Metadata
- Static-First Rendering
- Accessibility & Semantics
- Deployment & Operations
- Editorial Surface Patterns
- Mobile Editorial & Responsive Layout

## Critical Constraints

**Deployment:** Static export only — `output: "export"` in `apps/web/next.config.ts`, deployed to Cloudflare Pages. Never use Workers SSR, `@cloudflare/next-on-pages`, or runtime edge compute.

**Rendering:** Server components by default. Client components only when interaction requires it. No unnecessary `"use client"`.

**Mobile nav:** CSS-only `<details>` / `<summary>` in `primary-nav.tsx`. No hamburger icon, no client menu state, no animation libraries.

**SEO artifacts:** RSS via `apps/web/scripts/generate-rss.mjs`; sitemap and robots.txt emitted at build. CDN redirects in `apps/web/public/_redirects`, not `redirects()` in Next config.

**Taxonomy:** `apps/web/lib/expertise/taxonomy.ts` is the single source of truth. Never duplicate taxonomy values in page components.

**Canonical domain:** Do not set production `SITE_URL` until `almarfa.co` is connected to Cloudflare Pages. Interim canonical resolves from `CF_PAGES_URL`.

## Hard Anti-Patterns

- Card-heavy layouts, dashboard aesthetics, decorative animation
- Aggressive CTAs, conversion-optimized sections
- Unnecessary client components or heavy runtime JavaScript
- Hardcoded canonical domains or inconsistent contact addresses
- `any` casts, implicit types, unsafe assertions in TypeScript
- Docker, Kubernetes, databases, or edge functions for this surface

## Governance

Before major changes:

- Read [AGENTS.md](AGENTS.md) for full engineering context
- Read [docs/ai/](docs/ai/) for architecture, coding standards, design, content, and SEO doctrine
- Read [docs/program/PROGRAM_STATUS.md](docs/program/PROGRAM_STATUS.md) for current focus and debt
- For deploy or canonical changes, read [docs/deployment/](docs/deployment/)

Never modify: `node_modules`, `.pnpm-store`, `.next`, generated cache artifacts, or dependency internals.
