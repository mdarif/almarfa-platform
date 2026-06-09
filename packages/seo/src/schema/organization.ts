import { createCanonicalUrl, siteConfig } from "../utils/url";
import type { JsonLd } from "./types";

export function createOrganizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    description: siteConfig.description,
    email: siteConfig.contactEmail,
    logo: {
      "@type": "ImageObject",
      url: createCanonicalUrl("/favicon.svg"),
    },
    name: siteConfig.name,
    url: createCanonicalUrl("/"),
  };
}
