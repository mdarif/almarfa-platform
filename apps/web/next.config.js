/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — emits plain HTML/CSS/JS to apps/web/out/, deployed to Cloudflare Pages as static files.
  // This rules out SSR, ISR, API routes, dynamic fallback routes, and next/headers.
  // Never switch to Workers SSR or @cloudflare/next-on-pages — see docs/deployment/.
  output: "export",
  // Dev only: hide the Next.js dev indicator so it does not cover footer links during mobile layout testing.
  devIndicators: false,
};

export default nextConfig;
