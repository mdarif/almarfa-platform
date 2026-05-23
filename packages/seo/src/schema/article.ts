import type { Article, ArticleSummary } from "@repo/content";

import { createCanonicalUrl, siteConfig } from "../utils/url";
import type { JsonLd } from "./types";

type ArticleSchemaOptions = {
  about?: readonly string[];
};

export function createArticleSchema(
  article: Article | ArticleSummary,
  options: ArticleSchemaOptions = {},
): JsonLd {
  const canonical = createCanonicalUrl(`/insights/${article.slug}`);
  const about = options.about ?? [];

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    ...(about.length > 0
      ? {
          about: about.map((name) => ({
            "@type": "Thing",
            name,
          })),
        }
      : {}),
    author: {
      "@type": "Organization",
      name: article.frontmatter.author ?? siteConfig.name,
      url: createCanonicalUrl("/"),
    },
    dateModified:
      article.frontmatter.updatedAt ?? article.frontmatter.publishedAt,
    datePublished: article.frontmatter.publishedAt,
    description: article.frontmatter.description,
    headline: article.frontmatter.title,
    inLanguage: "en",
    keywords: about.length > 0 ? about.join(", ") : undefined,
    mainEntityOfPage: canonical,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: createCanonicalUrl("/"),
    },
    url: canonical,
  };
}
