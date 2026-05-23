import type { ReactNode } from "react";

import {
  Body,
  Caption,
  Container,
  Display,
  Heading,
  Section,
  Stack,
} from "@repo/ui";

import type { TextMeasure } from "@repo/ui";

import { cn } from "@/lib/utils";

import {
  PageHeroBackdrop,
  type PageHeroAtmosphere,
} from "./page-hero-backdrop";

type PageEditorialHeroVariant = "index" | "detail";

type PageEditorialHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Index pages use full section rhythm; detail pages tighten title–dek and hero tail. */
  variant?: PageEditorialHeroVariant;
  /** Display for publication index heroes; heading for standard pages */
  titleAs?: "display" | "heading";
  /** Hero title measure (default hero) */
  titleMeasure?: TextMeasure;
  /** Page-specific radial wash variant */
  atmosphere?: PageHeroAtmosphere;
  /** CSS blueprint grid on the section (default true) */
  showGrid?: boolean;
  /** Subtle radial accent wash (default true) */
  showBackdrop?: boolean;
  prepend?: ReactNode;
  className?: string;
  titleClassName?: string;
};

/** Shared hero title measure — applied to Display and Heading */
export const heroTitleClassName = "max-w-measure-hero text-balance text-pretty";

const displayTitleClassName =
  "max-w-[13ch] xs:max-w-[16ch] sm:max-w-measure-hero";

/** Tighter ch caps for long expertise / publication titles at 320px */
const detailTitleClassName =
  "max-w-[11ch] xs:max-w-[14ch] sm:max-w-measure-hero";

/** Index headlines that use Heading (not display) */
const indexHeadingTitleClassName = "max-w-[22ch] sm:max-w-measure-hero";

export function PageEditorialHero({
  eyebrow,
  title,
  description,
  variant = "index",
  titleAs = "heading",
  titleMeasure = "hero",
  atmosphere = "publication",
  showGrid = true,
  showBackdrop = true,
  prepend,
  className,
  titleClassName,
}: PageEditorialHeroProps) {
  const Title = titleAs === "display" ? Display : Heading;
  const isDetail = variant === "detail";

  return (
    <Section
      spacing={isDetail ? "compact" : "default"}
      surface={showGrid ? "editorial" : "default"}
      className={cn(
        "editorial-hero",
        isDetail
          ? "md:pt-[calc(var(--spacing-section-compact)+0.25rem)] !pb-rhythm-lg"
          : "md:pt-[calc(var(--spacing-section)+0.25rem)]",
        className,
      )}
    >
      {showBackdrop ? <PageHeroBackdrop atmosphere={atmosphere} /> : null}
      <Container as="header" size="content" className="relative z-[1]">
        <Stack
          className={cn(
            "max-w-measure-wide",
            isDetail
              ? "gap-rhythm-sm md:gap-rhythm-md"
              : "gap-rhythm-md md:gap-rhythm-lg",
          )}
        >
          {prepend}

          <Stack gap="xs">
            <span aria-hidden className="editorial-anchor-line" />
            <Caption as="p" tone="accent">
              {eyebrow}
            </Caption>
          </Stack>

          <Stack gap={isDetail ? "md" : "lg"}>
            <Title
              measure={titleMeasure}
              className={cn(
                heroTitleClassName,
                titleAs === "display"
                  ? displayTitleClassName
                  : indexHeadingTitleClassName,
                isDetail ? detailTitleClassName : undefined,
                titleClassName,
              )}
            >
              {title}
            </Title>

            {description ? (
              <Stack gap={isDetail ? "sm" : "md"}>
                <hr className="editorial-rule max-w-measure-narrow" />
                {typeof description === "string" ? (
                  <Body size="large" measure="content">
                    {description}
                  </Body>
                ) : (
                  description
                )}
              </Stack>
            ) : null}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
