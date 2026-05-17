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

## Governance Expectations

Before major changes:

- Read `AGENTS.md`.
- Read `docs/ai/*.md`.
- Review `docs/program/PROGRAM_STATUS.md`.
- Check whether a change strengthens editorial authority, semantic discoverability, and maintainability.

Validation expectations:

- `pnpm check-types`
- `pnpm lint`
- `pnpm build`

Do not expand platform scope just because a feature is possible. The platform should remain calm, semantic, static-first, and operationally sustainable.
