import { getArticleCollection } from "@repo/content";
import { createInsightsRssFeed } from "@repo/seo";

import { getArticleClusterLabels } from "@/lib/expertise";

export const dynamic = "force-static";

export function GET() {
  const articles = getArticleCollection("insights");
  const feed = createInsightsRssFeed(
    articles.map((article) => ({
      article,
      categories: getArticleClusterLabels(article),
    })),
  );

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
