import { getArticleCollection, formatArticleDate } from "@repo/content";
import { Body, Caption, Container, Grid, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

import { HeroSection } from "@/components/sections/hero";

const expertiseAreas = [
  {
    description:
      "Designing frontend systems that can support multiple teams, delivery streams, and product surfaces without losing architectural coherence.",
    title: "Frontend Architecture",
  },
  {
    description:
      "Building shared UI foundations with clear ownership, durable primitives, documentation, and adoption paths that teams can trust.",
    title: "Design Systems",
  },
  {
    description:
      "Treating Storybook as governed platform infrastructure for component contracts, visual states, accessibility review, and shared understanding.",
    title: "Storybook Ecosystems",
  },
  {
    description:
      "Structuring Nx workspaces around explicit boundaries, reusable libraries, and delivery workflows that remain understandable as systems grow.",
    title: "Nx Monorepos",
  },
  {
    description:
      "Creating frontend platform capabilities that reduce repeated decisions and help product teams move with more confidence.",
    title: "Platform Engineering",
  },
  {
    description:
      "Establishing review models, standards, and change practices that keep shared frontend systems reliable over time.",
    title: "Frontend Governance",
  },
  {
    description:
      "Improving the workflows, conventions, and feedback loops that shape how engineers build, test, document, and ship frontend systems.",
    title: "Developer Experience Engineering",
  },
] as const;

const platformPrinciples = [
  "Scalable frontend ecosystems need clear package boundaries, shared language, and a realistic model for ownership.",
  "Governance should make good decisions easier to repeat, not create process for its own sake.",
  "Shared UI infrastructure works best when primitives, documentation, and release practices evolve together.",
  "Architectural sustainability depends on systems that teams can understand, maintain, and gradually improve.",
] as const;

export default function HomePage() {
  const [featuredInsight] = getArticleCollection("insights");

  return (
    <main>
      <HeroSection />
      <ExpertiseAreasSection />
      <PlatformThinkingSection />
      {featuredInsight ? <InsightsPreviewSection article={featuredInsight} /> : null}
      <ContactSection />
    </main>
  );
}

function ExpertiseAreasSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="xl">
          <Stack gap="md" className="max-w-measure-wide">
            <Caption tone="accent">Expertise Areas</Caption>
            <Heading>
              Frontend systems require architectural clarity before they require
              more tooling.
            </Heading>
            <Body size="large">
              Al Marfa focuses on the parts of frontend engineering where
              product delivery, shared infrastructure, and long-term governance
              meet.
            </Body>
          </Stack>

          <ol className="border-t border-border" aria-label="Expertise areas">
            {expertiseAreas.map((area) => (
              <li className="border-b border-border py-rhythm-lg" key={area.title}>
                <Grid columns="two" gap="lg">
                  <Heading
                    as="h3"
                    className="text-[clamp(1.375rem,2.5vw,2rem)]"
                    measure="narrow"
                  >
                    {area.title}
                  </Heading>
                  <Body measure="content">{area.description}</Body>
                </Grid>
              </li>
            ))}
          </ol>
        </Stack>
      </Container>
    </Section>
  );
}

function PlatformThinkingSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Grid columns="two" gap="xl">
          <Stack gap="md">
            <Caption tone="accent">Platform Thinking</Caption>
            <Heading>
              Sustainable frontend architecture is an operating model, not only a
              code structure.
            </Heading>
          </Stack>

          <Stack gap="lg">
            <Body size="large">
              Enterprise frontend platforms become effective when teams share
              more than components. They need conventions, governance, quality
              signals, and documentation that make architectural decisions
              visible.
            </Body>

            <ul className="space-y-rhythm-md" aria-label="Platform thinking principles">
              {platformPrinciples.map((principle) => (
                <li className="border-t border-border pt-rhythm-md" key={principle}>
                  <Body measure="content">{principle}</Body>
                </li>
              ))}
            </ul>
          </Stack>
        </Grid>
      </Container>
    </Section>
  );
}

function InsightsPreviewSection({
  article,
}: {
  article: ReturnType<typeof getArticleCollection>[number];
}) {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="xl">
          <Stack gap="md" className="max-w-measure-wide">
            <Caption tone="accent">Insights Preview</Caption>
            <Heading>Engineering Atlas notes for frontend platform teams.</Heading>
            <Body size="large">
              The publication layer is designed for architectural depth:
              implementation context, governance tradeoffs, and practical
              operating models.
            </Body>
          </Stack>

          <article className="border-y border-border py-rhythm-lg">
            <Stack gap="sm">
              <Caption>
                {article.frontmatter.category} /{" "}
                <time dateTime={article.frontmatter.publishedAt}>
                  {formatArticleDate(article.frontmatter.publishedAt)}
                </time>
              </Caption>

              <Heading as="h3" measure="content">
                <Link
                  className="transition-colors hover:text-accent"
                  href={`/insights/${article.slug}`}
                >
                  {article.frontmatter.title}
                </Link>
              </Heading>

              <Body measure="content">{article.frontmatter.description}</Body>

              <Link
                className="mt-rhythm-sm inline-flex w-fit text-sm font-medium text-accent underline-offset-4 hover:underline"
                href="/insights"
              >
                Read the Engineering Atlas
              </Link>
            </Stack>
          </article>
        </Stack>
      </Container>
    </Section>
  );
}

function ContactSection() {
  return (
    <Section spacing="spacious">
      <Container size="content">
        <Stack gap="md" className="max-w-measure-wide">
          <Caption tone="accent">Contact</Caption>
          <Heading>
            Discuss frontend architecture, governance, or shared UI platform
            direction.
          </Heading>
          <Body size="large">
            For engineering organizations evaluating design systems, Storybook
            governance, monorepo structure, or frontend platform strategy, Al
            Marfa can help clarify the architecture path.
          </Body>
          <Link
            className="mt-rhythm-sm inline-flex w-fit text-sm font-medium text-accent underline-offset-4 hover:underline"
            href="mailto:hello@almarfa.technology"
          >
            hello@almarfa.technology
          </Link>
        </Stack>
      </Container>
    </Section>
  );
}
