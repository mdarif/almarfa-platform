/**
 * Related Topics & Content
 * 
 * Semantic content linking system that supports:
 * - Related insights
 * - Expertise area connections
 * - Authority cluster reinforcement
 * - Editorial navigation rhythm
 */

import Link from "next/link";
import { Container, Section, Stack, Heading, Body } from "@repo/ui";
import { getAuthorityCluster } from "@/lib/platform";

/**
 * Related Topic Item
 */
export interface RelatedTopic {
  id: string;
  title: string;
  description?: string;
  href: string;
  type?: "insight" | "expertise" | "service";
  cluster?: string;
}

/**
 * Related Topics Card Component
 */
interface RelatedTopicCardProps {
  topic: RelatedTopic;
}

function RelatedTopicCard({ topic }: RelatedTopicCardProps) {
  const cluster = topic.cluster ? getAuthorityCluster(topic.cluster) : null;

  return (
    <Link
      href={topic.href}
      className="group block p-rhythm-lg border border-border/30 rounded-sm hover:border-border/60 hover:bg-surface/50 transition-colors"
    >
      <Stack gap="sm">
        {cluster && (
          <p className="text-xs font-medium text-text/60 group-hover:text-text/75 transition-colors uppercase tracking-wider">
            {cluster.label}
          </p>
        )}
        <h3 className="text-sm font-semibold group-hover:text-accent transition-colors line-clamp-2">
          {topic.title}
        </h3>
        {topic.description && (
          <p className="text-xs text-text/60 line-clamp-2">
            {topic.description}
          </p>
        )}
      </Stack>
    </Link>
  );
}

/**
 * Related Topics Section
 * Displays 2-4 related pieces of content
 */
interface RelatedTopicsSectionProps {
  title?: string;
  topics: RelatedTopic[];
  className?: string;
}

export function RelatedTopicsSection({
  title = "Related Insights",
  topics,
  className = "",
}: RelatedTopicsSectionProps) {
  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <Section spacing="lg" className={className}>
      <Container size="content">
        <Stack gap="lg">
          <Heading as="h3" size="sm">
            {title}
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {topics.slice(0, 4).map((topic) => (
              <RelatedTopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Related Cluster Topics
 * Shows other insights in the same authority cluster
 */
interface RelatedClusterTopicsProps {
  clusterId: string;
  currentArticleId?: string;
  maxItems?: number;
}

export function RelatedClusterTopics({
  clusterId,
  currentArticleId,
  maxItems = 3,
}: RelatedClusterTopicsProps) {
  const cluster = getAuthorityCluster(clusterId);

  if (!cluster) {
    return null;
  }

  // This would be populated by actual content data
  // For now, showing the structure
  const relatedTopics: RelatedTopic[] = [
    {
      id: "placeholder-1",
      title: `More on ${cluster.label}`,
      description: "Exploring related topics in this authority cluster",
      href: `/expertise/${cluster.slug}`,
      cluster: clusterId,
    },
  ];

  return (
    <RelatedTopicsSection
      title={`More on ${cluster.label}`}
      topics={relatedTopics}
    />
  );
}

/**
 * Expertise Context Card
 * Shows which expertise area an article relates to
 */
interface ExpertiseContextProps {
  title: string;
  description: string;
  href: string;
}

export function ExpertiseContext({
  title,
  description,
  href,
}: ExpertiseContextProps) {
  return (
    <Link
      href={href}
      className="group block border border-border/30 p-rhythm-lg rounded-sm hover:border-border/60 hover:bg-surface/50 transition-colors"
    >
      <Stack gap="sm">
        <h3 className="text-sm font-semibold group-hover:text-accent transition-colors">
          {title}
        </h3>
        <Body size="small" tone="secondary">
          {description}
        </Body>
      </Stack>
    </Link>
  );
}
