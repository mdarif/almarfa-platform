# Al Marfa Technologies — Repository Capability Registry

## Purpose

This file defines the stable implementation capabilities that future AI-assisted work may use in this repository.

Use it as a capability registry, not a feature backlog. New work should preserve the platform direction:

- enterprise frontend architecture authority
- semantic engineering publication ecosystem
- static-first technical knowledge platform
- calm editorial composition
- low-maintenance operations

## Core Capabilities

### Editorial Page Composition

Approved patterns:

- Use `Section`, `Container`, `Stack`, `Grid`, `Display`, `Heading`, `Body`, and `Caption` from `@repo/ui`.
- Prefer semantic page sections with constrained readable measures.
- Use borders sparingly for editorial separation.
- Keep CTAs quiet, text-led, and context-aware.

Avoid:

- card-heavy landing page layouts
- dashboard aesthetics
- decorative animation
- aggressive conversion components
- one-off typography systems

### Semantic Content Publishing

Approved patterns:

- Keep articles in `content/insights`.
- Use frontmatter for title, description, publication date, category, tags, clusters, and reading time.
- Use expertise cluster slugs from the taxonomy.
- Preserve meaningful heading hierarchy.
- Keep content portable and Git-based.

Avoid:

- CMS dependencies
- database-backed publishing workflows
- arbitrary tag sprawl
- shallow SEO article structures

### Expertise Taxonomy

Approved patterns:

- Treat `apps/web/lib/expertise/taxonomy.ts` as the source of truth for expertise areas, relationships, navigation grouping, and service alignment.
- Link articles to expertise through `clusters`.
- Use explicit navigation groups rather than relying on array slicing.
- Prefer taxonomy helpers from `@/lib/expertise`.

Avoid:

- duplicating taxonomy values in page components
- silently accepting invalid cluster slugs
- introducing competing authority models

### SEO & Metadata

Approved patterns:

- Use `@repo/seo` helpers for page metadata, canonical URLs, RSS, sitemap entries, and schema.
- Use `siteConfig` for platform name, canonical domain, and contact email.
- Prefer structured data for articles, breadcrumbs, expertise pages, organization, and website identity.

Avoid:

- hardcoded canonical domains
- inconsistent contact addresses
- clickbait titles or metadata
- keyword stuffing

### Static-First Rendering

Approved patterns:

- Use server components by default.
- Prefer static generation and build-time content discovery.
- Keep client JavaScript out of editorial surfaces unless interaction requires it.
- Let lint, type-checking, and production build validate governance.

Avoid:

- unnecessary client components
- form UX without an operational backend
- dynamic rendering without a clear reason
- heavy runtime content processing

### Accessibility & Semantics

Approved patterns:

- Each route owns its own `<main>` landmark.
- Use semantic headings, ordered lists for ranked/sequence content, and labeled navigation.
- Preserve focus visibility and readable line lengths.
- Keep deep links and breadcrumbs accessible.

Avoid:

- nested `<main>` landmarks
- unlabeled navigation groups
- non-functional controls
- decorative markup that weakens screen reader clarity

### Deployment & Operations

Approved patterns:

- **Static export:** `output: "export"` in `apps/web/next.config.ts`; deploy `apps/web/out/` to Cloudflare Pages.
- **CI:** GitHub Actions runs `pnpm lint`, `pnpm check-types`, `pnpm build` on PRs and `main` (see `docs/deployment/CI_CD_WORKFLOW.md`).
- **Hosting:** Cloudflare Pages Git integration; interim URL `https://almarfa-platform.pages.dev`. Canonical resolution: `SITE_URL` → `CF_PAGES_URL` → default pages.dev (see `packages/seo` and `docs/deployment/DEPLOYMENT_STRATEGY.md`).
- **CDN redirects:** `apps/web/public/_redirects` (not `redirects()` in Next config).
- **Build-time SEO artifacts:** RSS via `apps/web/scripts/generate-rss.mjs` → `public/rss.xml`; `sitemap.xml` and `robots.txt` emitted at build into `out/`.

Avoid:

- Workers SSR, `@cloudflare/next-on-pages`, or runtime edge compute for the marketing site
- Docker/Kubernetes/self-managed servers for this surface
- Setting production `SITE_URL` until the custom domain is connected

Reference: `docs/deployment/` (`DEPLOYMENT_STRATEGY.md`, `CLOUDFLARE_PAGES.md`, `CI_CD_WORKFLOW.md`).

### Mobile Editorial & Responsive Layout

Approved patterns:

- **CSS-only mobile nav:** `<details>` / `<summary>` disclosure in `primary-nav.tsx` (label "Navigate"); horizontal nav at `md+`. No `"use client"`, no hamburger icon component.
- **Disclosure styling:** `.editorial-disclosure-summary` in `apps/web/app/globals.css` for summary rows (TOC, nav).
- **Header/footer links:** color and opacity on hover only — no underline on brand or primary nav.
- **Footer mobile:** single-column stack; expertise groups in `grid-cols-1` → `lg:grid-cols-3`; duplicate primary nav hidden below `md` (mobile uses header disclosure).
- **Typography tokens:** fluid `clamp()` scales in `packages/ui/src/styles/tokens.css`; `Heading` sizes `list` | `article` | `section` | `default`; `Body` `size="reading"` for long-form prose.
- **Article TOC:** `ArticleTableOfContents` — mobile `<details>` "On this page"; desktop inline nav in article layout (`apps/web/components/content/article-table-of-contents.tsx`).
- **Dev UX:** `devIndicators: false` in `next.config.ts` to keep local chrome calm.

Avoid:

- client-side mobile menu state or animation libraries for navigation
- hamburger/menu icon patterns that imply app chrome
- duplicate nav blocks visible on small screens (footer primary nav)
- arbitrary typography sizes outside tokenized primitives

## Governance Expectations

Before major changes:

- Read `AGENTS.md`.
- Read `docs/ai/*.md`.
- Review `docs/program/PROGRAM_STATUS.md`.
- For deploy or URL/canonical changes, read `docs/deployment/*.md`.
- Check whether a change strengthens editorial authority, semantic discoverability, and maintainability.

Validation expectations:

- `pnpm check-types`
- `pnpm lint`
- `pnpm build`

Do not expand platform scope just because a feature is possible. The platform should remain calm, semantic, static-first, and operationally sustainable.
