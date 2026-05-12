import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "../../lib/cn";
import { measureClassNames, toneClassNames, type TextMeasure, type TextTone } from "./shared";

type CaptionProps<TElement extends ElementType = "p"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
  measure?: TextMeasure;
  tone?: TextTone;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

export function Caption<TElement extends ElementType = "p">({
  as,
  children,
  className,
  measure = "narrow",
  tone = "muted",
  ...props
}: CaptionProps<TElement>) {
  const Component = as ?? "p";

  return (
    <Component
      className={cn(
        toneClassNames[tone],
        measureClassNames[measure],
        "text-caption font-medium uppercase leading-caption tracking-[0.08em]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
