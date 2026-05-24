// Fallback for local dev and CI only — never reached in production once SITE_URL is set.
// Update this if the Cloudflare Pages project is ever renamed.
const defaultSiteUrl = "https://almarfa-platform.pages.dev";

// Resolution order: SITE_URL (production custom domain) → CF_PAGES_URL (Cloudflare injects at build,
// gives each preview its own canonical) → defaultSiteUrl (local dev / CI).
// To cut over to almarfa.co: set SITE_URL=https://almarfa.co in Cloudflare Pages production env only.
function resolveSiteUrl(): string {
  const fromSiteUrl = process.env.SITE_URL?.replace(/\/$/, "");
  if (fromSiteUrl) {
    return fromSiteUrl;
  }

  const fromCfPages = process.env.CF_PAGES_URL?.replace(/\/$/, "");
  if (fromCfPages) {
    return fromCfPages;
  }

  return defaultSiteUrl;
}

export type SiteConfig = {
  contactEmail: string;
  description: string;
  locale: string;
  name: string;
  siteUrl: string;
  twitterHandle?: string;
};

export const siteConfig: SiteConfig = {
  contactEmail: "hello@almarfa.co",
  description:
    "Enterprise frontend platform engineering — monorepo architecture, component governance, Storybook infrastructure, and developer experience for engineering organizations at scale.",
  locale: "en_US",
  name: "Al Marfa Technologies",
  siteUrl: resolveSiteUrl(),
};

export function createCanonicalUrl(pathname = "/") {
  return new URL(normalizePathname(pathname), siteConfig.siteUrl).toString();
}

export function normalizePathname(pathname: string) {
  if (!pathname) {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}
