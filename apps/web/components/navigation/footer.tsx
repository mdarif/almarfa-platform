/**
 * Footer Component
 *
 * Semantic footer with platform positioning and publication-oriented structure.
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

const footerLinkClassName =
  "text-pretty text-sm leading-snug text-text/75 transition-colors hover:text-text";

export function Footer() {
  return (
    <footer className="footer-editorial mt-rhythm-xl border-t border-accent-border/50 bg-surface-muted/40 md:mt-rhythm-2xl">
      <Container
        size="page"
        className="relative z-[1] py-rhythm-xl pb-[max(var(--spacing-rhythm-xl),env(safe-area-inset-bottom))] md:py-rhythm-2xl md:pb-[max(var(--spacing-rhythm-2xl),env(safe-area-inset-bottom))]"
      >
        <Stack gap="lg" className="md:gap-rhythm-xl">
          <Stack gap="md" className="max-w-prose">
            <h2 className="text-base font-semibold tracking-wide text-foreground">
              Al Marfa Technologies
            </h2>
            <Body className="max-w-prose text-pretty" tone="muted">
              {PLATFORM_POSITIONING.tagline}
            </Body>
            <a
              className="w-fit text-sm text-accent transition-opacity hover:opacity-75"
              href={`mailto:${siteConfig.contactEmail}`}
            >
              {siteConfig.contactEmail}
            </a>
          </Stack>

          <hr className="editorial-rule max-w-measure-narrow" aria-hidden />

          <div className="flex flex-col gap-rhythm-md md:grid md:grid-cols-[minmax(9rem,11rem)_1fr] md:items-start md:gap-x-rhythm-lg md:gap-y-0 lg:grid-cols-[12rem_1fr] lg:gap-x-rhythm-xl">
            <nav className="hidden md:block">
              <Stack gap="sm">
                <Caption tone="accent" className="text-xs uppercase tracking-wider">
                  Navigation
                </Caption>
                <ul className="space-y-rhythm-sm">
                  {NAVIGATION.primary.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={footerLinkClassName}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Stack>
            </nav>

            <div className="grid grid-cols-1 gap-rhythm-md lg:grid-cols-3 lg:gap-rhythm-lg">
              {EXPERTISE_NAVIGATION_GROUPS.map((group) => (
                <nav key={group.label}>
                  <Stack gap="sm">
                    <Caption tone="accent" className="text-xs uppercase tracking-wider">
                      {group.label}
                    </Caption>
                    <ul className="space-y-rhythm-sm">
                      {group.slugs.map((slug) => {
                        const area = EXPERTISE_BY_SLUG[slug];

                        return (
                          <li key={slug}>
                            <Link href={`/expertise/${slug}`} className={footerLinkClassName}>
                              {area.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </Stack>
                </nav>
              ))}
            </div>
          </div>

          <div className="border-t border-border/40 pt-rhythm-md md:pt-rhythm-lg">
            <Caption tone="muted">
              © {new Date().getFullYear()} Al Marfa Technologies. All rights reserved.
            </Caption>
          </div>
        </Stack>
      </Container>
    </footer>
  );
}
