/**
 * Content & Article Utilities
 * 
 * Helpers for working with content metadata, relationships,
 * and semantic linking within the platform taxonomy.
 */

import { AUTHORITY_CLUSTERS, EXPERTISE_AREAS, getAuthorityCluster } from "./platform";

/**
 * Article Metadata Structure
 * For frontmatter in MDX/Markdown articles
 */
export interface ArticleMetadata {
  title: string;
  description: string;
  date: string;
  author?: string;
  // Semantic relationships
  clusters: (keyof typeof AUTHORITY_CLUSTERS)[];
  // Related content IDs
  relatedInsights?: string[];
  relatedExpertise?: string[];
}

/**
 * Validate article metadata against platform taxonomy
 */
export function validateArticleMetadata(metadata: Partial<ArticleMetadata>): boolean {
  if (!metadata.title || !metadata.description || !metadata.clusters) {
    return false;
  }

  // Verify clusters exist
  if (!Array.isArray(metadata.clusters)) {
    return false;
  }

  return metadata.clusters.every(
    (cluster) => cluster in AUTHORITY_CLUSTERS
  );
}

/**
 * Get related expertise areas for an article based on clusters
 */
export function getRelatedExpertiseAreas(clusterIds: string[]) {
  return EXPERTISE_AREAS.filter((area) =>
    area.clusters.some((clusterId) => clusterIds.includes(clusterId))
  );
}

/**
 * Get breadcrumb items for an article
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function getArticleBreadcrumbs(
  articleTitle: string,
  clusters: string[]
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: "Insights", href: "/insights" },
  ];

  // Add first cluster as category if available
  if (clusters.length > 0) {
    const cluster = getAuthorityCluster(clusters[0]);
    if (cluster) {
      items.push({
        label: cluster.label,
        href: `/insights?cluster=${cluster.slug}`,
      });
    }
  }

  // Add article title as current
  items.push({
    label: articleTitle,
  });

  return items;
}

/**
 * Get SEO metadata for an article
 */
export interface SEOArticleMetadata {
  title: string;
  description: string;
  keywords: string[];
  clusterKeywords: string[];
}

export function generateSEOMetadata(
  article: ArticleMetadata
): SEOArticleMetadata {
  const clusters = article.clusters
    .map((id) => getAuthorityCluster(id as any))
    .filter(Boolean);

  const keywords = [
    ...new Set([
      "frontend",
      "architecture",
      ...clusters.map((c) => c!.label.toLowerCase()).flat(),
    ]),
  ];

  return {
    title: article.title,
    description: article.description,
    keywords,
    clusterKeywords: clusters.map((c) => c!.label),
  };
}

/**
 * Get JSON-LD breadcrumb schema
 */
export function getBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };
}

/**
 * Get JSON-LD article schema
 */
export function getArticleSchema(
  article: ArticleMetadata,
  url: string,
  author?: string
) {
  const clusters = article.clusters
    .map((id) => getAuthorityCluster(id as any))
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: author || article.author || "Al Marfa Technologies",
    },
    keywords: clusters.map((c) => c!.label).join(", "),
    url,
  };
}

/**
 * Get authority cluster context for an article
 */
export function getClusterContext(clusterId: string) {
  const cluster = getAuthorityCluster(clusterId);
  if (!cluster) return null;

  const relatedExpertise = EXPERTISE_AREAS.filter((area) =>
    area.clusters.includes(clusterId)
  );

  return {
    cluster,
    relatedExpertise,
  };
}
