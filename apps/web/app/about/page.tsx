import { createPageMetadata } from "@repo/seo";
import { Body, Caption, Container, Grid, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

export const metadata = createPageMetadata({
  description:
    "Al Marfa is an enterprise frontend architecture authority platform focused on sustainable systems thinking and technical leadership.",
  pathname: "/about",
  title: "About",
});

export default function AboutPage() {
  return (
    <main>
      <MissionSection />
      <PhilosophySection />
      <PrinciplesSection />
      <PublicationModelSection />
    </main>
  );
}

/**
 * Mission - what Al Marfa is and why it exists
 */
function MissionSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg" className="max-w-measure-wide">
          <Caption tone="accent">About</Caption>
          <Heading>
            Al Marfa is an enterprise frontend architecture authority platform.
          </Heading>
          <Body size="large">
            We focus on the architectural thinking, governance patterns, and
            operational practices that sustainable frontend platforms require.
            Our work centers on the decisions that shape how teams organize,
            share, and evolve their systems.
          </Body>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Philosophy - the thinking behind what we do
 */
function PhilosophySection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg">
          <Caption tone="accent">Why This Matters</Caption>
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
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Core principles that guide our work
 */
function PrinciplesSection() {
  const principles = [
    "Scalable frontend ecosystems need clear package boundaries, shared language, and realistic ownership models.",
    "Governance should make good decisions easier to repeat, not create process for its own sake.",
    "Shared UI infrastructure works best when primitives, documentation, and release practices evolve together.",
    "Architectural sustainability depends on systems that teams can understand, maintain, and gradually improve.",
  ] as const;

  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg">
          <Caption tone="accent">Core Principles</Caption>
          <Heading>
            What we believe about sustainable frontend systems.
          </Heading>

          <ul className="border-t border-border" aria-label="Core principles">
            {principles.map((principle) => (
              <li className="border-b border-border py-rhythm-lg" key={principle}>
                <Body measure="content">{principle}</Body>
              </li>
            ))}
          </ul>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Publication model - how we operate
 */
function PublicationModelSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg">
          <Caption tone="accent">How We Operate</Caption>
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
                distinct expertise domains. We build authority through depth of
                knowledge, implementation experience, and the willingness to
                explore architectural tradeoffs in detail.
              </Body>
            </Stack>
          </Grid>

          <div className="border-t border-border pt-rhythm-lg mt-rhythm-lg">
            <Stack gap="lg">
              <Heading as="h3">Explore Our Work</Heading>
              <Stack gap="md">
                <div>
                  <Body className="mb-rhythm-sm font-medium">Expertise Areas</Body>
                  <Link href="/expertise" className="text-accent hover:opacity-75 transition-opacity">
                    Eight authority clusters →
                  </Link>
                </div>
                <div>
                  <Body className="mb-rhythm-sm font-medium">Insights & Articles</Body>
                  <Link href="/insights" className="text-accent hover:opacity-75 transition-opacity">
                    Implementation patterns and architectural thinking →
                  </Link>
                </div>
                <div>
                  <Body className="mb-rhythm-sm font-medium">Services</Body>
                  <Link href="/services" className="text-accent hover:opacity-75 transition-opacity">
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
