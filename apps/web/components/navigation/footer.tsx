/**
 * Footer Component
 * 
 * Semantic footer with platform positioning and publication-oriented structure.
 * Supports authority areas, expertise navigation, and site structure.
 * Avoids marketing-heavy patterns and link farms.
 */

import Link from "next/link";
import { Container, Stack, Caption, Body } from "@repo/ui";
import { AUTHORITY_CLUSTERS, PLATFORM_POSITIONING, NAVIGATION } from "@/lib/platform";

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

            {/* Expertise Clusters - First Group */}
            <nav className="space-y-rhythm-md">
              <Caption tone="accent" className="uppercase text-xs tracking-wider">
                Architecture
              </Caption>
              <ul className="space-y-rhythm-sm">
                {Object.values(AUTHORITY_CLUSTERS)
                  .slice(0, 2)
                  .map((cluster) => (
                    <li key={cluster.id}>
                      <Link
                        href={`/expertise/${cluster.slug}`}
                        className="text-sm text-text/75 hover:text-text transition-colors"
                      >
                        {cluster.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>

            {/* Expertise Clusters - Second Group */}
            <nav className="space-y-rhythm-md">
              <Caption tone="accent" className="uppercase text-xs tracking-wider">
                Platforms
              </Caption>
              <ul className="space-y-rhythm-sm">
                {Object.values(AUTHORITY_CLUSTERS)
                  .slice(2, 5)
                  .map((cluster) => (
                    <li key={cluster.id}>
                      <Link
                        href={`/expertise/${cluster.slug}`}
                        className="text-sm text-text/75 hover:text-text transition-colors"
                      >
                        {cluster.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>

            {/* Expertise Clusters - Third Group */}
            <nav className="space-y-rhythm-md">
              <Caption tone="accent" className="uppercase text-xs tracking-wider">
                Operations
              </Caption>
              <ul className="space-y-rhythm-sm">
                {Object.values(AUTHORITY_CLUSTERS)
                  .slice(5)
                  .map((cluster) => (
                    <li key={cluster.id}>
                      <Link
                        href={`/expertise/${cluster.slug}`}
                        className="text-sm text-text/75 hover:text-text transition-colors"
                      >
                        {cluster.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
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
