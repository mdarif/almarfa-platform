import { createCanonicalUrl, siteConfig } from "../utils/url";

type PageMetadataInput = {
  description?: string;
  pathname?: string;
  title?: string;
};

export function createTitle(title?: string) {
  return title ? `${title} | ${siteConfig.name}` : siteConfig.name;
}

export function createPageMetadata({
  description = siteConfig.description,
  pathname = "/",
  title,
}: PageMetadataInput = {}) {
  const canonical = createCanonicalUrl(pathname);
  const resolvedTitle = createTitle(title);

  return {
    alternates: {
      canonical,
    },
    description,
    openGraph: {
      description,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: resolvedTitle,
      type: "website",
      url: canonical,
    },
    title: resolvedTitle,
    twitter: createTwitterMetadata({
      description,
      title: resolvedTitle,
    }),
  };
}

export function createTwitterMetadata({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return {
    card: "summary_large_image",
    description,
    title,
  };
}
