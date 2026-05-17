import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "../../lib/cn";

type SectionSpacing = "compact" | "default" | "spacious";
type SectionSurface = "default" | "editorial" | "raised";

type SectionProps<TElement extends ElementType = "section"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
  spacing?: SectionSpacing;
  surface?: SectionSurface;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className" | "surface">;

const sectionSpacingClassNames: Record<SectionSpacing, string> = {
  compact: "py-section-compact",
  default: "py-section",
  spacious: "py-section-spacious",
};

const sectionSurfaceClassNames: Record<SectionSurface, string> = {
  default: "",
  editorial: "editorial-section",
  raised: "editorial-section editorial-section-surface",
};

export function Section<TElement extends ElementType = "section">({
  as,
  children,
  className,
  spacing = "default",
  surface = "default",
  ...props
}: SectionProps<TElement>) {
  const Component = as ?? "section";

  return (
    <Component
      className={cn(
        sectionSpacingClassNames[spacing],
        sectionSurfaceClassNames[surface],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
