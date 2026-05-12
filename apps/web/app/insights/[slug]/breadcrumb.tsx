import type { BreadcrumbItem } from "@repo/seo";
import Link from "next/link";

type BreadcrumbProps = {
  items: readonly BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-x-2 gap-y-1 text-caption font-medium uppercase leading-caption tracking-[0.08em] text-foreground-muted">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li className="flex items-center gap-2" key={item.url}>
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {isCurrent ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link className="transition-colors hover:text-accent" href={item.url}>
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
