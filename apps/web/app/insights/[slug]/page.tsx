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
import Link from "next/link";
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
import { getMdxHeadings, MdxContent, type MdxHeading } from "../_components/mdx-content";
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
  const nextInsight = relatedInsights[0];

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

function ArticleTableOfContents({ headings }: { headings: MdxHeading[] }) {
  if (headings.length < 2) {
    return null;
  }

  return (
    <nav
      aria-label="Article sections"
      className="border-y border-border py-rhythm-md"
    >
      <Stack gap="sm">
        <Caption tone="accent">Article outline</Caption>
        <ol className="space-y-rhythm-xs">
          {headings.map((heading) => (
            <li
              className={heading.level === 3 ? "pl-rhythm-md" : undefined}
              key={heading.id}
            >
              <a
                className="text-body leading-body text-foreground-secondary transition-colors hover:text-accent"
                href={`#${heading.id}`}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ol>
      </Stack>
    </nav>
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
