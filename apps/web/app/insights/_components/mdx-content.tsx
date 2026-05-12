import { Body, Heading, Stack } from "@repo/ui";

type MdxContentProps = {
  source: string;
};

type ListBlock = {
  items: string[];
  type: "ordered" | "unordered";
};

export function MdxContent({ source }: MdxContentProps) {
  return (
    <Stack as="div" gap="lg" className="max-w-measure">
      {parseBlocks(source).map((block, index) => {
        if (block.type === "heading") {
          return (
            <Heading
              as={block.level === 2 ? "h2" : "h3"}
              className="pt-rhythm-sm text-[clamp(1.5rem,3vw,2.25rem)]"
              key={`${block.value}-${index}`}
              measure="content"
            >
              {block.value}
            </Heading>
          );
        }

        if (block.type === "list") {
          const List = block.value.type === "ordered" ? "ol" : "ul";

          return (
            <List
              className="ml-6 list-outside space-y-rhythm-xs text-body leading-body text-foreground-secondary"
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
          <Body key={`${block.value}-${index}`} measure="content">
            {block.value}
          </Body>
        );
      })}
    </Stack>
  );
}

function parseBlocks(source: string) {
  const blocks: Array<
    | { type: "heading"; level: 2 | 3; value: string }
    | { type: "list"; value: ListBlock }
    | { type: "paragraph"; value: string }
  > = [];
  const lines = source.split(/\r?\n/);
  let paragraph: string[] = [];
  let list: ListBlock | undefined;

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
