import { createCanonicalUrl, siteConfig } from "../utils/url";
import type { JsonLd } from "./types";

export function createOrganizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: createCanonicalUrl("/"),
  };
}
