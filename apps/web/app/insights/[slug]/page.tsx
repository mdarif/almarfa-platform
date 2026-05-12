import {
  formatArticleDate,
  getArticleBySlug,
  getArticleSlugs,
} from "@repo/content";
import {
  createArticleMetadata,
  createArticleSchema,
  createBreadcrumbSchema,
  createCanonicalUrl,
} from "@repo/seo";
import { Body, Caption, Container, Display, Section, Stack } from "@repo/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLdScript } from "../../_components/json-ld";
import { MdxContent } from "../_components/mdx-content";
import { Breadcrumb } from "./breadcrumb";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getArticleSlugs("insights").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug("insights", slug);

  if (!article) {
    return {};
  }

  return createArticleMetadata(article);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug("insights", slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: createCanonicalUrl("/") },
    { name: "Insights", url: createCanonicalUrl("/insights") },
    {
      name: article.frontmatter.title,
      url: createCanonicalUrl(`/insights/${article.slug}`),
    },
  ];

  return (
    <main>
      <JsonLdScript
        data={[createArticleSchema(article), createBreadcrumbSchema(breadcrumbs)]}
      />
      <Section spacing="spacious">
        <Container as="article" size="content">
          <Stack gap="xl">
            <header>
              <Stack gap="md" className="max-w-measure-wide">
                <Breadcrumb items={breadcrumbs} />
                <Caption tone="accent">{article.frontmatter.category}</Caption>
                <Display>{article.frontmatter.title}</Display>
                <Body size="large">{article.frontmatter.description}</Body>
                <Caption as="p">
                  <time dateTime={article.frontmatter.publishedAt}>
                    {formatArticleDate(article.frontmatter.publishedAt)}
                  </time>
                  {article.frontmatter.readingTime
                    ? ` / ${article.frontmatter.readingTime}`
                    : null}
                </Caption>
              </Stack>
            </header>

            <MdxContent source={article.body} />
          </Stack>
        </Container>
      </Section>
    </main>
  );
}
