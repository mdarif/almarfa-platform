import type { ReactNode } from "react";
import { Container, Section, Stack } from "@repo/ui";

import { EditorialSectionIntro } from "./editorial-section-intro";

type PublicationIndexSectionProps = {
  eyebrow: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

/** Section intro + publication list rhythm for index pages. */
export function PublicationIndexSection({
  eyebrow,
  intro,
  children,
  className,
  "aria-label": ariaLabel,
}: PublicationIndexSectionProps) {
  return (
    <section aria-label={ariaLabel} className={className}>
      <Stack gap="lg">
        <EditorialSectionIntro eyebrow={eyebrow}>{intro}</EditorialSectionIntro>
        {children}
      </Stack>
    </section>
  );
}

type PublicationIndexPageSectionProps = {
  children: ReactNode;
  className?: string;
};

/** Outer spacing wrapper for insights index body blocks. */
export function PublicationIndexPageSection({
  children,
  className,
}: PublicationIndexPageSectionProps) {
  return (
    <Section spacing="default" className={className}>
      <Container size="content">
        <Stack gap="xl">{children}</Stack>
      </Container>
    </Section>
  );
}
