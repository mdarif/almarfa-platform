import { createCanonicalUrl, siteConfig } from "../utils/url";
import type { BreadcrumbItem, JsonLd } from "./types";

export type ExpertiseSchemaInput = {
  label: string;
  shortDescription: string;
  overview: string;
  slug: string;
  semanticKeywords: readonly string[];
};

export function createExpertiseSchema(
  area: ExpertiseSchemaInput,
  breadcrumbs: readonly BreadcrumbItem[],
): JsonLd {
  const url = createCanonicalUrl(`/expertise/${area.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    about: area.semanticKeywords.map((keyword) => ({
      "@type": "Thing",
      name: keyword,
    })),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        item: item.url,
        name: item.name,
        position: index + 1,
      })),
    },
    description: `${area.shortDescription} ${area.overview}`,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: createCanonicalUrl("/"),
    },
    name: area.label,
    url,
  };
}
