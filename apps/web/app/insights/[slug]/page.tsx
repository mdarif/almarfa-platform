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
import { Body, Caption, Container, Section, Stack } from "@repo/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLdScript } from "../../_components/json-ld";
import {
  ArticleExpertiseLinks,
  ArticleTableOfContents,
  ExpertiseContext,
  RelatedTopicsSection,
} from "@/components/content";
import { PageEditorialHero } from "@/components/editorial";
import {
  getArticleClusterLabels,
  getArticleExpertiseSlugs,
  getArticleSemanticKeywords,
  getExpertiseBySlug,
  getExpertisePath,
  getPrimaryExpertiseSlug,
  getRelatedInsightsForArticle,
} from "@/lib/expertise";
import { getMdxHeadings, MdxContent } from "../_components/mdx-content";
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
  const headings = getMdxHeadings(article.body);

  const schemaBreadcrumbs = [
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

  const uiBreadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    ...(primaryExpertise
      ? [
          {
            name: primaryExpertise.label,
            path: getExpertisePath(primaryExpertise.slug),
          },
        ]
      : []),
    {
      name: article.frontmatter.title,
      path: `/insights/${article.slug}`,
    },
  ];

  const publishedLabel = formatArticleDate(article.frontmatter.publishedAt);
  const readingTimeLabel = article.frontmatter.readingTime
    ? ` / ${article.frontmatter.readingTime}`
    : "";

  const relatedInsights = getRelatedInsightsForArticle(article);
  const nextInsight = relatedInsights[0];

  return (
    <main>
      <JsonLdScript
        data={[
          createArticleSchema(article, { about: clusterLabels }),
          createBreadcrumbSchema(schemaBreadcrumbs),
        ]}
      />
      <PageEditorialHero
        variant="detail"
        atmosphere="publication"
        eyebrow={article.frontmatter.category}
        title={article.frontmatter.title}
        description={
          <Stack gap="sm">
            <Body size="large" measure="content">
              {article.frontmatter.description}
            </Body>
            <Caption as="p" tone="muted">
              <time dateTime={article.frontmatter.publishedAt}>{publishedLabel}</time>
              {readingTimeLabel}
            </Caption>
          </Stack>
        }
        titleAs="display"
        prepend={<Breadcrumb items={uiBreadcrumbs} />}
        showGrid={false}
      />

      <Section spacing="default">
        <Container as="article" size="content">
          <Stack gap="xl">
            {expertiseSlugs.length > 0 ? (
              <ArticleExpertiseLinks article={article} slugs={expertiseSlugs} />
            ) : null}

            <ArticleTableOfContents headings={headings} />

            <MdxContent source={article.body} />

            {primaryExpertise ? (
              <ExpertiseContext
                title={primaryExpertise.label}
                description={primaryExpertise.shortDescription}
                href={getExpertisePath(primaryExpertise.slug)}
              />
            ) : null}

            <NextReadingSection
              expertiseHref={
                primaryExpertise ? getExpertisePath(primaryExpertise.slug) : undefined
              }
              expertiseTitle={primaryExpertise?.label}
              insight={
                nextInsight
                  ? {
                      href: `/insights/${nextInsight.slug}`,
                      title: nextInsight.frontmatter.title,
                    }
                  : undefined
              }
            />
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
            publishedAt: item.frontmatter.publishedAt,
            readingTime: item.frontmatter.readingTime,
          }))}
        />
      ) : null}
    </main>
  );
}

function NextReadingSection({
  expertiseHref,
  expertiseTitle,
  insight,
}: {
  expertiseHref?: string;
  expertiseTitle?: string;
  insight?: {
    href: string;
    title: string;
  };
}) {
  if (!expertiseHref && !insight) {
    return null;
  }

  return (
    <aside
      aria-label="Next reading"
      className="border-t border-border pt-rhythm-lg"
    >
      <Stack gap="md">
        <Caption tone="accent">Continue reading</Caption>
        <ul className="space-y-rhythm-sm">
          {insight ? (
            <li>
              <Link
                className="text-body text-foreground transition-colors hover:text-accent"
                href={insight.href}
              >
                Next insight: {insight.title}
              </Link>
            </li>
          ) : null}
          {expertiseHref && expertiseTitle ? (
            <li>
              <Link
                className="text-body text-foreground-secondary transition-colors hover:text-accent"
                href={expertiseHref}
              >
                Explore the {expertiseTitle} knowledge area
              </Link>
            </li>
          ) : null}
          <li>
            <Link
              className="text-body text-foreground-secondary transition-colors hover:text-accent"
              href="/insights"
            >
              Return to the insights library
            </Link>
          </li>
        </ul>
      </Stack>
    </aside>
  );
}
