import Link from "next/link";

import { cn } from "@/lib/utils";

export type UiBreadcrumbItem = {
  name: string;
  path: string;
};

type BreadcrumbProps = {
  items: readonly UiBreadcrumbItem[];
};

const linkClassName =
  "text-caption font-medium uppercase leading-caption tracking-[0.08em] text-foreground-muted transition-colors hover:text-accent";

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li className="flex items-center gap-2" key={item.path}>
              {index > 0 ? (
                <span aria-hidden="true" className={linkClassName}>
                  /
                </span>
              ) : null}
              {isCurrent ? (
                <span
                  aria-current="page"
                  className={cn(
                    "text-caption leading-caption text-foreground-secondary text-pretty normal-case",
                  )}
                >
                  {item.name}
                </span>
              ) : (
                <Link className={linkClassName} href={item.path}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
