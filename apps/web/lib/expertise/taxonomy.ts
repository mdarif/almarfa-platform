/**
 * Expertise taxonomy — semantic authority clusters for the platform.
 *
 * Single source of truth for expertise slugs, editorial copy, metadata,
 * and cross-topic relationships. Services and navigation derive from here.
 */

export const EXPERTISE_SLUGS = [
  "frontend-architecture",
  "design-systems",
  "storybook-ecosystems",
  "nx-monorepos",
  "frontend-governance",
  "platform-engineering",
  "developer-experience-engineering",
  "angular-enterprise-patterns",
] as const;

export type ExpertiseSlug = (typeof EXPERTISE_SLUGS)[number];

export type ExpertiseDefinition = {
  slug: ExpertiseSlug;
  label: string;
  shortDescription: string;
  overview: string;
  positioning: string;
  practice: string;
  rationale: string;
  semanticKeywords: readonly string[];
  relatedExpertise: readonly ExpertiseSlug[];
  hasServiceOffering: boolean;
  serviceDescription?: string;
};

export const EXPERTISE_BY_SLUG: Record<ExpertiseSlug, ExpertiseDefinition> = {
  "frontend-architecture": {
    slug: "frontend-architecture",
    label: "Frontend Architecture",
    shortDescription: "Scalable systems thinking for frontend platforms",
    overview:
      "Frontend systems that scale require clear architectural thinking before they require more frameworks or tools.",
    positioning:
      "Enterprise frontend platforms need explicit boundaries, shared libraries, and ownership models that keep multiple teams aligned without centralizing every decision.",
    practice:
      "This means establishing package boundaries, defining reusable libraries, and creating clear ownership models that allow multiple teams to contribute without losing coherence.",
    rationale:
      "When architecture is unclear, teams duplicate work, create conflicting patterns, and struggle to share code. Clear architecture makes it possible for teams to move faster together.",
    semanticKeywords: [
      "frontend architecture",
      "platform boundaries",
      "scalable frontend systems",
      "enterprise frontend",
    ],
    relatedExpertise: [
      "platform-engineering",
      "frontend-governance",
      "nx-monorepos",
    ],
    hasServiceOffering: true,
    serviceDescription:
      "Designing frontend systems that support multiple teams, delivery streams, and product surfaces without losing architectural coherence.",
  },
  "design-systems": {
    slug: "design-systems",
    label: "Design Systems",
    shortDescription: "Shared UI foundations and component governance",
    overview:
      "Shared UI foundations work best when components, documentation, and release practices evolve together.",
    positioning:
      "A mature design system is an operating model — not only a component library — with ownership, adoption paths, and governance that teams can trust.",
    practice:
      "Rather than only building components, a mature design system includes clear ownership, governance, adoption practices, and organizational thinking that makes shared UI reliable.",
    rationale:
      "Teams trust shared components when they are well-documented, accessible, released reliably, and designed with real delivery constraints in mind.",
    semanticKeywords: [
      "design systems",
      "component governance",
      "shared UI",
      "design tokens",
    ],
    relatedExpertise: [
      "storybook-ecosystems",
      "frontend-governance",
      "frontend-architecture",
    ],
    hasServiceOffering: true,
    serviceDescription:
      "Building shared UI foundations with clear ownership, durable primitives, documentation, and adoption paths that teams can trust.",
  },
  "storybook-ecosystems": {
    slug: "storybook-ecosystems",
    label: "Storybook Ecosystems",
    shortDescription: "Component documentation as platform infrastructure",
    overview:
      "Storybook becomes platform infrastructure when it serves as a contract for component behavior, accessibility, and visual states.",
    positioning:
      "Storybook should behave like governed frontend infrastructure — not a loose gallery — when organizations need shared UI decisions to compound.",
    practice:
      "Beyond documentation, Storybook can enforce component contracts, facilitate design system governance, enable accessibility review, and create shared understanding across disciplines.",
    rationale:
      "When Storybook is treated as governed infrastructure, it enforces quality, reduces regressions, and makes system changes safer across teams.",
    semanticKeywords: [
      "storybook governance",
      "component contracts",
      "visual regression",
      "design system documentation",
    ],
    relatedExpertise: [
      "design-systems",
      "frontend-governance",
      "developer-experience-engineering",
    ],
    hasServiceOffering: true,
    serviceDescription:
      "Treating Storybook as governed platform infrastructure for component contracts, visual states, accessibility review, and shared understanding.",
  },
  "nx-monorepos": {
    slug: "nx-monorepos",
    label: "Nx Monorepos",
    shortDescription: "Scalable workspace structure and boundaries",
    overview:
      "Nx workspaces scale when they are structured around explicit boundaries, clear dependency rules, and understandable delivery workflows.",
    positioning:
      "Monorepo structure is an architecture decision. Nx becomes valuable when boundaries, libraries, and delivery paths remain legible as the workspace grows.",
    practice:
      "This means organizing libraries intentionally, enforcing architectural boundaries with lint rules, and creating clear mental models for how code is organized and deployed.",
    rationale:
      "Without intentional structure, monorepos become tangled, slow, and difficult to navigate. Clear boundaries make monorepos powerful at enterprise scale.",
    semanticKeywords: [
      "nx monorepo",
      "workspace boundaries",
      "monorepo architecture",
      "frontend platform structure",
    ],
    relatedExpertise: [
      "frontend-architecture",
      "platform-engineering",
      "developer-experience-engineering",
    ],
    hasServiceOffering: true,
    serviceDescription:
      "Structuring Nx workspaces around explicit boundaries, reusable libraries, and delivery workflows that remain understandable as systems grow.",
  },
  "frontend-governance": {
    slug: "frontend-governance",
    label: "Frontend Governance",
    shortDescription: "Sustainable standards and review practices",
    overview:
      "Frontend governance should make good decisions easier to repeat, not create bureaucracy.",
    positioning:
      "Governance is most effective when it clarifies ownership, standards, and change control for shared frontend systems — without slowing delivery.",
    practice:
      "Effective governance means clear standards, consistent review practices, and decision frameworks that help teams move faster with more confidence.",
    rationale:
      "Governance becomes valuable when it removes uncertainty and makes the right decision obvious. When it only creates friction, it fails.",
    semanticKeywords: [
      "frontend governance",
      "engineering standards",
      "architecture review",
      "change control",
    ],
    relatedExpertise: [
      "frontend-architecture",
      "design-systems",
      "storybook-ecosystems",
    ],
    hasServiceOffering: true,
    serviceDescription:
      "Establishing review models, standards, and change practices that keep shared frontend systems reliable over time.",
  },
  "platform-engineering": {
    slug: "platform-engineering",
    label: "Platform Engineering",
    shortDescription: "Developer-focused infrastructure and capabilities",
    overview:
      "Frontend platform engineering creates capabilities that reduce repeated decisions and help product teams move with confidence.",
    positioning:
      "Platform work succeeds when abstractions, tooling, and conventions let product teams focus on features while architectural intent survives delivery pressure.",
    practice:
      "Platform engineering means providing abstractions, tooling, and conventions that let product teams focus on features rather than infrastructure decisions.",
    rationale:
      "When platform capabilities mature, product teams move faster, systems remain coherent, and architectural intent survives feature delivery pressure.",
    semanticKeywords: [
      "frontend platform engineering",
      "developer platform",
      "internal frontend platform",
      "platform capabilities",
    ],
    relatedExpertise: [
      "developer-experience-engineering",
      "frontend-architecture",
      "nx-monorepos",
    ],
    hasServiceOffering: true,
    serviceDescription:
      "Creating frontend platform capabilities that reduce repeated decisions and help product teams move with more confidence.",
  },
  "developer-experience-engineering": {
    slug: "developer-experience-engineering",
    label: "Developer Experience Engineering",
    shortDescription: "Workflows, conventions, and feedback loops",
    overview:
      "Developer experience is the quality of the workflows and feedback loops that shape how engineers build and ship systems.",
    positioning:
      "DX engineering connects local development, testing, documentation, and release feedback into a coherent system that compounds team judgment.",
    practice:
      "This includes build performance, local development setup, testing workflows, documentation, and the feedback loops that help engineers make good decisions.",
    rationale:
      "Great developer experience compounds: faster feedback means better decisions, faster learning, and faster delivery across the platform.",
    semanticKeywords: [
      "developer experience",
      "frontend workflows",
      "engineering feedback loops",
      "platform DX",
    ],
    relatedExpertise: [
      "platform-engineering",
      "nx-monorepos",
      "storybook-ecosystems",
    ],
    hasServiceOffering: true,
    serviceDescription:
      "Improving the workflows, conventions, and feedback loops that shape how engineers build, test, document, and ship frontend systems.",
  },
  "angular-enterprise-patterns": {
    slug: "angular-enterprise-patterns",
    label: "Angular Enterprise Patterns",
    shortDescription: "Scaling Angular in enterprise contexts",
    overview:
      "Angular scales in enterprise contexts when architectural and organizational thinking align with the framework's strengths.",
    positioning:
      "Angular's opinions become an advantage when module boundaries, dependency injection, and shared patterns are designed for long-lived enterprise systems.",
    practice:
      "This means leveraging Angular's strong opinions, dependency injection system, and module organization to create scalable, maintainable systems.",
    rationale:
      "Angular's architectural bias becomes an advantage in large organizations where consistency and shared patterns matter more than framework novelty.",
    semanticKeywords: [
      "angular enterprise",
      "angular architecture",
      "enterprise angular patterns",
      "frontend scalability",
    ],
    relatedExpertise: [
      "frontend-architecture",
      "frontend-governance",
      "platform-engineering",
    ],
    hasServiceOffering: false,
  },
};

