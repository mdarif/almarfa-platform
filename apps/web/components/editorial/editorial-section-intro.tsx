import type { ReactNode } from "react";
import { Caption, Stack } from "@repo/ui";

import { cn } from "@/lib/utils";

type EditorialSectionIntroProps = {
  eyebrow: string;
  children: ReactNode;
  /** Compact tightens intro rhythm directly below a detail hero */
  density?: "default" | "compact";
  className?: string;
};

/** Section intro with anchor line — use sparingly below the page hero. */
export function EditorialSectionIntro({
  eyebrow,
  children,
  density = "default",
  className,
}: EditorialSectionIntroProps) {
  return (
    <Stack
      gap={density === "compact" ? "sm" : "md"}
      className={cn("max-w-measure-wide", className)}
    >
      <Stack gap="xs">
        <span aria-hidden className="editorial-anchor-line" />
        <Caption tone="accent">{eyebrow}</Caption>
      </Stack>
      {children}
    </Stack>
  );
}
