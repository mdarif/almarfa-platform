import { createCanonicalUrl, siteConfig } from "../utils/url";

export function createOpenGraphImageUrl(pathname = "/") {
  const url = new URL("/og", siteConfig.siteUrl);
  url.searchParams.set("path", createCanonicalUrl(pathname));
  return url.toString();
}