export const EXPERTISE_LIST = EXPERTISE_SLUGS.map((slug) => EXPERTISE_BY_SLUG[slug]);

export const EXPERTISE_NAVIGATION_GROUPS = [
  {
    label: "Architecture",
    slugs: ["frontend-architecture", "design-systems"] as const,
  },
  {
    label: "Platforms",
    slugs: [
      "storybook-ecosystems",
      "nx-monorepos",
      "frontend-governance",
    ] as const,
  },
  {
    label: "Operations",
    slugs: [
      "platform-engineering",
      "developer-experience-engineering",
      "angular-enterprise-patterns",
    ] as const,
  },
] satisfies readonly {
  label: string;
  slugs: readonly ExpertiseSlug[];
}[];

/** @deprecated Use EXPERTISE_BY_SLUG — retained for existing imports */
export const AUTHORITY_CLUSTERS = {
  FRONTEND_ARCHITECTURE: pickCluster("frontend-architecture"),
  DESIGN_SYSTEMS: pickCluster("design-systems"),
  STORYBOOK_ECOSYSTEMS: pickCluster("storybook-ecosystems"),
  NX_MONOREPOS: pickCluster("nx-monorepos"),
  FRONTEND_GOVERNANCE: pickCluster("frontend-governance"),
  PLATFORM_ENGINEERING: pickCluster("platform-engineering"),
  DEVELOPER_EXPERIENCE_ENGINEERING: pickCluster("developer-experience-engineering"),
  ANGULAR_ENTERPRISE_PATTERNS: pickCluster("angular-enterprise-patterns"),
} as const;

