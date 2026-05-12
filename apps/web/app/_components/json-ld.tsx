import type { JsonLd } from "@repo/seo";

type JsonLdScriptProps = {
  data: JsonLd | JsonLd[];
};

export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
