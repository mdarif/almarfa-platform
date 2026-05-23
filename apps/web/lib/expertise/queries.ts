import { getArticleCollection, type ArticleSummary } from "@repo/content";

import {
  isExpertiseSlug,
  resolveArticleExpertiseSlugs,
} from "./article-clusters";
import {
  EXPERTISE_BY_SLUG,
  EXPERTISE_LIST,
  EXPERTISE_SLUGS,
  type ExpertiseDefinition,
  type ExpertiseSlug,
} from "./taxonomy";

export {
  getArticleClusterLabels,
  isExpertiseSlug,
  resolveArticleExpertiseSlugs,
} from "./article-clusters";

export type InsightsByExpertiseGroup = {
  area: ExpertiseDefinition;
  articles: ArticleSummary[];
  slug: ExpertiseSlug;
};

export function getExpertiseBySlug(
  slug: string,
): ExpertiseDefinition | undefined {
  if (!isExpertiseSlug(slug)) {
    return undefined;
  }

  return EXPERTISE_BY_SLUG[slug];
}

export function getAllExpertiseSlugs(): ExpertiseSlug[] {
  return [...EXPERTISE_SLUGS];
}

export function getRelatedExpertise(
  slug: ExpertiseSlug,
): ExpertiseDefinition[] {
  const area = EXPERTISE_BY_SLUG[slug];
  return area.relatedExpertise.map(
    (relatedSlug) => EXPERTISE_BY_SLUG[relatedSlug],
  );
}

export function getExpertisePath(slug: ExpertiseSlug): string {
  return `/expertise/${slug}`;
}

export function getArticleExpertiseSlugs(
  article: ArticleSummary,
): ExpertiseSlug[] {
  return resolveArticleExpertiseSlugs(article);
}

export function getPrimaryExpertiseSlug(
  article: ArticleSummary,
): ExpertiseSlug | undefined {
  const explicit = article.frontmatter.clusters ?? [];
  const primaryExplicit = explicit.find(isExpertiseSlug);

  if (primaryExplicit) {
    return primaryExplicit;
  }

  return resolveArticleExpertiseSlugs(article)[0];
}

export function getInsightsForExpertise(slug: ExpertiseSlug): ArticleSummary[] {
  const articles = getArticleCollection("insights");

  return articles
    .filter((article) => resolveArticleExpertiseSlugs(article).includes(slug))
    .sort(sortArticlesByDate);
}

// Ranks candidates by shared expertise cluster count (relevance), with publish
// date as the tiebreaker (most recent first). Default limit of 4 matches the
// editorial sidebar. Returns empty if the source article has no resolved clusters.
export function getRelatedInsightsForArticle(
  article: ArticleSummary,
  options: { limit?: number } = {},
): ArticleSummary[] {
  const { limit = 4 } = options;
  const sourceSlugs = new Set(resolveArticleExpertiseSlugs(article));

  if (sourceSlugs.size === 0) {
    return [];
  }

  const articles = getArticleCollection("insights");

  return articles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      article: candidate,
      overlap: countClusterOverlap(
        sourceSlugs,
        resolveArticleExpertiseSlugs(candidate),
      ),
    }))
    .filter((entry) => entry.overlap > 0)
    .sort((left, right) => {
      if (right.overlap !== left.overlap) {
        return right.overlap - left.overlap;
      }

      return (
        new Date(right.article.frontmatter.publishedAt).getTime() -
        new Date(left.article.frontmatter.publishedAt).getTime()
      );
    })
    .slice(0, limit)
    .map((entry) => entry.article);
}

export function groupInsightsByExpertise(): InsightsByExpertiseGroup[] {
  const articles = getArticleCollection("insights");

  return EXPERTISE_LIST.map((area) => ({
    area,
    slug: area.slug,
    articles: articles.filter((article) =>
      resolveArticleExpertiseSlugs(article).includes(area.slug),
    ),
  })).filter((group) => group.articles.length > 0);
}

export function getArticleSemanticKeywords(article: ArticleSummary): string[] {
  const slugs = resolveArticleExpertiseSlugs(article);

  return [
    ...new Set(
      slugs.flatMap((slug) => {
        const area = EXPERTISE_BY_SLUG[slug];
        return [area.label, ...area.semanticKeywords];
      }),
    ),
  ];
}

function countClusterOverlap(
  source: Set<ExpertiseSlug>,
  candidate: ExpertiseSlug[],
): number {
  return candidate.filter((slug) => source.has(slug)).length;
}

function sortArticlesByDate(left: ArticleSummary, right: ArticleSummary) {
  return (
    new Date(right.frontmatter.publishedAt).getTime() -
    new Date(left.frontmatter.publishedAt).getTime()
  );
}

export function getExpertiseMetadata(area: ExpertiseDefinition) {
  return {
    title: area.label,
    description: `${area.shortDescription}. ${area.overview}`,
    pathname: getExpertisePath(area.slug),
    keywords: area.semanticKeywords,
  };
}