export type AuthorityClusterId = keyof typeof AUTHORITY_CLUSTERS;

export const AUTHORITY_CLUSTER_VALUES = Object.values(AUTHORITY_CLUSTERS);

export const EXPERTISE_AREAS = EXPERTISE_LIST.filter((area) => area.hasServiceOffering).map(
  (area) => ({
    id: `${area.slug}-services`,
    title: area.label,
    description: area.serviceDescription ?? area.shortDescription,
    clusters: [area.slug],
    slug: area.slug,
  }),
);

export const CONTENT_RELATIONSHIPS = {
  RELATED_INSIGHTS: "related-insights",
  RELATED_EXPERTISE: "related-expertise",
  RELATED_SERVICES: "related-services",
  CLUSTER_CONTENT: "cluster-content",
} as const;

export const PLATFORM_POSITIONING = {
  tagline:
    "Enterprise frontend architecture authority. Semantic engineering for scalable platforms.",
  description:
    "Al Marfa focuses on the architectural and governance thinking that sustainable frontend systems require.",
  authority_areas: EXPERTISE_LIST.map((area) => area.label),
} as const;

export const NAVIGATION = {
  primary: [
    { label: "Services", href: "/services" },
    { label: "Expertise", href: "/expertise" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as const,
  expertise: EXPERTISE_LIST.map((area) => ({
    label: area.label,
    href: `/expertise/${area.slug}`,
    description: area.shortDescription,
  })),
} as const;

function pickCluster(slug: ExpertiseSlug) {
  const area = EXPERTISE_BY_SLUG[slug];
  return {
    id: area.slug,
    label: area.label,
    description: area.shortDescription,
    slug: area.slug,
  };
}
