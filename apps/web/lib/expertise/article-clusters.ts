import type { ArticleSummary } from "@repo/content";

import {
  EXPERTISE_BY_SLUG,
  EXPERTISE_LIST,
  EXPERTISE_SLUGS,
  type ExpertiseSlug,
} from "./taxonomy";

export function isExpertiseSlug(slug: string): slug is ExpertiseSlug {
  return (EXPERTISE_SLUGS as readonly string[]).includes(slug);
}

export function getArticleClusterLabels(article: ArticleSummary): string[] {
  return resolveArticleExpertiseSlugs(article).map(
    (slug) => EXPERTISE_BY_SLUG[slug].label,
  );
}

export function resolveArticleExpertiseSlugs(
  article: ArticleSummary,
): ExpertiseSlug[] {
  const explicit = article.frontmatter.clusters ?? [];

  if (explicit.length > 0) {
    const invalidSlugs = explicit.filter((slug) => !isExpertiseSlug(slug));

    if (invalidSlugs.length > 0) {
      throw new Error(
        `Invalid expertise cluster slug(s) in ${article.slug}: ${invalidSlugs.join(", ")}`,
      );
    }

    return explicit.filter(isExpertiseSlug);
  }

  return inferExpertiseFromMetadata(article);
}

function inferExpertiseFromMetadata(article: ArticleSummary): ExpertiseSlug[] {
  const haystack = [article.frontmatter.category, ...article.frontmatter.tags]
    .join(" ")
    .toLowerCase();

  const matches = new Set<ExpertiseSlug>();

  for (const area of EXPERTISE_LIST) {
    const signals = [area.label, ...area.semanticKeywords].map((value) =>
      value.toLowerCase(),
    );

    if (signals.some((signal) => haystack.includes(signal))) {
      matches.add(area.slug);
    }
  }

  if (haystack.includes("storybook")) {
    matches.add("storybook-ecosystems");
  }

  if (haystack.includes("governance")) {
    matches.add("frontend-governance");
  }

  if (haystack.includes("monorepo") || haystack.includes("nx")) {
    matches.add("nx-monorepos");
  }

  if (haystack.includes("angular")) {
    matches.add("angular-enterprise-patterns");
  }

  return [...matches];
}
