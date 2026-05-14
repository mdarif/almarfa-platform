/**
 * Platform Taxonomy & Configuration
 * 
 * Defines the semantic structure of Al Marfa Technologies platform:
 * - authority clusters (semantic content groupings)
 * - expertise areas (service/knowledge domains)
 * - content types
 * - navigation structure
 * 
 * These structures support:
 * - semantic navigation
 * - cross-content linking
 * - authority accumulation
 * - discoverability architecture
 */

// ============================================================================
// Authority Clusters
// ============================================================================
// Semantic content groupings that reinforce topic authority.
// Each cluster compounds credibility through interconnected knowledge.

export const AUTHORITY_CLUSTERS = {
  FRONTEND_ARCHITECTURE: {
    id: "frontend-architecture",
    label: "Frontend Architecture",
    description: "Scalable systems thinking for frontend platforms",
    slug: "frontend-architecture",
  },
  DESIGN_SYSTEMS: {
    id: "design-systems",
    label: "Design Systems",
    description: "Shared UI foundations and component governance",
    slug: "design-systems",
  },
  STORYBOOK: {
    id: "storybook",
    label: "Storybook Ecosystems",
    description: "Component documentation as platform infrastructure",
    slug: "storybook",
  },
  NX_MONOREPOS: {
    id: "nx-monorepos",
    label: "Nx Monorepos",
    description: "Scalable workspace structure and boundaries",
    slug: "nx-monorepos",
  },
  GOVERNANCE: {
    id: "governance",
    label: "Frontend Governance",
    description: "Sustainable standards and review practices",
    slug: "governance",
  },
  PLATFORM_ENGINEERING: {
    id: "platform-engineering",
    label: "Platform Engineering",
    description: "Developer-focused infrastructure and capabilities",
    slug: "platform-engineering",
  },
  DX_ENGINEERING: {
    id: "dx-engineering",
    label: "Developer Experience Engineering",
    description: "Workflows, conventions, and feedback loops",
    slug: "dx-engineering",
  },
  ANGULAR_ENTERPRISE: {
    id: "angular-enterprise",
    label: "Angular Enterprise Patterns",
    description: "Scaling Angular in enterprise contexts",
    slug: "angular-enterprise",
  },
} as const;

export type AuthorityClusterId = keyof typeof AUTHORITY_CLUSTERS;
export const AUTHORITY_CLUSTER_VALUES = Object.values(AUTHORITY_CLUSTERS);

// ============================================================================
// Expertise Areas
// ============================================================================
// Service/knowledge domains that align with platform offerings.

export const EXPERTISE_AREAS = [
  {
    id: "frontend-architecture-services",
    title: "Frontend Architecture",
    description:
      "Designing frontend systems that can support multiple teams, delivery streams, and product surfaces without losing architectural coherence.",
    clusters: [AUTHORITY_CLUSTERS.FRONTEND_ARCHITECTURE.id],
    slug: "frontend-architecture",
  },
  {
    id: "design-systems-services",
    title: "Design Systems",
    description:
      "Building shared UI foundations with clear ownership, durable primitives, documentation, and adoption paths that teams can trust.",
    clusters: [AUTHORITY_CLUSTERS.DESIGN_SYSTEMS.id],
    slug: "design-systems",
  },
  {
    id: "storybook-services",
    title: "Storybook Ecosystems",
    description:
      "Treating Storybook as governed platform infrastructure for component contracts, visual states, accessibility review, and shared understanding.",
    clusters: [AUTHORITY_CLUSTERS.STORYBOOK.id],
    slug: "storybook",
  },
  {
    id: "nx-services",
    title: "Nx Monorepos",
    description:
      "Structuring Nx workspaces around explicit boundaries, reusable libraries, and delivery workflows that remain understandable as systems grow.",
    clusters: [AUTHORITY_CLUSTERS.NX_MONOREPOS.id],
    slug: "nx-monorepos",
  },
  {
    id: "platform-engineering-services",
    title: "Platform Engineering",
    description:
      "Creating frontend platform capabilities that reduce repeated decisions and help product teams move with more confidence.",
    clusters: [AUTHORITY_CLUSTERS.PLATFORM_ENGINEERING.id],
    slug: "platform-engineering",
  },
  {
    id: "governance-services",
    title: "Frontend Governance",
    description:
      "Establishing review models, standards, and change practices that keep shared frontend systems reliable over time.",
    clusters: [AUTHORITY_CLUSTERS.GOVERNANCE.id],
    slug: "governance",
  },
  {
    id: "dx-services",
    title: "Developer Experience Engineering",
    description:
      "Improving the workflows, conventions, and feedback loops that shape how engineers build, test, document, and ship frontend systems.",
    clusters: [AUTHORITY_CLUSTERS.DX_ENGINEERING.id],
    slug: "dx-engineering",
  },
] as const;

// ============================================================================
// Navigation Structure
// ============================================================================
// Primary navigation that reflects platform positioning.

export const NAVIGATION = {
  primary: [
    { label: "Services", href: "/services" },
    { label: "Expertise", href: "/expertise" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as const,
  
  // Secondary navigation - expertise clusters
  expertise: AUTHORITY_CLUSTER_VALUES.map((cluster) => ({
    label: cluster.label,
    href: `/expertise/${cluster.slug}`,
    description: cluster.description,
  })),
} as const;

// ============================================================================
// Content Relationship Types
// ============================================================================
// Defines how different content pieces relate to each other semantically.

export const CONTENT_RELATIONSHIPS = {
  RELATED_INSIGHTS: "related-insights",
  RELATED_EXPERTISE: "related-expertise", 
  RELATED_SERVICES: "related-services",
  CLUSTER_CONTENT: "cluster-content",
} as const;

// ============================================================================
// Platform Positioning
// ============================================================================
// Used in footer and metadata.

export const PLATFORM_POSITIONING = {
  tagline:
    "Enterprise frontend architecture authority. Semantic engineering for scalable platforms.",
  description:
    "Al Marfa focuses on the architectural and governance thinking that sustainable frontend systems require.",
  authority_areas: [
    "Frontend Architecture",
    "Design Systems",
    "Storybook Governance",
    "Monorepo Structure",
    "Frontend Governance",
    "Platform Engineering",
    "Developer Experience",
  ],
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get an authority cluster by ID
 */
export function getAuthorityCluster(
  id: string
): (typeof AUTHORITY_CLUSTERS)[AuthorityClusterId] | undefined {
  return Object.values(AUTHORITY_CLUSTERS).find((cluster) => cluster.id === id);
}

/**
 * Get expertise area by ID
 */
export function getExpertiseArea(id: string) {
  return EXPERTISE_AREAS.find((area) => area.id === id);
}

/**
 * Get all clusters for an expertise area
 */
export function getExpertiseAreaClusters(id: string) {
  const area = getExpertiseArea(id);
  if (!area) return [];
  return area.clusters
    .map((clusterId) => Object.values(AUTHORITY_CLUSTERS).find((c) => c.id === clusterId))
    .filter(Boolean);
}
