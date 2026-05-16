import { Caption, Heading, Stack } from "@repo/ui";
import Link from "next/link";

import { EXPERTISE_LIST, getExpertisePath } from "@/lib/expertise";

type ExpertiseTopicNavProps = {
  title?: string;
  className?: string;
};

export function ExpertiseTopicNav({
  title = "Browse by expertise area",
  className = "",
}: ExpertiseTopicNavProps) {
  return (
    <nav aria-label={title} className={className}>
      <Stack gap="md">
        <Caption tone="accent">{title}</Caption>
        <ol className="border-t border-border">
          {EXPERTISE_LIST.map((area) => (
            <li className="border-b border-border py-rhythm-md" key={area.slug}>
              <Link href={getExpertisePath(area.slug)} className="group">
                <Heading
                  as="h3"
                  className="text-[clamp(1rem,1.75vw,1.25rem)] group-hover:text-accent transition-colors"
                >
                  {area.label}
                </Heading>
              </Link>
            </li>
          ))}
        </ol>
      </Stack>
    </nav>
  );
}
