import { createPageMetadata } from "@repo/seo";
import { Body, Caption, Container, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

import { AUTHORITY_CLUSTERS } from "@/lib/platform";

export const metadata = createPageMetadata({
  description:
    "Frontend architecture authority clusters covering systems design, governance, platforms, and technical leadership.",
  pathname: "/expertise",
  title: "Expertise",
});

export default function ExpertisePage() {
  return (
    <main>
      <PositioningSection />
      <ClustersSection />
      <RelatedSection />
    </main>
  );
}

/**
 * Positioning - explains the cluster model
 */
function PositioningSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg" className="max-w-measure-wide">
          <Caption tone="accent">Expertise</Caption>
          <Heading>
            Eight authority clusters that organize our technical knowledge.
          </Heading>
          <Body size="large">
            Our expertise is organized into semantic clusters that compound over
            time. Each cluster represents a deep knowledge domain where we
            develop and share implementation patterns, architectural thinking,
            and governance approaches.
          </Body>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Authority clusters - linked to individual pages
 */
function ClustersSection() {
  const clusters = Object.values(AUTHORITY_CLUSTERS);

  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="xl">
          <Stack gap="md" className="max-w-measure-wide">
            <Caption tone="accent">Authority Areas</Caption>
            <Heading>
              Technical knowledge domains we focus on and develop.
            </Heading>
          </Stack>

          <ol className="border-t border-border" aria-label="Authority clusters">
            {clusters.map((cluster) => (
              <li className="border-b border-border py-rhythm-lg" key={cluster.id}>
                <Stack gap="md">
                  <Link href={`/expertise/${cluster.slug}`} className="group">
                    <Heading
                      as="h3"
                      className="text-[clamp(1.375rem,2.5vw,2rem)] group-hover:text-accent transition-colors"
                      measure="narrow"
                    >
                      {cluster.label}
                    </Heading>
                  </Link>
                  <Body measure="content">{cluster.description}</Body>
                </Stack>
              </li>
            ))}
          </ol>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Related content - link to services and insights
 */
function RelatedSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <div className="border-t border-border pt-rhythm-lg">
          <Stack gap="lg">
            <Heading as="h3">Explore More</Heading>
            <Stack gap="md">
              <div>
                <Body className="mb-rhythm-sm font-medium">Related Services</Body>
                <Link href="/services" className="text-accent hover:opacity-75 transition-opacity">
                  View our service offerings →
                </Link>
              </div>
              <div>
                <Body className="mb-rhythm-sm font-medium">Implementation Insights</Body>
                <Link href="/insights" className="text-accent hover:opacity-75 transition-opacity">
                  Read our insights and articles →
                </Link>
              </div>
            </Stack>
          </Stack>
        </div>
      </Container>
    </Section>
  );
}
