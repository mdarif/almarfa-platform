import { createCanonicalUrl, createExpertiseSchema } from "@repo/seo";
import { Body, Caption, Container, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

import { JsonLdScript } from "@/app/_components/json-ld";
import { RelatedTopicsSection } from "@/components/content";
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

      <Section spacing="default">
        <Container size="content">
          <Stack gap="lg">
            <Breadcrumb
              items={[
                { label: "Expertise", href: "/expertise" },
                { label: area.label, isActive: true },
              ]}
            />

            <Stack gap="lg" className="max-w-measure-wide">
              <Caption tone="accent">Expertise</Caption>
              <Heading>{area.label}</Heading>
              <Body size="large">{area.shortDescription}</Body>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section spacing="default">
        <Container size="content">
          <Stack gap="xl">
            <Stack gap="lg">
              <Caption tone="accent">Overview</Caption>
              <Body size="large" measure="content">
                {area.overview}
              </Body>
            </Stack>

            <Stack gap="lg">
              <Heading as="h2">
                Architectural positioning
              </Heading>
              <Body measure="content">{area.positioning}</Body>
            </Stack>

            <Stack gap="lg">
              <Heading as="h2">
                What this means in practice
              </Heading>
              <Body measure="content">{area.practice}</Body>
            </Stack>

            <Stack gap="lg">
              <Heading as="h2">
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

      <Section spacing="default">
        <Container size="content">
          <Stack gap="lg">
            <Heading as="h2">
              Related expertise
            </Heading>
            <ol className="border-t border-border" aria-label="Related expertise areas">
              {relatedExpertise.map((related) => (
                <li className="border-b border-border py-rhythm-md md:py-rhythm-lg" key={related.slug}>
                  <Stack gap="sm">
                    <Link href={getExpertisePath(related.slug)} className="group">
                      <Heading
                        as="h3"
                        className="transition-colors group-hover:text-accent"
                        size="section"
                      >
                        {related.label}
                      </Heading>
                    </Link>
                    <Body measure="content">
                      {related.shortDescription}
                    </Body>
                  </Stack>
                </li>
              ))}
            </ol>
          </Stack>
        </Container>
      </Section>

      <Section spacing="default">
        <Container size="content">
          <div className="border-t border-border pt-rhythm-lg">
            <Stack gap="lg">
              <Heading as="h2">
                Explore further
              </Heading>
              <Stack gap="md">
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
              </Stack>
            </Stack>
          </div>
        </Container>
      </Section>
    </main>
  );
}
