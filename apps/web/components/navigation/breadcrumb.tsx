/**
 * Breadcrumb Navigation
 * 
 * Semantic breadcrumb system for article and page wayfinding.
 * Supports:
 * - Page hierarchy (Insights > Topic > Article)
 * - Authority cluster context
 * - Responsive display
 */

import Link from "next/link";
import { Caption } from "@repo/ui";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-rhythm-sm ${className}`}
    >
      <ol className="flex items-center gap-rhythm-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-rhythm-sm">
            {item.href && !item.isActive ? (
              <>
                <Link
                  href={item.href}
                  className="text-xs text-text/60 hover:text-text/80 transition-colors"
                >
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <span className="text-text/30">/</span>
                )}
              </>
            ) : (
              <>
                <Caption tone="secondary" className="text-xs">
                  {item.label}
                </Caption>
                {index < items.length - 1 && (
                  <span className="text-text/30">/</span>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Insight Breadcrumb
 * Specialized breadcrumb for insight articles
 */
interface InsightBreadcrumbProps {
  title: string;
  clusterLabel?: string;
  clusterSlug?: string;
}

export function InsightBreadcrumb({
  title,
  clusterLabel,
  clusterSlug,
}: InsightBreadcrumbProps) {
  const items: BreadcrumbItem[] = [
    { label: "Insights", href: "/insights" },
  ];

  if (clusterLabel && clusterSlug) {
    items.push({
      label: clusterLabel,
      href: `/insights?cluster=${clusterSlug}`,
    });
  }

  items.push({
    label: title,
    isActive: true,
  });

  return <Breadcrumb items={items} className="mb-rhythm-lg" />;
}
