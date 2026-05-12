import type { ArticleFrontmatter } from "./types";

type FrontmatterValue = string | string[];

const frontmatterPattern = /^---\r?\n(?<frontmatter>[\s\S]*?)\r?\n---\r?\n?(?<body>[\s\S]*)$/;

export function parseMdxFile(source: string) {
  const match = source.match(frontmatterPattern);

  if (!match?.groups) {
    throw new Error("Content file is missing frontmatter.");
  }

  return {
    body: match.groups.body ?? "",
    frontmatter: parseFrontmatter(match.groups.frontmatter ?? ""),
  };
}

function parseFrontmatter(source: string): ArticleFrontmatter {
  const values: Record<string, FrontmatterValue> = {};

  for (const line of source.split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
    values[key] = parseFrontmatterValue(rawValue);
  }

  return normalizeFrontmatter(values);
}

function parseFrontmatterValue(value: string): FrontmatterValue {
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => unwrapQuotedValue(item.trim()))
      .filter(Boolean);
  }

  return unwrapQuotedValue(value);
}

function unwrapQuotedValue(value: string) {
  return value.replace(/^["']|["']$/g, "");
}

function normalizeFrontmatter(
  values: Record<string, FrontmatterValue>,
): ArticleFrontmatter {
  return {
    title: requiredString(values, "title"),
    description: requiredString(values, "description"),
    publishedAt: requiredString(values, "publishedAt"),
    updatedAt: optionalString(values, "updatedAt"),
    author: optionalString(values, "author"),
    category: requiredString(values, "category"),
    tags: arrayValue(values.tags),
    readingTime: optionalString(values, "readingTime"),
  };
}

function requiredString(
  values: Record<string, FrontmatterValue>,
  key: string,
) {
  const value = values[key];

  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Missing required frontmatter field: ${key}`);
  }

  return value;
}

function optionalString(
  values: Record<string, FrontmatterValue>,
  key: string,
) {
  const value = values[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function arrayValue(value: FrontmatterValue | undefined) {
  return Array.isArray(value) ? value : [];
}
