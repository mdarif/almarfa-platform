import { createPageMetadata, siteConfig } from "@repo/seo";
import { Body, Caption, Container, Grid, Heading, Section, Stack } from "@repo/ui";

export const metadata = createPageMetadata({
  description:
    "Contact Al Marfa for architecture advisory conversations about frontend platforms and technical leadership.",
  pathname: "/contact",
  title: "Contact",
});

export default function ContactPage() {
  return (
    <main>
      <PositioningSection />
      <ExpectationsSection />
      <InquirySection />
    </main>
  );
}

/**
 * Positioning - what to expect from contacting us
 */
function PositioningSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg" className="max-w-measure-wide">
          <Caption tone="accent">Contact</Caption>
          <Heading>
            Architecture advisory conversations for enterprise frontend platforms.
          </Heading>
          <Body size="large">
            Al Marfa works with engineering leadership on the architectural and
            governance decisions that shape sustainable frontend platforms. A
            good first note is concise: what you are scaling, what feels unclear,
            and where architectural judgment would help.
          </Body>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Set expectations about the engagement process
 */
function ExpectationsSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg">
          <Caption tone="accent">How This Works</Caption>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-rhythm-xl">
            <Stack gap="md" className="max-w-measure-narrow">
              <Heading as="h3">What happens next</Heading>
              <ul className="space-y-rhythm-sm">
                <li className="flex gap-rhythm-sm">
                  <span className="text-accent font-semibold flex-shrink-0">→</span>
                  <span className="text-sm">
                    <Body measure="content">We review each note directly.</Body>
                  </span>
                </li>
                <li className="flex gap-rhythm-sm">
                  <span className="text-accent font-semibold flex-shrink-0">→</span>
                  <span className="text-sm">
                    <Body measure="content">
                      Initial conversation focuses on understanding your platform challenges.
                    </Body>
                  </span>
                </li>
                <li className="flex gap-rhythm-sm">
                  <span className="text-accent font-semibold flex-shrink-0">→</span>
                  <span className="text-sm">
                    <Body measure="content">
                      We will discuss whether architecture advisory is the right fit.
                    </Body>
                  </span>
                </li>
              </ul>
            </Stack>

            <Stack gap="md" className="max-w-measure-narrow">
              <Heading as="h3">What this is not</Heading>
              <ul className="space-y-rhythm-sm">
                <li className="flex gap-rhythm-sm">
                  <span className="text-text/50 font-semibold flex-shrink-0">×</span>
                  <span className="text-sm">
                    <Body measure="content" tone="secondary">
                      We do not offer immediate pricing or service packages.
                    </Body>
                  </span>
                </li>
                <li className="flex gap-rhythm-sm">
                  <span className="text-text/50 font-semibold flex-shrink-0">×</span>
                  <span className="text-sm">
                    <Body measure="content" tone="secondary">
                      This is not a product demo or tool evaluation.
                    </Body>
                  </span>
                </li>
                <li className="flex gap-rhythm-sm">
                  <span className="text-text/50 font-semibold flex-shrink-0">×</span>
                  <span className="text-sm">
                    <Body measure="content" tone="secondary">
                      We focus on architectural thinking, not sales pressure.
                    </Body>
                  </span>
                </li>
              </ul>
            </Stack>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Contact inquiry section with form and email option
 */
function InquirySection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg">
          <Caption tone="accent">Get In Touch</Caption>

          <Grid columns="two" gap="xl">
            <Stack gap="md" className="max-w-measure-narrow">
              <Heading as="h3">Direct email</Heading>
              <Body measure="content">
                If you prefer email, reach out directly with a brief description
                of your platform challenges.
              </Body>
              <a
                className="w-fit font-mono text-sm text-accent transition-opacity hover:opacity-75"
                href={`mailto:${siteConfig.contactEmail}`}
              >
                {siteConfig.contactEmail}
              </a>
            </Stack>

            <Stack gap="md" className="max-w-measure-narrow">
              <Heading as="h3">Useful context</Heading>
              <ul className="space-y-rhythm-sm">
                {contactContextPrompts.map((prompt) => (
                  <li className="border-t border-border pt-rhythm-sm" key={prompt}>
                    <Body measure="content">{prompt}</Body>
                  </li>
                ))}
              </ul>
            </Stack>
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}

const contactContextPrompts = [
  "Which frontend platform, design system, Storybook, monorepo, or governance challenge needs architectural clarity?",
  "What scale, team structure, or ownership model is shaping the decision?",
  "What would a useful advisory conversation help you decide next?",
] as const;
