import { getArticleCollection } from "@repo/content";
import {
  createArticleSitemapEntries,
  createStaticSitemapEntries,
} from "@repo/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticleCollection("insights");

  return [
    ...createStaticSitemapEntries(),
    ...createArticleSitemapEntries(articles),
  ];
}
