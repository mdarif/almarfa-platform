# Deployment Strategy

## Goals
- low-cost hosting
- static-first deployment
- CDN-native delivery
- secure-by-default architecture
- easy CI/CD workflows

## Operational Philosophy
- maximize leverage
- maximize maintainability
- maximize simplicity
- maximize automation

- minimize operational burden
- minimize infrastructure management
- minimize recurring maintenance effort

## Hosting Direction
- GitHub as source-of-truth
- Cloudflare Pages for production delivery
- global CDN edge distribution
- **Next.js static export** (`output: "export"`) — not Workers SSR or `@cloudflare/next-on-pages`

## Platform Characteristics
- static-first
- semantic publishing
- editorial architecture
- low-runtime dependency
- operationally calm

## Build Output
- Turborepo runs `pnpm build` from the repository root
- The web app emits static HTML and assets to `apps/web/out/`
- SEO artifacts: `sitemap.xml`, `robots.txt`, and `rss.xml` (RSS generated pre-build into `public/`, then copied to `out/`)

## Runtime Features Migrated to Build/CDN
| Former Next.js feature | Replacement |
|------------------------|-------------|
| `redirects()` in `next.config.js` | `apps/web/public/_redirects` (Cloudflare Pages) |
| `app/rss.xml/route.ts` | `apps/web/scripts/generate-rss.mjs` → `public/rss.xml` |

## Canonical URLs
- Resolved in `packages/seo/src/utils/url.ts`: `SITE_URL` (trailing slash stripped) → `CF_PAGES_URL` (Cloudflare injects at build) → default `https://almarfa-platform.pages.dev`
- **Interim hosting:** production on Cloudflare Pages uses the default `*.pages.dev` URL (`https://almarfa-platform.pages.dev`); no env vars required — `CF_PAGES_URL` sets canonicals on CF builds
- **Custom domain (later):** set `SITE_URL=https://almarfa.technology` in Cloudflare Pages **production** environment only when `almarfa.technology` is connected
- **CI:** omits `SITE_URL` and `CF_PAGES_URL`; build uses the default `https://almarfa-platform.pages.dev` (matches interim production canonicals)
- **Preview deploys:** each preview gets its own `CF_PAGES_URL`; canonicals follow the preview URL (acceptable for testing)

## Constraints
- avoid infrastructure complexity
- avoid Kubernetes
- avoid self-managed servers
- avoid unnecessary runtime compute
- avoid database dependency unless justified
- no Docker, K8s, databases, or edge functions for the marketing site

## Deferred / Out of Scope
- `createOpenGraphImageUrl` references a `/og` route that does not exist — metadata does not use it today; future static OG assets if needed
- Optional dependency cleanup in `apps/web` (`geist`, `shadcn`, umbrella `radix-ui`) — no static-export impact
