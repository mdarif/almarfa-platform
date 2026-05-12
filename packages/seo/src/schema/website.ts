import { createCanonicalUrl, siteConfig } from "../utils/url";
import type { JsonLd } from "./types";

export function createWebSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: siteConfig.description,
    inLanguage: "en",
    name: siteConfig.name,
    url: createCanonicalUrl("/"),
  };
}
