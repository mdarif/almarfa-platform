import { getArticleCollection } from "@repo/content";
import {
  createArticleSitemapEntries,
  createExpertiseSitemapEntries,
  createStaticSitemapEntries,
} from "@repo/seo";
import type { MetadataRoute } from "next";

import { getAllExpertiseSlugs } from "@/lib/expertise";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticleCollection("insights");

  return [
    ...createStaticSitemapEntries(),
    ...createExpertiseSitemapEntries(getAllExpertiseSlugs()),
    ...createArticleSitemapEntries(articles),
  ];
}
