import { getArticleCollection, formatArticleDate } from "@repo/content";
import { createPageMetadata, siteConfig } from "@repo/seo";
import { Body, Caption, Container, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

import { ArticleExpertiseLinks } from "@/components/content";
import {
  EditorialSectionIntro,
  EditorialSignatureSection,
} from "@/components/editorial";
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
      <EditorialSignatureSection principles={platformPrinciples} />
      {featuredInsight ? (
        <InsightsPreviewSection article={featuredInsight} />
      ) : null}
      <ContactSection />
    </main>
  );
}

function ExpertiseAreasSection() {
  return (
    <Section spacing="default" surface="editorial">
      <Container size="content">
        <Stack gap="xl">
          <Stack gap="md" className="max-w-measure-wide">
            <Stack gap="xs">
              <span aria-hidden className="editorial-anchor-line" />
              <Caption tone="accent">Expertise Areas</Caption>
            </Stack>
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
              <li
                className="border-b border-border py-rhythm-md md:py-rhythm-lg"
                key={area.slug}
              >
                <div className="flex flex-col gap-rhythm-sm md:grid md:grid-cols-2 md:gap-grid-lg">
                  <Link href={getExpertisePath(area.slug)} className="group">
                    <Heading
                      as="h3"
                      className="transition-colors group-hover:text-accent"
                      measure="narrow"
                      size="list"
                    >
                      {area.label}
                    </Heading>
                  </Link>
                  <Body measure="content">
                    {area.serviceDescription ?? area.shortDescription}
                  </Body>
                </div>
              </li>
            ))}
          </ol>
        </Stack>
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
          <EditorialSectionIntro eyebrow="Insights Preview">
            <Heading>
              Engineering Atlas notes for frontend platform teams.
            </Heading>
            <Body size="large">
              The publication layer is designed for architectural depth:
              implementation context, governance tradeoffs, and practical
              operating models.
            </Body>
          </EditorialSectionIntro>

          <article className="border-y border-border py-rhythm-lg">
            <Stack gap="sm">
              <Caption>
                {article.frontmatter.category} /{" "}
                <time dateTime={article.frontmatter.publishedAt}>
                  {formatArticleDate(article.frontmatter.publishedAt)}
                </time>
              </Caption>

              <ArticleExpertiseLinks article={article} />

              <Heading as="h3" measure="content" size="list">
                <Link
                  className="transition-colors hover:text-accent"
                  href={`/insights/${article.slug}`}
                >
                  {article.frontmatter.title}
                </Link>
              </Heading>

              <Body measure="content">{article.frontmatter.description}</Body>

              <Link
                className="editorial-link mt-rhythm-sm inline-flex w-fit text-sm font-medium no-underline hover:underline"
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
    <Section spacing="default">
      <Container size="content">
        <EditorialSectionIntro eyebrow="Contact">
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
            className="editorial-link mt-rhythm-sm inline-flex w-fit text-sm font-medium no-underline hover:underline"
            href={`mailto:${siteConfig.contactEmail}`}
          >
            {siteConfig.contactEmail}
          </Link>
        </EditorialSectionIntro>
      </Container>
    </Section>
  );
}
