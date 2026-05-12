import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "../../lib/cn";

type GridColumns = "one" | "two" | "three";
type GridGap = "sm" | "md" | "lg" | "xl";

type GridProps<TElement extends ElementType = "div"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
  columns?: GridColumns;
  gap?: GridGap;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

const gridColumnClassNames: Record<GridColumns, string> = {
  one: "grid-cols-1",
  two: "grid-cols-1 md:grid-cols-2",
  three: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

const gridGapClassNames: Record<GridGap, string> = {
  sm: "gap-grid-sm",
  md: "gap-grid-md",
  lg: "gap-grid-lg",
  xl: "gap-grid-xl",
};

export function Grid<TElement extends ElementType = "div">({
  as,
  children,
  className,
  columns = "two",
  gap = "lg",
  ...props
}: GridProps<TElement>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "grid",
        gridColumnClassNames[columns],
        gridGapClassNames[gap],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
