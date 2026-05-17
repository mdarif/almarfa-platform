import { Caption, Stack } from "@repo/ui";

import type { MdxHeading } from "@/app/insights/_components/mdx-content";

type ArticleTableOfContentsProps = {
  headings: MdxHeading[];
};

export function ArticleTableOfContents({ headings }: ArticleTableOfContentsProps) {
  if (headings.length < 2) {
    return null;
  }

  return (
    <details className="group border-y border-border py-rhythm-md md:contents">
      <summary className="editorial-disclosure-summary list-none text-sm font-medium text-foreground-secondary transition-colors hover:text-accent md:hidden [&::-webkit-details-marker]:hidden">
        Article outline
      </summary>
      <nav
        aria-label="Article sections"
        className="article-outline mt-rhythm-sm md:mt-0"
      >
        <Stack gap="sm">
          <Caption tone="accent" className="hidden md:block">
            Article outline
          </Caption>
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
    </details>
  );
}
