/**
 * Platform taxonomy — re-exported from the expertise module.
 *
 * @see ./expertise/taxonomy.ts for definitions and relationships.
 */

import {
  AUTHORITY_CLUSTERS,
  EXPERTISE_AREAS,
} from "./expertise";

export {
  AUTHORITY_CLUSTERS,
  AUTHORITY_CLUSTER_VALUES,
  CONTENT_RELATIONSHIPS,
  EXPERTISE_AREAS,
  EXPERTISE_BY_SLUG,
  EXPERTISE_LIST,
  EXPERTISE_SLUGS,
  NAVIGATION,
  PLATFORM_POSITIONING,
  type AuthorityClusterId,
  type ExpertiseDefinition,
  type ExpertiseSlug,
  getExpertiseBySlug,
  getInsightsForExpertise,
  getRelatedExpertise,
  isExpertiseSlug,
} from "./expertise";

/**
 * Get an authority cluster by slug or legacy id.
 */
export function getAuthorityCluster(id: string) {
  return Object.values(AUTHORITY_CLUSTERS).find(
    (cluster) => cluster.id === id || cluster.slug === id,
  );
}

/**
 * Get expertise area by service id.
 */
export function getExpertiseArea(id: string) {
  return EXPERTISE_AREAS.find((area) => area.id === id);
}

/**
 * Get all clusters for an expertise area.
 */
export function getExpertiseAreaClusters(id: string) {
  const area = getExpertiseArea(id);
  if (!area) return [];

  return area.clusters
    .map((clusterId) => getAuthorityCluster(clusterId))
    .filter(Boolean);
}
