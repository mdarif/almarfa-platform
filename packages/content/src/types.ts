export type ArticleCollection = "insights";

export type ArticleFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  category: string;
  tags: string[];
  /** Expertise taxonomy slugs — drives semantic clustering and cross-linking */
  clusters?: string[];
  readingTime?: string;
};

export type Article = {
  body: string;
  collection: ArticleCollection;
  frontmatter: ArticleFrontmatter;
  metadata: {
    description: string;
    publishedAt: string;
    title: string;
  };
  path: string;
  slug: string;
};

export type ArticleSummary = Omit<Article, "body">;
