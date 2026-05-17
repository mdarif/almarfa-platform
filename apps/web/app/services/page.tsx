import { createPageMetadata } from "@repo/seo";
import { Body, Caption, Container, Grid, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

import { EXPERTISE_AREAS } from "@/lib/expertise";

export const metadata = createPageMetadata({
  description:
    "Al Marfa provides architecture advisory focused on sustainable frontend platforms, governance, and technical leadership.",
  pathname: "/services",
  title: "Services",
});

export default function ServicesPage() {
  return (
    <main>
      <PositioningSection />
      <ExpertiseAreasSection />
      <EngagementModelSection />
    </main>
  );
}

/**
 * Positioning section - explains what Al Marfa focuses on
 */
function PositioningSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg" className="max-w-measure-wide">
          <Caption tone="accent">Services</Caption>
          <Heading>
            Architecture advisory for sustainable enterprise frontend platforms.
          </Heading>
          <Body size="large">
            Al Marfa focuses on the architectural and governance thinking that
            frontend platforms require at scale. We work with engineering
            leadership on the systems, structures, and practices that make
            distributed frontend ownership sustainable.
          </Body>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Expertise areas - the domains we focus on
 */
function ExpertiseAreasSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="xl">
          <Stack gap="md" className="max-w-measure-wide">
            <Caption tone="accent">Focus Areas</Caption>
            <Heading>
              Seven expertise domains that compound your platform&apos;s effectiveness.
            </Heading>
          </Stack>

          <ol className="border-t border-border" aria-label="Expertise areas">
            {EXPERTISE_AREAS.map((area) => (
              <li className="border-b border-border py-rhythm-md md:py-rhythm-lg" key={area.id}>
                <div className="flex flex-col gap-rhythm-sm md:grid md:grid-cols-2 md:gap-grid-lg">
                  <Link
                    href={`/expertise/${area.slug}`}
                    className="group"
                  >
                    <Heading
                      as="h3"
                      className="transition-colors group-hover:text-accent"
                      measure="narrow"
                      size="list"
                    >
                      {area.title}
                    </Heading>
                  </Link>
                  <Body measure="content">{area.description}</Body>
                </div>
              </li>
            ))}
          </ol>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Engagement model - how we approach advisory work
 */
function EngagementModelSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg">
          <Caption tone="accent">How We Work</Caption>
          <Grid columns="two" gap="xl">
            <Stack gap="md" className="max-w-measure-narrow">
              <Heading as="h3">Architecture-first thinking</Heading>
              <Body measure="content">
                Our advisory focuses on the operating models, governance patterns,
                and architectural clarity that make platforms sustainable. We help
                you think through the decisions that shape your systems&apos; evolution.
              </Body>
            </Stack>

            <Stack gap="md" className="max-w-measure-narrow">
              <Heading as="h3">Beyond tools and frameworks</Heading>
              <Body measure="content">
                Architecture becomes effective when teams share more than code.
                We focus on the conventions, standards, and decision-making
                frameworks that make your platform work at scale.
              </Body>
            </Stack>
          </Grid>

          <div className="border-t border-border pt-rhythm-lg mt-rhythm-lg">
            <Stack gap="lg">
              <Heading as="h3">Next steps</Heading>
              <Body>
                Explore our{" "}
                <Link href="/expertise" className="text-accent hover:opacity-75 transition-opacity">
                  expertise areas
                </Link>
                {" "}or{" "}
                <Link href="/contact" className="text-accent hover:opacity-75 transition-opacity">
                  contact us
                </Link>
                {" "}to discuss your platform challenges.
              </Body>
            </Stack>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
