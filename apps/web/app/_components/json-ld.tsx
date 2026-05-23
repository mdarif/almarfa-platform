import type { JsonLd } from "@repo/seo";

type JsonLdScriptProps = {
  data: JsonLd | JsonLd[];
};

export function JsonLdScript({ data }: JsonLdScriptProps) {
  // dangerouslySetInnerHTML is intentional: JSON-LD must be an inline <script> tag
  // for Google's structured data crawler to parse it. Safe here because `data` is
  // always a build-time typed object serialised via JSON.stringify — never user input.
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
