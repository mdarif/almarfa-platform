# Al Marfa Technologies — Web App

Static-first Next.js application deployed to Cloudflare Pages.

## Stack

- **Framework:** Next.js App Router (static export)
- **Monorepo:** Turborepo (`pnpm` workspaces)
- **Styling:** Tailwind CSS + design tokens from `@repo/ui`
- **Hosting:** Cloudflare Pages (via GitHub integration)
- **CI:** GitHub Actions — lint, type-check, build on PRs and `main`

## Development

```bash
# From repo root
pnpm install
pnpm dev        # starts apps/web at http://localhost:3000
```

## Validation

```bash
pnpm lint
pnpm check-types
pnpm build      # emits static output to apps/web/out/
```

Confirm `apps/web/out/` contains `sitemap.xml`, `robots.txt`, and `rss.xml` after build.

## Architecture

- **Static export:** `output: "export"` in `next.config.ts` — no SSR, no edge functions
- **SEO artifacts:** `sitemap.xml` and `robots.txt` emitted at build; RSS generated pre-build via `scripts/generate-rss.mjs`
- **CDN redirects:** `public/_redirects` (Cloudflare Pages format)
- **Canonical URLs:** resolved in `packages/seo` — `SITE_URL` → `CF_PAGES_URL` → default `*.pages.dev`

## Documentation

- [Architecture principles](../../docs/ai/architecture-principles.md)
- [Capability registry (SKILLS.md)](../../SKILLS.md)
- [Deployment strategy](../../docs/deployment/DEPLOYMENT_STRATEGY.md)
- [CI/CD workflow](../../docs/deployment/CI_CD_WORKFLOW.md)
- [Program status](../../docs/program/PROGRAM_STATUS.md)
