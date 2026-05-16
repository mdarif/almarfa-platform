import type { Article, ArticleSummary } from "@repo/content";

import { createCanonicalUrl, siteConfig } from "../utils/url";
import { createTitle, createTwitterMetadata } from "./site";

type ArticleMetadataOptions = {
  clusterLabels?: readonly string[];
  semanticKeywords?: readonly string[];
};

export function createArticleMetadata(
  article: Article | ArticleSummary,
  options: ArticleMetadataOptions = {},
) {
  const pathname = `/insights/${article.slug}`;
  const canonical = createCanonicalUrl(pathname);
  const title = createTitle(article.frontmatter.title);
  const description = article.frontmatter.description;
  const tags = [
    ...new Set([
      ...article.frontmatter.tags,
      ...(options.clusterLabels ?? []),
      ...(options.semanticKeywords ?? []),
    ]),
  ];
  const keywords = [
    ...new Set([
      "frontend architecture",
      ...(options.clusterLabels ?? []),
      ...(options.semanticKeywords ?? []),
    ]),
  ];

  return {
    alternates: {
      canonical,
    },
    authors: article.frontmatter.author
      ? [{ name: article.frontmatter.author }]
      : [{ name: siteConfig.name }],
    description,
    keywords,
    openGraph: {
      description,
      locale: siteConfig.locale,
      publishedTime: article.frontmatter.publishedAt,
      siteName: siteConfig.name,
      tags,
      title,
      type: "article",
      url: canonical,
    },
    title,
    twitter: createTwitterMetadata({ description, title }),
  };
}
