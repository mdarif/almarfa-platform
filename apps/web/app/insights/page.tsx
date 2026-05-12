import { getArticleCollection, formatArticleDate } from "@repo/content";
import { Body, Caption, Container, Display, Section, Stack } from "@repo/ui";
import Link from "next/link";

export const metadata = {
  title: "Engineering Insights | Al Marfa Technologies",
  description:
    "Architecture-focused frontend engineering insights from Al Marfa Technologies.",
};

export default function InsightsPage() {
  const articles = getArticleCollection("insights");

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

            <section aria-label="Published insights">
              <Stack gap="lg">
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
