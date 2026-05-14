/**
 * Primary Navigation
 * 
 * Minimal horizontal navigation with semantic structure.
 * Services, Expertise, Insights, About, Contact
 */

import Link from "next/link";
import { NAVIGATION } from "@/lib/platform";

export function PrimaryNav() {
  return (
    <nav
      className="flex items-center gap-rhythm-lg text-sm"
      aria-label="Primary navigation"
    >
      {NAVIGATION.primary.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-text/75 hover:text-text transition-colors font-medium"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
