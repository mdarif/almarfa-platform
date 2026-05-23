import { Body, Caption, Container, Display, Section, Stack } from "@repo/ui";

import { HeroBackdrop } from "@/components/editorial";

export function HeroSection() {
  return (
    <Section
      spacing="default"
      className="editorial-hero pb-section md:pb-section-spacious md:pt-[calc(var(--spacing-section)+0.5rem)]"
    >
      <HeroBackdrop />
      <Container as="header" size="content" className="relative z-[1]">
        <Stack className="max-w-measure-wide gap-rhythm-md md:gap-rhythm-lg">
          <Stack gap="xs">
            <span aria-hidden className="editorial-anchor-line" />
            <Caption as="p" tone="accent">
              Al Marfa Technologies
            </Caption>
          </Stack>

          <Stack gap="md">
            <Display
              measure="hero"
              className="max-w-[13ch] xs:max-w-[16ch] sm:max-w-measure-hero text-balance text-pretty"
            >
              Enterprise Frontend Architecture for Systems That Need to Scale.
            </Display>

            <Stack gap="md">
              <hr className="editorial-rule max-w-measure-narrow" />

              <Stack className="md:gap-rhythm-md" gap="sm">
                <Body measure="content" size="large" tone="secondary">
                  We help engineering organizations design durable frontend
                  platforms, govern design systems, and evolve shared UI
                  infrastructure with architectural discipline.
                </Body>

                <Body measure="narrow" tone="muted">
                  Built for teams that value semantic structure, maintainable
                  delivery, and frontend decisions that compound into long-term
                  technical authority.
                </Body>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
