/* eslint-env node */
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const generateFlag = "--generate";

if (!process.argv.includes(generateFlag)) {
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", scriptPath, generateFlag],
    { stdio: "inherit" },
  );

  process.exit(result.status ?? 1);
}

const content = await import("@repo/content");
const seo = await import("@repo/seo");
const expertise = await import("../lib/expertise/article-clusters.ts");

const contentExports = content.default ?? content;
const seoExports = seo.default ?? seo;
const expertiseExports = expertise.default ?? expertise;

const { getArticleCollection } = contentExports;
const { createInsightsRssFeed } = seoExports;
const { getArticleClusterLabels } = expertiseExports;

const root = dirname(scriptPath);
const outputPath = join(root, "../public/rss.xml");

const articles = getArticleCollection("insights");
const feed = createInsightsRssFeed(
  articles.map((article) => ({
    article,
    categories: getArticleClusterLabels(article),
  })),
);

writeFileSync(outputPath, feed, "utf8");
console.log(`Generated ${outputPath}`);
