import type { ArticleSummary } from "@repo/content";

import { createCanonicalUrl, siteConfig } from "../utils/url";

export type InsightsRssItem = {
  article: ArticleSummary;
  categories?: readonly string[];
};

export function createInsightsRssFeed(items: readonly InsightsRssItem[]) {
  const rssItems = items
    .map(({ article, categories = [] }) => {
      const url = createCanonicalUrl(`/insights/${article.slug}`);
      const categoryTags = categories
        .map((category) => `<category>${escapeXml(category)}</category>`)
        .join("");

      return [
        "<item>",
        `<title>${escapeXml(article.frontmatter.title)}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<description>${escapeXml(article.frontmatter.description)}</description>`,
        `<pubDate>${new Date(article.frontmatter.publishedAt).toUTCString()}</pubDate>`,
        categoryTags,
        "</item>",
      ].join("");
    })
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "<channel>",
    `<title>${escapeXml(siteConfig.name)} Engineering Insights</title>`,
    `<link>${createCanonicalUrl("/insights")}</link>`,
    `<description>${escapeXml("Architecture-focused frontend engineering insights from Al Marfa Technologies.")}</description>`,
    "<language>en</language>",
    rssItems,
    "</channel>",
    "</rss>",
  ].join("");
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
