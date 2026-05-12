import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "../../lib/cn";

type ContainerSize = "page" | "content" | "narrow" | "measure";

type ContainerProps<TElement extends ElementType = "div"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

const containerSizeClassNames: Record<ContainerSize, string> = {
  page: "max-w-page",
  content: "max-w-content",
  narrow: "max-w-narrow",
  measure: "max-w-measure",
};

export function Container<TElement extends ElementType = "div">({
  as,
  children,
  className,
  size = "page",
  ...props
}: ContainerProps<TElement>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "mx-auto w-full px-layout-sm md:px-layout-md lg:px-layout-lg",
        containerSizeClassNames[size],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
