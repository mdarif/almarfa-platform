# Review Checklist

## Editorial

- [ ] Spacing is consistent with tokenized rhythm values
- [ ] Readable line lengths (body: 65–75 chars; prose containers; hero titles constrained)
- [ ] Semantic heading hierarchy is correct (H1 → H2 → H3; no skipped levels)
- [ ] Section composition uses approved primitives: `Section`, `Container`, `Stack`, `Grid`, `Display`, `Heading`, `Body`, `Caption`
- [ ] No card-heavy layouts, dashboard aesthetics, or decorative animation
- [ ] CTAs are quiet, text-led, and context-aware — not aggressive or conversion-first

## Architecture

- [ ] New components are reusable primitives, not page-specific one-offs
- [ ] No abstraction creep — three similar lines beat a premature helper
- [ ] Package boundaries respected — app code doesn't reach into other app internals
- [ ] No duplicate taxonomy values — `apps/web/lib/expertise/taxonomy.ts` is the single source of truth
- [ ] TypeScript is strict: no `any`, no unsafe casts, explicit prop types

## Rendering & Client JS

- [ ] Server components are used by default
- [ ] `"use client"` is present only where interaction genuinely requires it
- [ ] No unnecessary `useEffect`, excessive hydration, or client-heavy state
- [ ] Mobile nav uses CSS-only `<details>` / `<summary>` — no hamburger icon, no client menu state
- [ ] No canvas, Lottie, or client-driven decorative animation on editorial surfaces

## Deployment & Static Export

- [ ] No `getServerSideProps`, API routes, or dynamic rendering on the marketing site
- [ ] Redirects use `apps/web/public/_redirects`, not `redirects()` in `next.config.ts`
- [ ] Build passes: `pnpm lint && pnpm check-types && pnpm build`
- [ ] `apps/web/out/` contains `sitemap.xml`, `robots.txt`, and `rss.xml` after build
- [ ] No hardcoded canonical domains — canonical URLs resolve through `packages/seo`

## SEO

- [ ] Page has canonical metadata via `@repo/seo` helpers
- [ ] Structured data (JSON-LD) present where applicable (articles, expertise, breadcrumbs)
- [ ] Sitemap entry will be generated at build
- [ ] Semantic HTML: proper `<main>`, `<nav aria-label>`, `<article>`, `<section>` usage
- [ ] Each route owns exactly one `<main>` landmark — no nested `<main>` elements

## Taxonomy & Content

- [ ] Articles linked to expertise through `clusters` in frontmatter
- [ ] Cluster slugs are valid values from the taxonomy (no silent invalid slugs)
- [ ] No arbitrary tag sprawl or duplicate authority structures
- [ ] Internal linking reinforces topic clusters — no isolated content

## Accessibility

- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus visibility is preserved
- [ ] Navigation regions have accessible labels (`aria-label`)
- [ ] No non-functional controls or decorative markup that weakens screen reader clarity

## AI Governance

- [ ] Change aligns with `AGENTS.md` engineering context
- [ ] No patterns from the SKILLS.md "Avoid" sections introduced
- [ ] Platform scope not expanded beyond what the task requires
