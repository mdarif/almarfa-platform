/**
 * Footer Component
 * 
 * Semantic footer with platform positioning and publication-oriented structure.
 * Supports authority areas, expertise navigation, and site structure.
 * Avoids marketing-heavy patterns and link farms.
 */

import Link from "next/link";
import { siteConfig } from "@repo/seo";
import { Container, Stack, Caption, Body } from "@repo/ui";

import {
  EXPERTISE_BY_SLUG,
  EXPERTISE_NAVIGATION_GROUPS,
  NAVIGATION,
  PLATFORM_POSITIONING,
} from "@/lib/expertise";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 mt-rhythm-4xl">
      <Container size="page" className="py-rhythm-3xl">
        <Stack gap="xl">
          {/* Platform Positioning */}
          <Stack gap="lg" className="max-w-prose">
            <h2 className="text-sm font-semibold tracking-wide">Al Marfa Technologies</h2>
            <Body tone="secondary">
              {PLATFORM_POSITIONING.tagline}
            </Body>
            <a
              className="w-fit text-sm text-accent transition-opacity hover:opacity-75"
              href={`mailto:${siteConfig.contactEmail}`}
            >
              {siteConfig.contactEmail}
            </a>
          </Stack>

          {/* Semantic Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-rhythm-4xl">
            {/* Primary Navigation */}
            <nav className="space-y-rhythm-md">
              <Caption tone="accent" className="uppercase text-xs tracking-wider">
                Navigation
              </Caption>
              <ul className="space-y-rhythm-sm">
                {NAVIGATION.primary.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-text/75 hover:text-text transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {EXPERTISE_NAVIGATION_GROUPS.map((group) => (
              <nav className="space-y-rhythm-md" key={group.label}>
                <Caption tone="accent" className="uppercase text-xs tracking-wider">
                  {group.label}
                </Caption>
                <ul className="space-y-rhythm-sm">
                  {group.slugs.map((slug) => {
                    const area = EXPERTISE_BY_SLUG[slug];

                    return (
                      <li key={slug}>
                        <Link
                          href={`/expertise/${slug}`}
                          className="text-sm text-text/75 hover:text-text transition-colors"
                        >
                          {area.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>

          {/* Footer Meta */}
          <div className="border-t border-border/30 pt-rhythm-lg">
            <p className="text-xs text-text/50">
              © {new Date().getFullYear()} Al Marfa Technologies. All rights reserved.
            </p>
          </div>
        </Stack>
      </Container>
    </footer>
  );
}
