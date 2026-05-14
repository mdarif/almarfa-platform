/**
 * Header Component
 * 
 * Minimal, editorial header with primary navigation.
 * Responsive behavior preserves readability at all sizes.
 */

import Link from "next/link";
import { Container } from "@repo/ui";
import { PrimaryNav } from "./primary-nav";

export function Header() {
  return (
    <header className="border-b border-border bg-surface sticky top-0 z-40">
      <Container size="page" className="flex items-center justify-between py-rhythm-md">
        {/* Brand/Logo */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide hover:opacity-75 transition-opacity"
        >
          Al Marfa
        </Link>

        {/* Primary Navigation */}
        <PrimaryNav />
      </Container>
    </header>
  );
}
