import { Body, Heading, Stack } from "@repo/ui";

type MdxContentProps = {
  source: string;
};

export type MdxHeading = {
  id: string;
  level: 2 | 3;
  title: string;
};

type ListBlock = {
  items: string[];
  type: "ordered" | "unordered";
};

export function MdxContent({ source }: MdxContentProps) {
  return (
    <Stack as="div" gap="xl" className="max-w-measure">
      {parseBlocks(source).map((block, index) => {
        if (block.type === "heading") {
          return (
            <Heading
              as={block.level === 2 ? "h2" : "h3"}
              className="group scroll-mt-24 pt-rhythm-md text-[clamp(1.5rem,3vw,2.25rem)]"
              id={block.id}
              key={`${block.id}-${index}`}
              measure="content"
            >
              {block.value}
              <a
                aria-label={`Link to ${block.value}`}
                className="ml-2 text-foreground-muted opacity-0 transition-opacity hover:text-accent group-hover:opacity-100 focus:opacity-100"
                href={`#${block.id}`}
              >
                #
              </a>
            </Heading>
          );
        }

        if (block.type === "list") {
          const List = block.value.type === "ordered" ? "ol" : "ul";

          return (
            <List
              className="ml-6 max-w-measure list-outside space-y-rhythm-sm text-body leading-[1.85] text-foreground-secondary"
              key={`list-${index}`}
            >
              {block.value.items.map((item) => (
                <li
                  className={
                    block.value.type === "ordered" ? "list-decimal" : "list-disc"
                  }
                  key={item}
                >
                  {item}
                </li>
              ))}
            </List>
          );
        }

        return (
          <Body
            className="leading-[1.85]"
            key={`${block.value}-${index}`}
            measure="content"
          >
            {block.value}
          </Body>
        );
      })}
    </Stack>
  );
}

export function getMdxHeadings(source: string): MdxHeading[] {
  return parseBlocks(source)
    .filter((block): block is { type: "heading"; id: string; level: 2 | 3; value: string } =>
      block.type === "heading",
    )
    .map((block) => ({
      id: block.id,
      level: block.level,
      title: block.value,
    }));
}

function parseBlocks(source: string) {
  const blocks: Array<
    | { type: "heading"; id: string; level: 2 | 3; value: string }
    | { type: "list"; value: ListBlock }
    | { type: "paragraph"; value: string }
  > = [];
  const lines = source.split(/\r?\n/);
  let paragraph: string[] = [];
  let list: ListBlock | undefined;
  const headingCounts = new Map<string, number>();

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", value: paragraph.join(" ") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list) {
      blocks.push({ type: "list", value: list });
      list = undefined;
    }
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = /^(#{2,3})\s+(?<value>.+)$/.exec(trimmedLine);

    if (headingMatch?.groups?.value) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        id: createUniqueHeadingId(headingMatch.groups.value, headingCounts),
        level: headingMatch[1] === "##" ? 2 : 3,
        value: headingMatch.groups.value,
      });
      continue;
    }

    const orderedItemMatch = /^\d+\.\s+(?<value>.+)$/.exec(trimmedLine);
    const unorderedItemMatch = /^-\s+(?<value>.+)$/.exec(trimmedLine);

    if (orderedItemMatch?.groups?.value || unorderedItemMatch?.groups?.value) {
      flushParagraph();

      const type = orderedItemMatch ? "ordered" : "unordered";
      const value =
        orderedItemMatch?.groups?.value ?? unorderedItemMatch?.groups?.value;

      if (!list || list.type !== type) {
        flushList();
        list = { items: [], type };
      }

      list.items.push(value ?? "");
      continue;
    }

    flushList();
    paragraph.push(trimmedLine);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function createUniqueHeadingId(
  value: string,
  headingCounts: Map<string, number>,
) {
  const baseId = slugifyHeading(value);
  const count = headingCounts.get(baseId) ?? 0;
  headingCounts.set(baseId, count + 1);

  return count === 0 ? baseId : `${baseId}-${count + 1}`;
}

function slugifyHeading(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section"
  );
}
