/**
 * @deprecated Import from `@/lib/expertise` instead.
 * Thin re-exports retained for documentation and legacy references.
 */

import {
  EXPERTISE_AREAS,
  getArticleClusterLabels,
  getArticleExpertiseSlugs,
  getArticleSemanticKeywords,
  getExpertiseBySlug,
  isExpertiseSlug,
  type ExpertiseSlug,
} from "./expertise";

export type { ExpertiseSlug };

export interface ArticleMetadata {
  title: string;
  description: string;
  date: string;
  author?: string;
  clusters: ExpertiseSlug[];
  relatedInsights?: string[];
  relatedExpertise?: string[];
}

export function validateArticleMetadata(
  metadata: Partial<ArticleMetadata>,
): boolean {
  if (!metadata.title || !metadata.description || !metadata.clusters) {
    return false;
  }

  return metadata.clusters.every((slug) => isExpertiseSlug(slug));
}

export function getRelatedExpertiseAreas(clusterSlugs: string[]) {
  const slugs = clusterSlugs.filter(isExpertiseSlug);

  return EXPERTISE_AREAS.filter((area) =>
    area.clusters.some((clusterId) =>
      slugs.includes(clusterId as ExpertiseSlug),
    ),
  );
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function getArticleBreadcrumbs(
  articleTitle: string,
  clusters: string[],
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: "Insights", href: "/insights" }];
  const primarySlug =
    clusters.find(isExpertiseSlug) ?? getPrimaryExpertiseSlugFromList(clusters);

  if (primarySlug) {
    const cluster = getExpertiseBySlug(primarySlug);
    if (cluster) {
      items.push({
        label: cluster.label,
        href: `/expertise/${cluster.slug}`,
      });
    }
  }

  items.push({ label: articleTitle });

  return items;
}

function getPrimaryExpertiseSlugFromList(clusters: string[]) {
  return clusters.find(isExpertiseSlug);
}

export function generateSEOMetadata(article: ArticleMetadata) {
  const slugs = article.clusters;
  const keywords = getArticleSemanticKeywordsFromSlugs(slugs);
  const clusterKeywords = slugs.map((slug) => getExpertiseBySlug(slug)!.label);

  return {
    title: article.title,
    description: article.description,
    keywords,
    clusterKeywords,
  };
}

function getArticleSemanticKeywordsFromSlugs(slugs: ExpertiseSlug[]) {
  return [
    ...new Set(
      slugs.flatMap((slug) => {
        const area = getExpertiseBySlug(slug);
        return area ? [area.label, ...area.semanticKeywords] : [];
      }),
    ),
  ];
}

export {
  getArticleClusterLabels,
  getArticleExpertiseSlugs,
  getArticleSemanticKeywords,
};

export function getClusterContext(clusterSlug: string) {
  if (!isExpertiseSlug(clusterSlug)) {
    return null;
  }

  const cluster = getExpertiseBySlug(clusterSlug);
  if (!cluster) return null;

  return {
    cluster,
    relatedExpertise: getRelatedExpertiseAreas([clusterSlug]),
  };
}
