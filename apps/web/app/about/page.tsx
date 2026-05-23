import { createPageMetadata } from "@repo/seo";
import { Body, Container, Grid, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

import {
  EditorialSectionIntro,
  PageEditorialHero,
} from "@/components/editorial";

export const metadata = createPageMetadata({
  description:
    "Al Marfa is an enterprise frontend architecture authority platform focused on sustainable systems thinking and technical leadership.",
  pathname: "/about",
  title: "About",
});

export default function AboutPage() {
  return (
    <main>
      <PageEditorialHero
        atmosphere="publication"
        eyebrow="About"
        title="Al Marfa is an enterprise frontend architecture authority platform."
        description="We focus on the architectural thinking, governance patterns, and operational practices that sustainable frontend platforms require. Our work centers on the decisions that shape how teams organize, share, and evolve their systems."
      />
      <PhilosophySection />
      <PrinciplesSection />
      <PublicationModelSection />
    </main>
  );
}

function PhilosophySection() {
  return (
    <Section spacing="default" surface="raised">
      <Container size="content">
        <Stack gap="lg">
          <EditorialSectionIntro eyebrow="Why This Matters">
            <Grid columns="two" gap="xl">
              <Stack gap="md" className="max-w-measure-narrow">
                <Heading as="h3">The problem</Heading>
                <Body measure="content">
                  Frontend platforms scale not when tools multiply, but when
                  architecture becomes clear. Most organizations struggle with
                  shared frontend systems because they focus on code structure
                  before addressing the operating model, governance, and
                  organizational thinking that systems require.
                </Body>
              </Stack>

              <Stack gap="md" className="max-w-measure-narrow">
                <Heading as="h3">Our approach</Heading>
                <Body measure="content">
                  We help engineering leadership think through the architectural
                  and governance decisions that make platforms work. This means
                  focusing on package boundaries, shared conventions, decision
                  frameworks, and the practices that keep systems sustainable as
                  they evolve.
                </Body>
              </Stack>
            </Grid>
          </EditorialSectionIntro>
        </Stack>
      </Container>
    </Section>
  );
}

function PrinciplesSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg">
          <EditorialSectionIntro eyebrow="Core Principles">
            <Heading>
              What we believe about sustainable frontend systems.
            </Heading>
          </EditorialSectionIntro>

          <Body measure="content">
            Our operating principles are stated once on the homepage as platform
            doctrine — the numbered rail that frames how we think about
            governance, shared infrastructure, and long-term architectural
            sustainability.{" "}
            <Link className="editorial-link" href="/#platform-doctrine">
              Read platform doctrine
            </Link>
            .
          </Body>
        </Stack>
      </Container>
    </Section>
  );
}

function PublicationModelSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg">
          <EditorialSectionIntro eyebrow="How We Operate">
            <Grid columns="two" gap="xl">
              <Stack gap="md" className="max-w-measure-narrow">
                <Heading as="h3">Technical publication model</Heading>
                <Body measure="content">
                  We operate as a technical publication focused on frontend
                  architecture and platform thinking. Our work is driven by
                  implementation realism and architectural depth, not marketing
                  narratives or trend chasing.
                </Body>
              </Stack>

              <Stack gap="md" className="max-w-measure-narrow">
                <Heading as="h3">Authority through consistency</Heading>
                <Body measure="content">
                  Our credibility comes from consistent, thoughtful work across
                  distinct expertise domains. We build authority through depth
                  of knowledge, implementation experience, and the willingness
                  to explore architectural tradeoffs in detail.
                </Body>
              </Stack>
            </Grid>
          </EditorialSectionIntro>

          <div className="border-t border-border pt-rhythm-lg mt-rhythm-lg">
            <Stack gap="lg">
              <Heading as="h3">Explore Our Work</Heading>
              <Stack gap="md">
                <div>
                  <Body className="mb-rhythm-sm font-medium">
                    Expertise Areas
                  </Body>
                  <Link
                    className="editorial-link text-sm font-medium no-underline hover:underline"
                    href="/expertise"
                  >
                    Eight authority clusters →
                  </Link>
                </div>
                <div>
                  <Body className="mb-rhythm-sm font-medium">
                    Insights & Articles
                  </Body>
                  <Link
                    className="editorial-link text-sm font-medium no-underline hover:underline"
                    href="/insights"
                  >
                    Implementation patterns and architectural thinking →
                  </Link>
                </div>
                <div>
                  <Body className="mb-rhythm-sm font-medium">Services</Body>
                  <Link
                    className="editorial-link text-sm font-medium no-underline hover:underline"
                    href="/services"
                  >
                    Architecture advisory offerings →
                  </Link>
                </div>
              </Stack>
            </Stack>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
