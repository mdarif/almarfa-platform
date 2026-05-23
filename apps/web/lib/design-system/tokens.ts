export const tokens = {
  colors: {
    background: "var(--color-background)",
    foreground: "var(--color-foreground)",
    foregroundSecondary: "var(--color-foreground-secondary)",
    foregroundMuted: "var(--color-foreground-muted)",
    accent: "var(--color-accent)",
    border: "var(--color-border)",
    surface: "var(--color-surface)",
    surfaceRaised: "var(--color-surface-raised)",
    surfaceMuted: "var(--color-surface-muted)",
  },

  layout: {
    page: "max-w-page mx-auto px-layout-sm md:px-layout-md lg:px-layout-lg",
    content:
      "max-w-content mx-auto px-layout-sm md:px-layout-md lg:px-layout-lg",
    narrow: "max-w-narrow mx-auto px-layout-sm md:px-layout-md lg:px-layout-lg",
  },

  spacing: {
    section: "py-section",
    sectionCompact: "py-section-compact",
    sectionSpacious: "py-section-spacious",
  },

  typography: {
    display: "text-display leading-display font-semibold tracking-normal",
    heading: "text-heading leading-heading font-semibold tracking-normal",
    subheading:
      "text-subheading leading-subheading font-medium tracking-normal",
    body: "text-body leading-body tracking-normal",
    caption:
      "text-caption leading-caption font-medium uppercase tracking-[0.08em]",
  },
} as const;
