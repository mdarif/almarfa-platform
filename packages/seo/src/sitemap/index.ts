import type { ArticleSummary } from "@repo/content";

import { createCanonicalUrl } from "../utils/url";

export type SitemapEntry = {
  changeFrequency?: "daily" | "weekly" | "monthly" | "yearly";
  lastModified?: string;
  priority?: number;
  url: string;
};

export function createStaticSitemapEntries(): SitemapEntry[] {
  return [
    {
      changeFrequency: "monthly",
      priority: 1,
      url: createCanonicalUrl("/"),
    },
    {
      changeFrequency: "weekly",
      priority: 0.8,
      url: createCanonicalUrl("/insights"),
    },
  ];
}

export function createArticleSitemapEntries(
  articles: readonly ArticleSummary[],
): SitemapEntry[] {
  return articles.map((article) => ({
    changeFrequency: "monthly",
    lastModified:
      article.frontmatter.updatedAt ?? article.frontmatter.publishedAt,
    priority: 0.7,
    url: createCanonicalUrl(`/insights/${article.slug}`),
  }));
}
