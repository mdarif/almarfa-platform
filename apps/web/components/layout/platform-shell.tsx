/**
 * Platform Shell Layout
 * 
 * Global layout structure providing:
 * - Header with primary navigation
 * - Footer with semantic structure
 * - Flexible page content area
 * 
 * Supports responsive behavior while maintaining
 * calm, editorial composition.
 */

import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";

interface PlatformShellProps {
  children: React.ReactNode;
}

export function PlatformShell({ children }: PlatformShellProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
