# CI/CD Workflow

## Source Control
GitHub is the canonical source of truth.

## Validation Pipeline
Workflow file: [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)

**Triggers:** `pull_request`, `push` to `main`

**Runner:** `ubuntu-latest`

**Toolchain:** Node 20, `pnpm@9.0.0` (root `packageManager`), `pnpm install --frozen-lockfile`

**Steps (in order):**
1. `pnpm lint`
2. `pnpm check-types`
3. `pnpm build`

No deploy job in Actions — Cloudflare Pages deploys via its GitHub integration after validation passes locally on CF’s build environment.

**Site URL in CI:** Actions does not set `SITE_URL` or `CF_PAGES_URL`. Builds use the default `https://almarfa-platform.pages.dev`, matching interim production on Cloudflare’s default project URL. Cloudflare production/preview builds receive `CF_PAGES_URL` automatically; set production `SITE_URL` only after the custom domain is live.

## Branch Protection (Recommended)
On `main`:
- Require status check **CI / validate** (or the job name from the workflow) before merge
- Require branches to be up to date
- Disallow force-push to `main`

## Deployment Flow
```
Feature Branch
    ↓
Pull Request  →  GitHub Actions (lint, types, build)
    ↓
Preview Deployment (Cloudflare Pages)
    ↓
Review
    ↓
Merge to main  →  Actions on main + Production Deployment (Cloudflare Pages)
```

## Local Parity
```bash
pnpm install
pnpm lint && pnpm check-types && pnpm build
```
Confirm `apps/web/out/` contains `sitemap.xml`, `robots.txt`, and `rss.xml`.

Node version: see [`.node-version`](../../.node-version) (`20`).

## Operational Principles
- automated validation
- deterministic builds
- low operational overhead
- deployment simplicity
