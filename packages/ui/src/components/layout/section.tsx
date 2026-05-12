import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "../../lib/cn";

type SectionSpacing = "compact" | "default" | "spacious";

type SectionProps<TElement extends ElementType = "section"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
  spacing?: SectionSpacing;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

const sectionSpacingClassNames: Record<SectionSpacing, string> = {
  compact: "py-section-compact",
  default: "py-section",
  spacious: "py-section-spacious",
};

export function Section<TElement extends ElementType = "section">({
  as,
  children,
  className,
  spacing = "default",
  ...props
}: SectionProps<TElement>) {
  const Component = as ?? "section";

  return (
    <Component
      className={cn(sectionSpacingClassNames[spacing], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
