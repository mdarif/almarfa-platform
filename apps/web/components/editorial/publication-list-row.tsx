import type { ReactNode } from "react";
import { Body, Stack } from "@repo/ui";

import { cn } from "@/lib/utils";

type PublicationListRowProps = {
  title: ReactNode;
  meta?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Stronger hierarchy for featured publication rows */
  featured?: boolean;
};

export function PublicationListRow({
  title,
  meta,
  description,
  children,
  className,
  featured = false,
}: PublicationListRowProps) {
  return (
    <article
      className={cn(
        "border-t border-border py-rhythm-md md:py-rhythm-lg",
        featured && "pt-rhythm-lg md:pt-rhythm-xl",
        className,
      )}
    >
      <Stack gap="sm">
        {meta}
        {title}
        {description ? (
          typeof description === "string" ? (
            <Body measure="content" size={featured ? "large" : "reading"}>
              {description}
            </Body>
          ) : (
            description
          )
        ) : null}
        {children}
      </Stack>
    </article>
  );
}
