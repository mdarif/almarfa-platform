import type { Article } from "./types";

export function createArticleMetadata(article: Article) {
  return {
    description: article.frontmatter.description,
    openGraph: {
      description: article.frontmatter.description,
      title: article.frontmatter.title,
      type: "article",
    },
    title: `${article.frontmatter.title} | Al Marfa Technologies`,
  };
}

export function formatArticleDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00.000Z`));
}
