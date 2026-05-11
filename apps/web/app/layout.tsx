import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "Al Marfa Technologies",
  description:
    "Enterprise Frontend Platforms, Design Systems, and Scalable UI Architecture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(GeistSans.className, "font-sans", geist.variable)}>
      <body className="bg-[#0B1120] text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}