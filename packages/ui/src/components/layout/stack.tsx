import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "../../lib/cn";

type StackGap = "xs" | "sm" | "md" | "lg" | "xl";
type StackAlign = "start" | "center" | "end" | "stretch";

type StackProps<TElement extends ElementType = "div"> = {
  align?: StackAlign;
  as?: TElement;
  children: ReactNode;
  className?: string;
  gap?: StackGap;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

const stackGapClassNames: Record<StackGap, string> = {
  xs: "gap-rhythm-xs",
  sm: "gap-rhythm-sm",
  md: "gap-rhythm-md",
  lg: "gap-rhythm-lg",
  xl: "gap-rhythm-xl",
};

const stackAlignClassNames: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export function Stack<TElement extends ElementType = "div">({
  align = "stretch",
  as,
  children,
  className,
  gap = "md",
  ...props
}: StackProps<TElement>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "flex flex-col",
        stackGapClassNames[gap],
        stackAlignClassNames[align],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
