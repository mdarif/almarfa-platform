/**
 * Header Component
 *
 * Minimal, editorial header with primary navigation.
 * Mobile: full-width disclosure (brand + trigger in summary row); md+: horizontal row.
 */

import { Container } from "@repo/ui";

import { PrimaryNav } from "./primary-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <Container size="page" className="py-rhythm-sm md:py-rhythm-md">
        <PrimaryNav />
      </Container>
    </header>
  );
}
