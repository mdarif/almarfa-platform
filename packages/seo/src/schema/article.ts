import type { Article, ArticleSummary } from "@repo/content";

import { createCanonicalUrl, siteConfig } from "../utils/url";
import type { JsonLd } from "./types";

export function createArticleSchema(article: Article | ArticleSummary): JsonLd {
  const canonical = createCanonicalUrl(`/insights/${article.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    author: {
      "@type": "Organization",
      name: article.frontmatter.author ?? siteConfig.name,
      url: createCanonicalUrl("/"),
    },
    dateModified: article.frontmatter.updatedAt ?? article.frontmatter.publishedAt,
    datePublished: article.frontmatter.publishedAt,
    description: article.frontmatter.description,
    headline: article.frontmatter.title,
    inLanguage: "en",
    mainEntityOfPage: canonical,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: createCanonicalUrl("/"),
    },
    url: canonical,
  };
}
