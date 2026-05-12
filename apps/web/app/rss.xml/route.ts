import { getArticleCollection } from "@repo/content";
import { createInsightsRssFeed } from "@repo/seo";

export const dynamic = "force-static";

export function GET() {
  const feed = createInsightsRssFeed(getArticleCollection("insights"));

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
