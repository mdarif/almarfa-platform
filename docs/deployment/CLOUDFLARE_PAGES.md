# Cloudflare Pages Deployment

## Deployment Model
GitHub → Cloudflare Pages → Global CDN

GitHub Actions ([`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)) validates every PR and `main` push. Cloudflare Pages connects to the same repository for preview and production deploys — deploy is not performed in Actions.

## Dashboard Settings

| Setting | Value |
|---------|-------|
| Root directory | repository root |
| Build command | `pnpm install && pnpm build` |
| Build output directory | `apps/web/out` |
| Node version | 20 (see [`.node-version`](../../.node-version)) |
| Production branch | `main` |

## Environment Variables

| Variable | Production (interim) | Production (custom domain) | Preview / CI |
|----------|----------------------|----------------------------|--------------|
| `SITE_URL` | Omit | `https://almarfa.technology` | Omit |
| `CF_PAGES_URL` | Auto-injected by Cloudflare at build | Auto-injected | Auto-injected (unique per preview) |

**Site URL resolution** (in `packages/seo/src/utils/url.ts`): `SITE_URL` → `CF_PAGES_URL` → default `https://almarfa-platform.pages.dev`.

Until the custom domain is ready, production builds on Cloudflare use the project default URL (`https://almarfa-platform.pages.dev`) via `CF_PAGES_URL`. No manual env vars are required for interim hosting.

When `almarfa.technology` is connected, set `SITE_URL=https://almarfa.technology` in the Cloudflare Pages **production** environment only. Leave preview builds without `SITE_URL` so each preview uses its own `CF_PAGES_URL` for canonicals (acceptable for testing).

## Build Artifacts
After a successful build, `apps/web/out/` should contain:
- Static HTML for all routes
- `sitemap.xml` (from `app/sitemap.ts`)
- `robots.txt` (from `app/robots.ts`)
- `rss.xml` (from pre-build script → `public/rss.xml`)
- `_redirects` (copied from `public/_redirects`)

## Redirects
Legacy paths are defined in [`apps/web/public/_redirects`](../../apps/web/public/_redirects). Cloudflare Pages applies these at the edge (301). Do not re-add `redirects()` to `next.config.js` — static export does not support them.

Rules:
```
/expertise/storybook → /expertise/storybook-ecosystems
/expertise/governance → /expertise/frontend-governance
/expertise/dx-engineering → /expertise/developer-experience-engineering
/expertise/angular-enterprise → /expertise/angular-enterprise-patterns
/insights?cluster=:cluster → /expertise/:cluster
```

## Preview vs Production
- **Preview:** every PR branch gets a unique `*.pages.dev` URL after CI passes and CF builds; canonicals use that preview’s `CF_PAGES_URL`
- **Production (interim):** merges to `main` deploy to `https://almarfa-platform.pages.dev` (Cloudflare default project URL)
- **Production (custom domain):** set production `SITE_URL` so canonicals, sitemap, RSS, and robots target `https://almarfa.technology`

## One-Time Setup Checklist
1. Create Cloudflare Pages project linked to the GitHub repo
2. Set build output to `apps/web/out` and Node 20
3. Deploy and verify at `https://almarfa-platform.pages.dev` (no `SITE_URL` required yet)
4. Connect custom domain `almarfa.technology` when ready
5. Add production env `SITE_URL=https://almarfa.technology` after the custom domain is live
6. Enable branch previews for pull requests

## Current Deployment Goals
- production deployment
- preview deployments
- static asset optimization
- HTTPS by default
- CDN edge caching

## Important Constraints
- preserve static-first rendering
- avoid runtime-heavy features
- avoid unnecessary edge functions

## Future Considerations
- custom domain DNS finalization
- cache strategy tuning
- post-deploy robots/sitemap/RSS validation
- analytics
