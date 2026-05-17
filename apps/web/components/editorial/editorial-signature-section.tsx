import { Body, Caption, Container, Grid, Heading, Section, Stack } from "@repo/ui";

type EditorialSignatureSectionProps = {
  principles: readonly string[];
};

/**
 * Homepage signature moment — numbered editorial rail, no cards or animation.
 */
export function EditorialSignatureSection({ principles }: EditorialSignatureSectionProps) {
  return (
    <Section id="platform-doctrine" spacing="default" surface="raised">
      <Container size="content">
        <Grid columns="two" gap="xl">
          <Stack gap="md">
            <Stack gap="xs">
              <span aria-hidden className="editorial-anchor-line" />
              <Caption tone="accent">Platform doctrine</Caption>
            </Stack>
            <Heading measure="narrow">
              Sustainable frontend architecture is an operating model, not only a
              code structure.
            </Heading>
            <Body size="large" measure="content">
              Enterprise frontend platforms become effective when teams share more than
              components. They need conventions, governance, quality signals, and
              documentation that make architectural decisions visible.
            </Body>
          </Stack>

          <ol className="editorial-signature-rail" aria-label="Architecture principles">
            {principles.map((principle) => (
              <li key={principle}>
                <Body measure="content">{principle}</Body>
              </li>
            ))}
          </ol>
        </Grid>
      </Container>
    </Section>
  );
}
