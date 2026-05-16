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
import {
  ArticleExpertiseLinks,
  ExpertiseContext,
  RelatedTopicsSection,
} from "@/components/content";
import {
  getArticleClusterLabels,
  getArticleExpertiseSlugs,
  getArticleSemanticKeywords,
  getExpertiseBySlug,
  getExpertisePath,
  getPrimaryExpertiseSlug,
  getRelatedInsightsForArticle,
} from "@/lib/expertise";
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

  return createArticleMetadata(article, {
    clusterLabels: getArticleClusterLabels(article),
    semanticKeywords: getArticleSemanticKeywords(article),
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug("insights", slug);

  if (!article) {
    notFound();
  }

  const expertiseSlugs = getArticleExpertiseSlugs(article);
  const primarySlug = getPrimaryExpertiseSlug(article);
  const primaryExpertise = primarySlug ? getExpertiseBySlug(primarySlug) : undefined;
  const clusterLabels = getArticleClusterLabels(article);

  const breadcrumbs = [
    { name: "Home", url: createCanonicalUrl("/") },
    { name: "Insights", url: createCanonicalUrl("/insights") },
    ...(primaryExpertise
      ? [
          {
            name: primaryExpertise.label,
            url: createCanonicalUrl(getExpertisePath(primaryExpertise.slug)),
          },
        ]
      : []),
    {
      name: article.frontmatter.title,
      url: createCanonicalUrl(`/insights/${article.slug}`),
    },
  ];

  const relatedInsights = getRelatedInsightsForArticle(article);

  return (
    <main>
      <JsonLdScript
        data={[
          createArticleSchema(article, { about: clusterLabels }),
          createBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <Section spacing="spacious">
        <Container as="article" size="content">
          <Stack gap="xl">
            <header>
              <Stack gap="md" className="max-w-measure-wide">
                <Breadcrumb items={breadcrumbs} />
                <Caption tone="accent">{article.frontmatter.category}</Caption>
                <ArticleExpertiseLinks article={article} slugs={expertiseSlugs} />
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

            {primaryExpertise ? (
              <ExpertiseContext
                title={primaryExpertise.label}
                description={primaryExpertise.shortDescription}
                href={getExpertisePath(primaryExpertise.slug)}
              />
            ) : null}
          </Stack>
        </Container>
      </Section>

      {relatedInsights.length > 0 ? (
        <RelatedTopicsSection
          title={
            primaryExpertise
              ? `Related insights on ${primaryExpertise.label}`
              : "Related insights"
          }
          topics={relatedInsights.map((item) => ({
            id: item.slug,
            title: item.frontmatter.title,
            description: item.frontmatter.description,
            href: `/insights/${item.slug}`,
            type: "insight",
            cluster: getPrimaryExpertiseSlug(item),
          }))}
        />
      ) : null}
    </main>
  );
}
