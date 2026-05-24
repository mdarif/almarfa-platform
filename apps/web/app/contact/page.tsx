import { createPageMetadata, siteConfig } from "@repo/seo";
import { Body, Container, Heading, Section, Stack } from "@repo/ui";

import {
  EditorialSectionIntro,
  PageEditorialHero,
} from "@/components/editorial";

export const metadata = createPageMetadata({
  description:
    "Start an architecture conversation with Al Marfa about frontend platform engineering, component governance, and enterprise engineering systems.",
  pathname: "/contact",
  title: "Contact",
});

export default function ContactPage() {
  return (
    <main>
      <PageEditorialHero
        atmosphere="contact"
        eyebrow="Contact"
        title="Start an Architecture Conversation"
        description="Al Marfa works with engineering leadership on the architectural and governance decisions that shape sustainable frontend platforms."
      />
      <ExpectationsSection />
      <InquirySection />
    </main>
  );
}

function ExpectationsSection() {
  return (
    <Section
      spacing="default"
      surface="raised"
      className="contact-expectations"
    >
      <Container size="content">
        <Stack gap="lg">
          <EditorialSectionIntro eyebrow="How This Works">
            <div className="grid grid-cols-1 gap-rhythm-xl md:grid-cols-2">
              <Stack gap="md" className="max-w-measure-narrow">
                <Heading as="h3">What happens next</Heading>
                <ul className="space-y-rhythm-sm">
                  <li className="flex gap-rhythm-sm">
                    <span className="flex-shrink-0 font-semibold text-accent">
                      →
                    </span>
                    <Body measure="content">We review each note directly.</Body>
                  </li>
                  <li className="flex gap-rhythm-sm">
                    <span className="flex-shrink-0 font-semibold text-accent">
                      →
                    </span>
                    <Body measure="content">
                      Initial conversation focuses on understanding your
                      platform challenges.
                    </Body>
                  </li>
                  <li className="flex gap-rhythm-sm">
                    <span className="flex-shrink-0 font-semibold text-accent">
                      →
                    </span>
                    <Body measure="content">
                      We will discuss whether architecture advisory is the right
                      fit.
                    </Body>
                  </li>
                </ul>
              </Stack>

              <Stack gap="md" className="max-w-measure-narrow">
                <Heading as="h3">What this is not</Heading>
                <ul className="space-y-rhythm-sm">
                  <li className="flex gap-rhythm-sm">
                    <span className="flex-shrink-0 font-semibold text-text/50">
                      ×
                    </span>
                    <Body measure="content" tone="secondary">
                      We do not offer immediate pricing or service packages.
                    </Body>
                  </li>
                  <li className="flex gap-rhythm-sm">
                    <span className="flex-shrink-0 font-semibold text-text/50">
                      ×
                    </span>
                    <Body measure="content" tone="secondary">
                      This is not a product demo or tool evaluation.
                    </Body>
                  </li>
                  <li className="flex gap-rhythm-sm">
                    <span className="flex-shrink-0 font-semibold text-text/50">
                      ×
                    </span>
                    <Body measure="content" tone="secondary">
                      We focus on architectural thinking, not sales pressure.
                    </Body>
                  </li>
                </ul>
              </Stack>
            </div>
          </EditorialSectionIntro>
        </Stack>
      </Container>
    </Section>
  );
}

function InquirySection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg">
          <EditorialSectionIntro eyebrow="Get In Touch">
            <div className="grid grid-cols-1 gap-rhythm-xl md:grid-cols-2">
              <Stack gap="md" className="max-w-measure-narrow">
                <Heading as="h3">Direct email</Heading>
                <Body measure="content">
                  If you prefer email, reach out directly with a brief
                  description of your platform challenges.
                </Body>
                <a
                  className="editorial-link w-fit font-mono text-sm no-underline hover:underline"
                  href={`mailto:${siteConfig.contactEmail}`}
                >
                  {siteConfig.contactEmail}
                </a>
              </Stack>

              <Stack gap="md" className="max-w-measure-narrow">
                <Heading as="h3">Useful context</Heading>
                <ul className="space-y-rhythm-sm">
                  {contactContextPrompts.map((prompt) => (
                    <li
                      className="border-t border-border pt-rhythm-sm"
                      key={prompt}
                    >
                      <Body measure="content">{prompt}</Body>
                    </li>
                  ))}
                </ul>
              </Stack>
            </div>
          </EditorialSectionIntro>
        </Stack>
      </Container>
    </Section>
  );
}

const contactContextPrompts = [
  "Which frontend platform, Storybook governance, monorepo structure, component systems, or DX challenge needs architectural clarity?",
  "What scale, team structure, or ownership model is shaping the decision?",
  "What would a useful advisory conversation help you decide next?",
] as const;
