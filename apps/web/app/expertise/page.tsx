import { createPageMetadata } from "@repo/seo";
import { Body, Caption, Container, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

import { EXPERTISE_LIST, getExpertisePath } from "@/lib/expertise";

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

function ClustersSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="xl">
          <Stack gap="md" className="max-w-measure-wide">
            <Caption tone="accent">Authority areas</Caption>
            <Heading>
              Technical knowledge domains we focus on and develop.
            </Heading>
          </Stack>

          <ol className="border-t border-border" aria-label="Authority clusters">
            {EXPERTISE_LIST.map((area) => (
              <li className="border-b border-border py-rhythm-lg" key={area.slug}>
                <Stack gap="md">
                  <Link href={getExpertisePath(area.slug)} className="group">
                    <Heading
                      as="h3"
                      className="text-[clamp(1.375rem,2.5vw,2rem)] group-hover:text-accent transition-colors"
                      measure="narrow"
                    >
                      {area.label}
                    </Heading>
                  </Link>
                  <Body measure="content">{area.shortDescription}</Body>
                </Stack>
              </li>
            ))}
          </ol>
        </Stack>
      </Container>
    </Section>
  );
}

function RelatedSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <div className="border-t border-border pt-rhythm-lg">
          <Stack gap="lg">
            <Heading as="h2">
              Explore further
            </Heading>
            <Stack gap="md">
              <Body measure="content">
                <Link href="/services" className="text-accent hover:opacity-75 transition-opacity">
                  Architecture advisory services
                </Link>
                {" · "}
                <Link href="/insights" className="text-accent hover:opacity-75 transition-opacity">
                  Implementation insights
                </Link>
              </Body>
            </Stack>
          </Stack>
        </div>
      </Container>
    </Section>
  );
}
