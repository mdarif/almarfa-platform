/**
 * Related topics — editorial semantic linking (insights, expertise, services).
 */

import Link from "next/link";
import { formatArticleDate } from "@repo/content";
import { Container, Section, Stack, Heading, Body, Caption } from "@repo/ui";

import { getExpertiseBySlug } from "@/lib/expertise";

export interface RelatedTopic {
  id: string;
  title: string;
  description?: string;
  href: string;
  type?: "insight" | "expertise" | "service";
  cluster?: string;
  publishedAt?: string;
  readingTime?: string;
}

interface RelatedTopicsSectionProps {
  title?: string;
  topics: RelatedTopic[];
  className?: string;
}

export function RelatedTopicsSection({
  title = "Related insights",
  topics,
  className = "",
}: RelatedTopicsSectionProps) {
  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <Section spacing="default" className={className}>
      <Container size="content">
        <Stack gap="lg">
          <Stack gap="sm">
            <Caption tone="accent">Knowledge paths</Caption>
            <Heading as="h2">{title}</Heading>
          </Stack>
          <ol className="border-t border-border" aria-label={title}>
            {topics.slice(0, 4).map((topic) => (
              <RelatedTopicItem key={topic.id} topic={topic} />
            ))}
          </ol>
        </Stack>
      </Container>
    </Section>
  );
}

function RelatedTopicItem({ topic }: { topic: RelatedTopic }) {
  const cluster = topic.cluster ? getExpertiseBySlug(topic.cluster) : null;

  return (
    <li className="border-b border-border py-rhythm-lg">
      <Stack gap="sm">
        <RelatedTopicMeta topic={topic} clusterLabel={cluster?.label} />
        <Link href={topic.href} className="group">
          <Heading
            as="h3"
            className="text-[clamp(1.125rem,2vw,1.5rem)] transition-colors group-hover:text-accent"
          >
            {topic.title}
          </Heading>
        </Link>
        {topic.description ? (
          <Body measure="content">
            {topic.description}
          </Body>
        ) : null}
      </Stack>
    </li>
  );
}

function RelatedTopicMeta({
  clusterLabel,
  topic,
}: {
  clusterLabel?: string;
  topic: RelatedTopic;
}) {
  const parts = [
    topic.type ? relatedTopicTypeLabels[topic.type] : null,
    clusterLabel,
    topic.publishedAt ? formatArticleDate(topic.publishedAt) : null,
    topic.readingTime,
  ].filter(Boolean);

  if (parts.length === 0) {
    return null;
  }

  return (
    <Caption as="p" tone="muted">
      {parts.join(" / ")}
    </Caption>
  );
}

const relatedTopicTypeLabels: Record<NonNullable<RelatedTopic["type"]>, string> = {
  expertise: "Expertise",
  insight: "Insight",
  service: "Service",
};

interface ExpertiseContextProps {
  title: string;
  description: string;
  href: string;
}

export function ExpertiseContext({ title, description, href }: ExpertiseContextProps) {
  return (
    <Link
      href={href}
      className="group block border-t border-border pt-rhythm-lg transition-colors hover:text-accent"
    >
      <Stack gap="sm">
        <Caption tone="accent">Expertise context</Caption>
        <Heading as="h3" className="transition-colors group-hover:text-accent">
          {title}
        </Heading>
        <Body tone="secondary">
          {description}
        </Body>
      </Stack>
    </Link>
  );
}
