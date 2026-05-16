import { createPageMetadata } from "@repo/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExpertiseDetail } from "@/components/expertise/expertise-detail";
import {
  getAllExpertiseSlugs,
  getExpertiseBySlug,
  getExpertiseMetadata,
} from "@/lib/expertise";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getExpertiseBySlug(slug);

  if (!area) {
    return createPageMetadata({
      title: "Not found",
      pathname: `/expertise/${slug}`,
    });
  }

  const metadata = getExpertiseMetadata(area);

  return createPageMetadata({
    title: metadata.title,
    description: metadata.description,
    pathname: metadata.pathname,
  });
}

export function generateStaticParams() {
  return getAllExpertiseSlugs().map((slug) => ({ slug }));
}

export default async function ExpertiseClusterPage({ params }: PageProps) {
  const { slug } = await params;
  const area = getExpertiseBySlug(slug);

  if (!area) {
    notFound();
  }

  return <ExpertiseDetail area={area} />;
}
