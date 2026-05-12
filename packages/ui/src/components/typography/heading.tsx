import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "../../lib/cn";
import { measureClassNames, toneClassNames, type TextMeasure, type TextTone } from "./shared";

type HeadingProps<TElement extends ElementType = "h2"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
  measure?: TextMeasure;
  tone?: TextTone;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

export function Heading<TElement extends ElementType = "h2">({
  as,
  children,
  className,
  measure = "content",
  tone = "primary",
  ...props
}: HeadingProps<TElement>) {
  const Component = as ?? "h2";

  return (
    <Component
      className={cn(
        toneClassNames[tone],
        measureClassNames[measure],
        "text-heading font-semibold leading-heading tracking-normal",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
