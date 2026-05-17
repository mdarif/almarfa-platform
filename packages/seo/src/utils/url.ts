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
  siteUrl: "https://almarfa.technology",
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
