import { createPageMetadata } from "@repo/seo";
import { Body, Container, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

import { EditorialSectionIntro, PageEditorialHero } from "@/components/editorial";
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
      <PageEditorialHero
        atmosphere="expertise"
        eyebrow="Expertise"
        title="Eight authority clusters that organize our technical knowledge."
        description="Our expertise is organized into semantic clusters that compound over time. Each cluster represents a deep knowledge domain where we develop and share implementation patterns, architectural thinking, and governance approaches."
      />
      <ClustersSection />
      <RelatedSection />
    </main>
  );
}

function ClustersSection() {
  return (
    <Section spacing="default" surface="editorial">
      <Container size="content">
        <Stack gap="xl">
          <EditorialSectionIntro eyebrow="Authority areas">
            <Heading>Technical knowledge domains we focus on and develop.</Heading>
          </EditorialSectionIntro>

          <ol className="border-t border-border" aria-label="Authority clusters">
            {EXPERTISE_LIST.map((area) => (
              <li className="border-b border-border py-rhythm-md md:py-rhythm-lg" key={area.slug}>
                <Stack gap="md">
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
            <Heading as="h2">Explore further</Heading>
            <Stack gap="md">
              <Body measure="content">
                <Link
                  className="editorial-link font-medium no-underline hover:underline"
                  href="/services"
                >
                  Architecture advisory services
                </Link>
                {" · "}
                <Link
                  className="editorial-link font-medium no-underline hover:underline"
                  href="/insights"
                >
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
