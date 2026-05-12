import { Body, Caption, Container, Display, Section, Stack } from "@repo/ui";

export function HeroSection() {
  return (
    <Section spacing="spacious">
      <Container as="header" size="content">
        <Stack gap="md" className="max-w-measure-wide">
          <Caption as="p" tone="accent">
            Al Marfa Technologies
          </Caption>

          <Display>
            Enterprise frontend architecture for systems that need to scale.
          </Display>

          <Body measure="content" size="large">
            We help engineering organizations design durable frontend platforms,
            govern design systems, and evolve shared UI infrastructure with
            architectural discipline.
          </Body>

          <Body measure="narrow" tone="muted">
            Built for teams that value semantic structure, maintainable delivery,
            and frontend decisions that compound into long-term technical
            authority.
          </Body>
        </Stack>
      </Container>
    </Section>
  );
}
