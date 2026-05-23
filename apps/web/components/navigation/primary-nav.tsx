/**
 * Primary Navigation
 *
 * CSS-only mobile disclosure (details/summary) and horizontal nav at md+.
 * Mobile: details owns full width — summary row is brand + trigger; links below.
 *
 * No JS, no client component, no animation library — browser-native open/close
 * with zero hydration cost. Do not replace with a stateful hamburger menu.
 * [&::-webkit-details-marker]:hidden removes the default browser disclosure triangle.
 */

import Link from "next/link";

import { cn } from "@/lib/utils";
import { AmLogo } from "@repo/ui";

import { NAVIGATION } from "@/lib/expertise";

type PrimaryNavLinksProps = {
  className?: string;
  layout?: "horizontal" | "vertical";
};

function BrandLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-rhythm-sm no-underline transition-opacity hover:no-underline hover:opacity-75",
        className,
      )}
      aria-label="Al Marfa Technologies"
    >
      <AmLogo size="sm" variant="primary" />
    </Link>
  );
}

function PrimaryNavLinks({
  className,
  layout = "horizontal",
}: PrimaryNavLinksProps) {
  return (
    <ul
      className={cn(
        layout === "vertical"
          ? "flex flex-col gap-rhythm-sm py-rhythm-sm"
          : "flex items-center gap-rhythm-lg",
        className,
      )}
    >
      {NAVIGATION.primary.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="text-sm font-medium text-text/75 no-underline transition-colors hover:text-accent hover:no-underline"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function PrimaryNav() {
  return (
    <>
      <details className="group w-full md:hidden">
        <summary className="editorial-disclosure-summary flex list-none items-center justify-between gap-rhythm-md text-text/75 transition-colors hover:text-text [&::-webkit-details-marker]:hidden [&_a]:no-underline">
          <BrandLink />
          <span className="text-sm font-medium">Menu</span>
        </summary>
        <nav
          aria-label="Primary navigation"
          className="border-t border-border pt-rhythm-sm"
        >
          <PrimaryNavLinks layout="vertical" />
        </nav>
      </details>

      <div className="hidden w-full items-center justify-between gap-rhythm-md md:flex">
        <BrandLink />
        <nav aria-label="Primary navigation">
          <PrimaryNavLinks />
        </nav>
      </div>
    </>
  );
}
