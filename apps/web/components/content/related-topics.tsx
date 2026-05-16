/**
 * Related topics — editorial semantic linking (insights, expertise, services).
 */

import Link from "next/link";
import { Container, Section, Stack, Heading, Body, Caption } from "@repo/ui";

import { getExpertiseBySlug } from "@/lib/expertise";

export interface RelatedTopic {
  id: string;
  title: string;
  description?: string;
  href: string;
  type?: "insight" | "expertise" | "service";
  cluster?: string;
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
          <Heading as="h2">
            {title}
          </Heading>
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
        {cluster ? (
          <Caption as="p" tone="muted">
            {cluster.label}
          </Caption>
        ) : null}
        <Link href={topic.href} className="group">
          <Heading
            as="h3"
            className="text-[clamp(1.125rem,2vw,1.5rem)] group-hover:text-accent transition-colors"
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
        <Heading as="h3" className="group-hover:text-accent transition-colors">
          {title}
        </Heading>
        <Body tone="secondary">
          {description}
        </Body>
      </Stack>
    </Link>
  );
}
