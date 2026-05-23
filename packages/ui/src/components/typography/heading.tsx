import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "../../lib/cn";
import {
  measureClassNames,
  toneClassNames,
  type TextMeasure,
  type TextTone,
} from "./shared";

type HeadingSize = "default" | "list" | "article" | "section";

type HeadingProps<TElement extends ElementType = "h2"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
  measure?: TextMeasure;
  size?: HeadingSize;
  tone?: TextTone;
} & Omit<
  ComponentPropsWithoutRef<TElement>,
  "as" | "children" | "className" | "size"
>;

const headingSizeClassNames: Record<HeadingSize, string> = {
  default: "text-heading leading-heading",
  list: "text-heading-list leading-heading",
  article: "text-heading-article leading-heading",
  section: "text-heading-section leading-heading",
};

export function Heading<TElement extends ElementType = "h2">({
  as,
  children,
  className,
  measure = "content",
  size = "default",
  tone = "primary",
  ...props
}: HeadingProps<TElement>) {
  const Component = as ?? "h2";

  return (
    <Component
      className={cn(
        toneClassNames[tone],
        measureClassNames[measure],
        headingSizeClassNames[size],
        "font-semibold tracking-normal text-balance text-pretty",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
