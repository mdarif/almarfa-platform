import { getArticleCollection, formatArticleDate } from "@repo/content";
import { createPageMetadata } from "@repo/seo";
import { Caption, Container, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

import {
  ArticleExpertiseLinks,
  ExpertiseTopicNav,
} from "@/components/content";
import {
  PageEditorialHero,
  PublicationIndexPageSection,
  PublicationIndexSection,
  PublicationListRow,
} from "@/components/editorial";
import { groupInsightsByExpertise } from "@/lib/expertise";

export const metadata = createPageMetadata({
  description:
    "Architecture-focused frontend engineering insights from Al Marfa Technologies.",
  pathname: "/insights",
  title: "Engineering Insights",
});

export default function InsightsPage() {
  const articles = getArticleCollection("insights");
  const [featuredArticle, ...remainingArticles] = articles;
  const topicGroups = groupInsightsByExpertise();
  const showTopicGroups = articles.length > 1 && topicGroups.length > 0;

  return (
    <main>
      <PageEditorialHero
        atmosphere="insights"
        eyebrow="Engineering Atlas"
        title="Frontend architecture insights for durable platforms."
        description="Long-form architecture notes on design systems, frontend governance, platform engineering, and the operational decisions that make shared UI infrastructure sustainable."
        titleAs="display"
      />

      {featuredArticle ? (
        <Section spacing="compact">
          <Container size="content">
            <hr
              className="editorial-rule mt-rhythm-md max-w-measure-narrow"
              aria-hidden
            />
            <PublicationListRow
              featured
              className="border-t-0 pt-0"
              meta={
                <Caption as="p">
                  {featuredArticle.frontmatter.category} /{" "}
                  <time dateTime={featuredArticle.frontmatter.publishedAt}>
                    {formatArticleDate(featuredArticle.frontmatter.publishedAt)}
                  </time>
                </Caption>
              }
              title={
                <Heading as="h2" size="list">
                  <Link
                    className="transition-colors hover:text-accent"
                    href={`/insights/${featuredArticle.slug}`}
                  >
                    {featuredArticle.frontmatter.title}
                  </Link>
                </Heading>
              }
              description={featuredArticle.frontmatter.description}
            >
              <ArticleExpertiseLinks article={featuredArticle} />
            </PublicationListRow>
          </Container>
        </Section>
      ) : null}

      <PublicationIndexPageSection>
        <Section spacing="compact" surface="raised">
          <Container size="content">
            <ExpertiseTopicNav />
          </Container>
        </Section>

        {showTopicGroups ? (
          <PublicationIndexSection
            aria-label="Insights by expertise area"
            eyebrow="By topic"
          >
            <ol className="border-t border-border">
              {topicGroups.map((group) => (
                <li
                  className="border-b border-border py-rhythm-md md:py-rhythm-lg"
                  key={group.slug}
                >
                  <Stack gap="md">
                    <Link href={`/expertise/${group.slug}`} className="group">
                      <Heading
                        as="h2"
                        className="max-w-measure-wide text-balance transition-colors group-hover:text-accent"
                        size="section"
                      >
                        {group.area.label}
                      </Heading>
                    </Link>
                    <ul className="space-y-rhythm-sm">
                      {group.articles.map((article) => (
                        <li key={article.slug}>
                          <Link
                            className="text-body text-foreground-secondary transition-colors hover:text-accent"
                            href={`/insights/${article.slug}`}
                          >
                            {article.frontmatter.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Stack>
                </li>
              ))}
            </ol>
          </PublicationIndexSection>
        ) : null}

        <PublicationIndexSection aria-label="Published insights" eyebrow="Latest">
          <Stack gap="lg">
            {remainingArticles.map((article) => (
              <PublicationListRow
                key={article.slug}
                meta={
                  <Caption as="p">
                    {article.frontmatter.category} /{" "}
                    <time dateTime={article.frontmatter.publishedAt}>
                      {formatArticleDate(article.frontmatter.publishedAt)}
                    </time>
                  </Caption>
                }
                title={
                  <Heading as="h2" size="list">
                    <Link
                      className="transition-colors hover:text-accent"
                      href={`/insights/${article.slug}`}
                    >
                      {article.frontmatter.title}
                    </Link>
                  </Heading>
                }
                description={article.frontmatter.description}
              >
                <ArticleExpertiseLinks article={article} />
              </PublicationListRow>
            ))}
          </Stack>
        </PublicationIndexSection>
      </PublicationIndexPageSection>
    </main>
  );
}
