import "./globals.css";
import {
  createOrganizationSchema,
  createPageMetadata,
  createWebSiteSchema,
  siteConfig,
} from "@repo/seo";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { JsonLdScript } from "./_components/json-ld";
import { PlatformShell } from "@/components/layout/platform-shell";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  ...createPageMetadata(),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <JsonLdScript data={[createOrganizationSchema(), createWebSiteSchema()]} />
        <PlatformShell>{children}</PlatformShell>
      </body>
    </html>
  );
}
