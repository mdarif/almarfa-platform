import { createPageMetadata } from "@repo/seo";
import { Body, Caption, Container, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AUTHORITY_CLUSTERS, getAuthorityCluster } from "@/lib/platform";
import { Breadcrumb } from "@/components/navigation";

type Params = {
  slug: string;
};

/**
 * Generate metadata for cluster pages
 */
export function generateMetadata({ params }: { params: Params }) {
  const cluster = getAuthorityCluster(params.slug);

  if (!cluster) {
    return createPageMetadata({
      title: "Not found",
      pathname: `/expertise/${params.slug}`,
    });
  }

  return createPageMetadata({
    title: cluster.label,
    description: cluster.description,
    pathname: `/expertise/${params.slug}`,
  });
}

/**
 * Generate static params for all clusters
 */
export function generateStaticParams() {
  return Object.values(AUTHORITY_CLUSTERS).map((cluster) => ({
    slug: cluster.slug,
  }));
}

interface ExpertiseClusterPageProps {
  params: Params;
}

export default function ExpertiseClusterPage({ params }: ExpertiseClusterPageProps) {
  // Find cluster by slug
  const cluster = Object.values(AUTHORITY_CLUSTERS).find(
    (c) => c.slug === params.slug
  );

  if (!cluster) {
    notFound();
  }

  return (
    <main>
      <HeaderSection cluster={cluster} />
      <ContentSection cluster={cluster} />
      <RelatedSection />
    </main>
  );
}

/**
 * Header with breadcrumb and title
 */
function HeaderSection({
  cluster,
}: {
  cluster: (typeof AUTHORITY_CLUSTERS)[keyof typeof AUTHORITY_CLUSTERS];
}) {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg">
          <Breadcrumb
            items={[
              { label: "Expertise", href: "/expertise" },
              { label: cluster.label, isActive: true },
            ]}
          />

          <Stack gap="lg" className="max-w-measure-wide">
            <Caption tone="accent">Expertise</Caption>
            <Heading>{cluster.label}</Heading>
            <Body size="large">{cluster.description}</Body>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Main content section explaining the cluster
 */
function ContentSection({
  cluster,
}: {
  cluster: (typeof AUTHORITY_CLUSTERS)[keyof typeof AUTHORITY_CLUSTERS];
}) {
  // Content descriptions for each cluster
  const clusterContent: Record<
    string,
    { overview: string; whatItMeans: string; whyItMatters: string }
  > = {
    "frontend-architecture": {
      overview:
        "Frontend systems that scale require clear architectural thinking before they require more frameworks or tools.",
      whatItMeans:
        "This means establishing explicit package boundaries, defining reusable libraries, and creating clear ownership models that allow multiple teams to contribute without losing coherence.",
      whyItMatters:
        "When architecture is unclear, teams duplicate work, create conflicting patterns, and struggle to share code. Clear architecture makes it possible for teams to move faster together.",
    },
    "design-systems": {
      overview:
        "Shared UI foundations work best when components, documentation, and release practices evolve together.",
      whatItMeans:
        "Rather than just building a component library, a mature design system includes clear ownership, governance, adoption practices, and the organizational thinking that makes components reliable.",
      whyItMatters:
        "Teams trust shared components when they're well-documented, accessible, released reliably, and designed with real constraints in mind.",
    },
    storybook: {
      overview:
        "Storybook becomes platform infrastructure when it serves as a contract for component behavior, accessibility, and visual states.",
      whatItMeans:
        "Beyond documentation, Storybook can enforce component contracts, facilitate design system governance, enable accessibility review, and create shared understanding across disciplines.",
      whyItMatters:
        "When Storybook is treated as governed infrastructure, it becomes a powerful tool for enforcing quality, reducing bugs, and making system changes safer.",
    },
    "nx-monorepos": {
      overview:
        "Nx workspaces scale when they're structured around explicit boundaries, clear dependency rules, and understandable delivery workflows.",
      whatItMeans:
        "This means organizing libraries intentionally, enforcing architectural boundaries with lint rules, and creating clear mental models for how code is organized and deployed.",
      whyItMatters:
        "Without intentional structure, monorepos become tangled, slow, and difficult to navigate. Clear boundaries make monorepos powerful.",
    },
    governance: {
      overview:
        "Frontend governance should make good decisions easier to repeat, not create bureaucracy.",
      whatItMeans:
        "Effective governance means clear standards, consistent review practices, and decision frameworks that help teams move faster with more confidence.",
      whyItMatters:
        "Governance becomes valuable when it removes uncertainty and makes it easier to make the right decision. When it creates friction, it fails.",
    },
    "platform-engineering": {
      overview:
        "Frontend platform engineering creates capabilities that reduce repeated decisions and help product teams move with confidence.",
      whatItMeans:
        "Platform engineering means providing abstractions, tooling, and conventions that let product teams focus on features rather than infrastructure decisions.",
      whyItMatters:
        "When platform capabilities mature, product teams move faster, systems remain coherent, and architectural intent survives feature delivery pressure.",
    },
    "dx-engineering": {
      overview:
        "Developer experience is the quality of the workflows and feedback loops that shape how engineers build and ship systems.",
      whatItMeans:
        "This includes build performance, local development setup, testing workflows, documentation, and the feedback loops that help engineers make good decisions.",
      whyItMatters:
        "Great developer experience compounds: faster feedback means better decisions, faster learning, and faster delivery.",
    },
    "angular-enterprise": {
      overview:
        "Angular scales in enterprise contexts when architectural and organizational thinking align with the framework's strengths.",
      whatItMeans:
        "This means leveraging Angular's strong opinions, dependency injection system, and module organization to create scalable, maintainable systems.",
      whyItMatters:
        "Angular's architectural bias becomes an advantage in large organizations where consistency and shared patterns matter.",
    },
  };

  const content = clusterContent[cluster.slug] || {
    overview: cluster.description,
    whatItMeans: "Understanding this domain deeply.",
    whyItMatters: "This matters for sustainable systems.",
  };

  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="4xl">
          {/* Overview */}
          <Stack gap="lg">
            <Caption tone="accent">Overview</Caption>
            <Body size="large" measure="content">
              {content.overview}
            </Body>
          </Stack>

          {/* What it means */}
          <Stack gap="lg">
            <Heading as="h2" size="sm">
              What this means in practice
            </Heading>
            <Body measure="content">{content.whatItMeans}</Body>
          </Stack>

          {/* Why it matters */}
          <Stack gap="lg">
            <Heading as="h2" size="sm">
              Why this matters
            </Heading>
            <Body measure="content">{content.whyItMatters}</Body>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Related content - links to other expertise areas and services
 */
function RelatedSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <div className="border-t border-border pt-rhythm-lg">
          <Stack gap="lg">
            <Heading as="h3">Related</Heading>
            <Stack gap="md">
              <div>
                <Body className="mb-rhythm-sm font-medium">More Expertise Areas</Body>
                <Link href="/expertise" className="text-accent hover:opacity-75 transition-opacity">
                  View all expertise clusters →
                </Link>
              </div>
              <div>
                <Body className="mb-rhythm-sm font-medium">Services</Body>
                <Link href="/services" className="text-accent hover:opacity-75 transition-opacity">
                  See our service offerings →
                </Link>
              </div>
              <div>
                <Body className="mb-rhythm-sm font-medium">Insights</Body>
                <Link href="/insights" className="text-accent hover:opacity-75 transition-opacity">
                  Read implementation patterns and articles →
                </Link>
              </div>
            </Stack>
          </Stack>
        </div>
      </Container>
    </Section>
  );
}
