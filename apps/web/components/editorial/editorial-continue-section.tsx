import type { ReactNode } from "react";
import { Body, Container, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

import { EditorialSectionIntro } from "./editorial-section-intro";

type EditorialContinueRelatedItem = {
  href: string;
  title: string;
  description: string;
};

type EditorialContinueSectionProps = {
  relatedItems?: readonly EditorialContinueRelatedItem[];
  children?: ReactNode;
};

/** Combined trailing continue / related block for detail pages. */
export function EditorialContinueSection({
  relatedItems = [],
  children,
}: EditorialContinueSectionProps) {
  if (relatedItems.length === 0 && !children) {
    return null;
  }

  return (
    <Section spacing="compact">
      <Container size="content">
        <aside className="border-t border-border pt-rhythm-lg">
          <Stack gap="lg">
            {relatedItems.length > 0 ? (
              <Stack gap="lg">
                <EditorialSectionIntro eyebrow="Continue" density="compact">
                  <Heading as="h2" size="section">
                    Related expertise
                  </Heading>
                </EditorialSectionIntro>
                <ol
                  className="border-t border-border"
                  aria-label="Related expertise areas"
                >
                  {relatedItems.map((item) => (
                    <li
                      className="border-b border-border py-rhythm-md md:py-rhythm-lg"
                      key={item.href}
                    >
                      <Stack gap="sm">
                        <Link href={item.href} className="group">
                          <Heading
                            as="h3"
                            className="transition-colors group-hover:text-accent"
                            size="list"
                          >
                            {item.title}
                          </Heading>
                        </Link>
                        <Body measure="content">{item.description}</Body>
                      </Stack>
                    </li>
                  ))}
                </ol>
              </Stack>
            ) : null}
            {children ? <Stack gap="md">{children}</Stack> : null}
          </Stack>
        </aside>
      </Container>
    </Section>
  );
}
