import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { parseMdxFile } from "./frontmatter";
import { slugFromFilename, slugify } from "./slug";
import type { Article, ArticleCollection } from "./types";

const collectionDirectoryNames: Record<ArticleCollection, string> = {
  insights: "insights",
};

export function getArticleCollection(collection: ArticleCollection) {
  return getArticles(collection).map((article) => ({
    collection: article.collection,
    frontmatter: article.frontmatter,
    metadata: article.metadata,
    path: article.path,
    slug: article.slug,
  }));
}

export function getArticles(collection: ArticleCollection): Article[] {
  const directory = getCollectionDirectory(collection);

  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory)
    .filter((filename) => /\.mdx?$/.test(filename))
    .map((filename) => readArticleFile(collection, filename))
    .sort(
      (left, right) =>
        new Date(right.frontmatter.publishedAt).getTime() -
        new Date(left.frontmatter.publishedAt).getTime(),
    );
}

export function getArticleBySlug(
  collection: ArticleCollection,
  slug: string,
) {
  return getArticles(collection).find((article) => article.slug === slug);
}

export function getArticleSlugs(collection: ArticleCollection) {
  return getArticleCollection(collection).map((article) => article.slug);
}

function readArticleFile(
  collection: ArticleCollection,
  filename: string,
): Article {
  const filePath = path.join(getCollectionDirectory(collection), filename);
  const { body, frontmatter } = parseMdxFile(readFileSync(filePath, "utf8"));
  const slug = slugFromFilename(filename);
  validateArticleSlug(filename, slug);

  return {
    body,
    collection,
    frontmatter,
    metadata: {
      description: frontmatter.description,
      publishedAt: frontmatter.publishedAt,
      title: frontmatter.title,
    },
    path: filePath,
    slug,
  };
}

function validateArticleSlug(filename: string, slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slugify(slug) !== slug) {
    throw new Error(
      `Invalid content filename: ${filename}. Use canonical kebab-case slugs.`,
    );
  }
}

function getCollectionDirectory(collection: ArticleCollection) {
  const directoryName = collectionDirectoryNames[collection];

  return path.join(
    getContentRoot(),
    directoryName,
  );
}

function getContentRoot() {
  return path.join(findWorkspaceRoot(), "content");
}

function findWorkspaceRoot(startDirectory = process.cwd()) {
  let currentDirectory = startDirectory;

  while (currentDirectory !== path.dirname(currentDirectory)) {
    if (existsSync(path.join(currentDirectory, "pnpm-workspace.yaml"))) {
      return currentDirectory;
    }

    currentDirectory = path.dirname(currentDirectory);
  }

  return startDirectory;
}
