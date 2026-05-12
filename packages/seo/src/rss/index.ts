import type { ArticleSummary } from "@repo/content";

import { createCanonicalUrl, siteConfig } from "../utils/url";

export function createInsightsRssFeed(articles: readonly ArticleSummary[]) {
  const items = articles
    .map((article) => {
      const url = createCanonicalUrl(`/insights/${article.slug}`);

      return [
        "<item>",
        `<title>${escapeXml(article.frontmatter.title)}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<description>${escapeXml(article.frontmatter.description)}</description>`,
        `<pubDate>${new Date(article.frontmatter.publishedAt).toUTCString()}</pubDate>`,
        "</item>",
      ].join("");
    })
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    `<title>${escapeXml(siteConfig.name)} Engineering Insights</title>`,
    `<link>${createCanonicalUrl("/insights")}</link>`,
    `<description>${escapeXml("Architecture-focused frontend engineering insights from Al Marfa Technologies.")}</description>`,
    "<language>en</language>",
    items,
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
