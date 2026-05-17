import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "../../lib/cn";
import { measureClassNames, toneClassNames, type TextMeasure, type TextTone } from "./shared";

type BodySize = "default" | "large" | "reading";

type BodyProps<TElement extends ElementType = "p"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
  measure?: TextMeasure;
  size?: BodySize;
  tone?: TextTone;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className" | "size">;

const bodySizeClassNames: Record<BodySize, string> = {
  default: "text-body leading-body",
  large: "text-subheading font-medium leading-subheading",
  reading: "text-body-reading leading-body",
};

export function Body<TElement extends ElementType = "p">({
  as,
  children,
  className,
  measure = "content",
  size = "default",
  tone = "secondary",
  ...props
}: BodyProps<TElement>) {
  const Component = as ?? "p";

  return (
    <Component
      className={cn(
        toneClassNames[tone],
        measureClassNames[measure],
        bodySizeClassNames[size],
        "tracking-normal",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
