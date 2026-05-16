import { getArticleCollection, formatArticleDate } from "@repo/content";
import { createPageMetadata } from "@repo/seo";
import { Body, Caption, Container, Display, Section, Stack } from "@repo/ui";
import Link from "next/link";

import {
  ArticleExpertiseLinks,
  ExpertiseTopicNav,
} from "@/components/content";
import { groupInsightsByExpertise } from "@/lib/expertise";

export const metadata = createPageMetadata({
  description:
    "Architecture-focused frontend engineering insights from Al Marfa Technologies.",
  pathname: "/insights",
  title: "Engineering Insights",
});

export default function InsightsPage() {
  const articles = getArticleCollection("insights");
  const topicGroups = groupInsightsByExpertise();
  const showTopicGroups = articles.length > 1 && topicGroups.length > 0;

  return (
    <main>
      <Section spacing="spacious">
        <Container size="content">
          <Stack gap="xl">
            <Stack gap="md" className="max-w-measure-wide">
              <Caption tone="accent">Engineering Atlas</Caption>
              <Display>Frontend architecture insights for durable platforms.</Display>
              <Body size="large">
                Long-form architecture notes on design systems, frontend
                governance, platform engineering, and the operational decisions
                that make shared UI infrastructure sustainable.
              </Body>
            </Stack>

            <ExpertiseTopicNav />

            {showTopicGroups ? (
              <section aria-label="Insights by expertise area">
                <Stack gap="lg">
                  <Caption tone="accent">By topic</Caption>
                  <ol className="border-t border-border">
                    {topicGroups.map((group) => (
                      <li
                        className="border-b border-border py-rhythm-lg"
                        key={group.slug}
                      >
                        <Stack gap="md">
                          <Link
                            href={`/expertise/${group.slug}`}
                            className="group"
                          >
                            <h2 className="max-w-measure text-heading font-semibold leading-heading tracking-normal text-foreground transition-colors group-hover:text-accent">
                              {group.area.label}
                            </h2>
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
                </Stack>
              </section>
            ) : null}

            <section aria-label="Published insights">
              <Stack gap="lg">
                <Caption tone="accent">Latest</Caption>
                {articles.map((article) => (
                  <article
                    className="border-t border-border pt-rhythm-lg"
                    key={article.slug}
                  >
                    <Stack gap="sm">
                      <Caption as="p">
                        {article.frontmatter.category} /{" "}
                        <time dateTime={article.frontmatter.publishedAt}>
                          {formatArticleDate(article.frontmatter.publishedAt)}
                        </time>
                      </Caption>

                      <ArticleExpertiseLinks article={article} />

                      <h2 className="max-w-measure text-heading font-semibold leading-heading tracking-normal text-foreground">
                        <Link
                          className="transition-colors hover:text-accent"
                          href={`/insights/${article.slug}`}
                        >
                          {article.frontmatter.title}
                        </Link>
                      </h2>

                      <Body measure="content">
                        {article.frontmatter.description}
                      </Body>
                    </Stack>
                  </article>
                ))}
              </Stack>
            </section>
          </Stack>
        </Container>
      </Section>
    </main>
  );
}
