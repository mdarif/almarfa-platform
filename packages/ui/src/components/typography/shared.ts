export type TextMeasure = "none" | "narrow" | "content" | "wide" | "hero";
export type TextTone = "primary" | "secondary" | "muted" | "accent";

// Typography primitives map semantic props to token-backed Tailwind utilities.
export const toneClassNames: Record<TextTone, string> = {
  primary: "text-foreground",
  secondary: "text-foreground-secondary",
  muted: "text-foreground-muted",
  accent: "text-accent",
};

export const measureClassNames: Record<TextMeasure, string> = {
  none: "",
  narrow: "max-w-measure-narrow",
  content: "max-w-measure",
  wide: "max-w-measure-wide",
  hero: "max-w-measure-hero",
};
