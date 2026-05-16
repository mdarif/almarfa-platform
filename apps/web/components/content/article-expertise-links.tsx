import type { ArticleSummary } from "@repo/content";
import Link from "next/link";

import {
  getArticleExpertiseSlugs,
  getExpertisePath,
  getExpertiseBySlug,
  type ExpertiseSlug,
} from "@/lib/expertise";

type ArticleExpertiseLinksProps = {
  article: ArticleSummary;
  slugs?: ExpertiseSlug[];
  className?: string;
};

export function ArticleExpertiseLinks({
  article,
  slugs,
  className = "",
}: ArticleExpertiseLinksProps) {
  const expertiseSlugs = slugs ?? getArticleExpertiseSlugs(article);

  if (expertiseSlugs.length === 0) {
    return null;
  }

  return (
    <ul
      className={`flex flex-wrap gap-x-3 gap-y-1 text-caption font-medium uppercase leading-caption tracking-[0.08em] text-foreground-muted ${className}`}
      aria-label="Expertise areas"
    >
      {expertiseSlugs.map((slug) => {
        const area = getExpertiseBySlug(slug);
        if (!area) return null;

        return (
          <li key={slug}>
            <Link
              className="transition-colors hover:text-accent"
              href={getExpertisePath(slug)}
            >
              {area.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
