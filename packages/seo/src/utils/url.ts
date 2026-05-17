const defaultSiteUrl = "https://almarfa-platform.pages.dev";

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
  contactEmail: "hello@almarfa.technology",
  description:
    "Enterprise frontend architecture, design systems, and scalable UI platform strategy.",
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
