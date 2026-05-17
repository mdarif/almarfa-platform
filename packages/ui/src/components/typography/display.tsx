import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "../../lib/cn";
import { measureClassNames, toneClassNames, type TextMeasure, type TextTone } from "./shared";

type DisplayProps<TElement extends ElementType = "h1"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
  measure?: TextMeasure;
  tone?: TextTone;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

export function Display<TElement extends ElementType = "h1">({
  as,
  children,
  className,
  measure = "wide",
  tone = "primary",
  ...props
}: DisplayProps<TElement>) {
  const Component = as ?? "h1";

  return (
    <Component
      className={cn(
        toneClassNames[tone],
        measureClassNames[measure],
        "text-display font-semibold leading-display tracking-normal text-balance text-pretty",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
