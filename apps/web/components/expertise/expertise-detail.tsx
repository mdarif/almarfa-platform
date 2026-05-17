import { createCanonicalUrl, createExpertiseSchema } from "@repo/seo";
import { Body, Container, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

import { JsonLdScript } from "@/app/_components/json-ld";
import { RelatedTopicsSection } from "@/components/content";
import {
  EditorialContinueSection,
  EditorialSectionIntro,
  PageEditorialHero,
} from "@/components/editorial";
import { Breadcrumb } from "@/components/navigation";
import type { ExpertiseDefinition } from "@/lib/expertise";
import {
  getExpertisePath,
  getInsightsForExpertise,
  getRelatedExpertise,
} from "@/lib/expertise";

type ExpertiseDetailProps = {
  area: ExpertiseDefinition;
};

export function ExpertiseDetail({ area }: ExpertiseDetailProps) {
  const relatedExpertise = getRelatedExpertise(area.slug);
  const relatedInsights = getInsightsForExpertise(area.slug);
  const breadcrumbs = [
    { name: "Expertise", url: createCanonicalUrl("/expertise") },
    { name: area.label, url: createCanonicalUrl(getExpertisePath(area.slug)) },
  ];

  return (
    <main>
      <JsonLdScript data={createExpertiseSchema(area, breadcrumbs)} />

      <PageEditorialHero
        variant="detail"
        atmosphere="expertise"
        eyebrow="Expertise"
        title={area.label}
        description={area.shortDescription}
        showGrid={false}
        prepend={
          <Breadcrumb
            items={[
              { label: "Expertise", href: "/expertise" },
              { label: area.label, isActive: true },
            ]}
          />
        }
      />

      <Section spacing="default" surface="raised" className="!pt-rhythm-lg">
        <Container size="content">
          <Stack gap="lg">
            <EditorialSectionIntro eyebrow="Overview" density="compact">
              <Body size="large" measure="content">
                {area.overview}
              </Body>
            </EditorialSectionIntro>

            <Stack gap="md" className="border-t border-border pt-rhythm-lg">
              <Heading as="h2" size="section">
                Architectural positioning
              </Heading>
              <Body measure="content">{area.positioning}</Body>
            </Stack>

            <Stack gap="md" className="border-t border-border pt-rhythm-lg">
              <Heading as="h2" size="section">
                What this means in practice
              </Heading>
              <Body measure="content">{area.practice}</Body>
            </Stack>

            <Stack gap="md" className="border-t border-border pt-rhythm-lg">
              <Heading as="h2" size="section">
                Why this matters
              </Heading>
              <Body measure="content">{area.rationale}</Body>
            </Stack>
          </Stack>
        </Container>
      </Section>

      {relatedInsights.length > 0 ? (
        <RelatedTopicsSection
          title="Related insights"
          topics={relatedInsights.map((article) => ({
            id: article.slug,
            title: article.frontmatter.title,
            description: article.frontmatter.description,
            href: `/insights/${article.slug}`,
            type: "insight",
            cluster: area.slug,
          }))}
        />
      ) : null}

      <EditorialContinueSection
        relatedItems={relatedExpertise.map((related) => ({
          href: getExpertisePath(related.slug),
          title: related.label,
          description: related.shortDescription,
        }))}
      >
        {area.hasServiceOffering ? (
          <Body measure="content">
            This expertise area informs our{" "}
            <Link
              href="/services"
              className="text-accent hover:opacity-75 transition-opacity"
            >
              architecture advisory services
            </Link>
            .
          </Body>
        ) : null}
        <Body measure="content">
          <Link
            href="/insights"
            className="text-accent hover:opacity-75 transition-opacity"
          >
            Read implementation insights
          </Link>
          {" · "}
          <Link
            href="/expertise"
            className="text-accent hover:opacity-75 transition-opacity"
          >
            View all expertise areas
          </Link>
        </Body>
      </EditorialContinueSection>
    </main>
  );
}
