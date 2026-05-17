import { getArticleCollection, formatArticleDate } from "@repo/content";
import { createPageMetadata, siteConfig } from "@repo/seo";
import { Body, Caption, Container, Grid, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

import { ArticleExpertiseLinks } from "@/components/content";
import { HeroSection } from "@/components/sections/hero";
import { EXPERTISE_LIST, getExpertisePath } from "@/lib/expertise";

export const metadata = createPageMetadata({
  description:
    "Enterprise frontend architecture, design systems, Storybook governance, and shared UI platform strategy.",
  pathname: "/",
});

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
            {EXPERTISE_LIST.map((area) => (
              <li className="border-b border-border py-rhythm-lg" key={area.slug}>
                <Grid columns="two" gap="lg">
                  <Link href={getExpertisePath(area.slug)} className="group">
                    <Heading
                      as="h3"
                      className="text-[clamp(1.375rem,2.5vw,2rem)] group-hover:text-accent transition-colors"
                      measure="narrow"
                    >
                      {area.label}
                    </Heading>
                  </Link>
                  <Body measure="content">
                    {area.serviceDescription ?? area.shortDescription}
                  </Body>
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

              <ArticleExpertiseLinks article={article} />

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
            href={`mailto:${siteConfig.contactEmail}`}
          >
            {siteConfig.contactEmail}
          </Link>
        </Stack>
      </Container>
    </Section>
  );
}
