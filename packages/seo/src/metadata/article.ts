import type { Article, ArticleSummary } from "@repo/content";

import { createCanonicalUrl, siteConfig } from "../utils/url";
import { createTitle, createTwitterMetadata } from "./site";

export function createArticleMetadata(article: Article | ArticleSummary) {
  const pathname = `/insights/${article.slug}`;
  const canonical = createCanonicalUrl(pathname);
  const title = createTitle(article.frontmatter.title);
  const description = article.frontmatter.description;

  return {
    alternates: {
      canonical,
    },
    authors: article.frontmatter.author
      ? [{ name: article.frontmatter.author }]
      : [{ name: siteConfig.name }],
    description,
    openGraph: {
      description,
      locale: siteConfig.locale,
      publishedTime: article.frontmatter.publishedAt,
      siteName: siteConfig.name,
      tags: article.frontmatter.tags,
      title,
      type: "article",
      url: canonical,
    },
    title,
    twitter: createTwitterMetadata({ description, title }),
  };
}
