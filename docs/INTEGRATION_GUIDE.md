# Al Marfa Platform Architecture — Integration Guide

## Overview

The foundational platform information architecture has been implemented. This guide explains how to use the new components and systems.

---

## 1. Component Architecture

### Global Shell (Automatic)

The root layout now uses `PlatformShell`, which automatically provides:
- Header with navigation
- Footer with semantic structure
- Responsive layout

**No changes needed** — all pages automatically get the header and footer.

### Using in Page Layouts

```tsx
// pages automatically have header + footer
export default function ArticlePage() {
  return (
    <main>
      <Container size="content">
        <article>
          {/* Your content here */}
        </article>
      </Container>
    </main>
  );
}
```

---

## 2. Breadcrumb System

### InsightBreadcrumb (Recommended)

For article pages:

```tsx
import { InsightBreadcrumb } from "@/components/navigation";

export default function ArticlePage() {
  return (
    <>
      <InsightBreadcrumb
        title="Storybook Governance in Enterprise Platforms"
        clusterLabel="Storybook Ecosystems"
        clusterSlug="storybook"
      />
      
      {/* Article content */}
    </>
  );
}
```

### Custom Breadcrumb

For other pages:

```tsx
import { Breadcrumb } from "@/components/navigation";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Frontend Architecture", isActive: true },
];

export default function ServicePage() {
  return <Breadcrumb items={breadcrumbs} />;
}
```

---

## 3. Related Topics

### Display Related Insights

```tsx
import { RelatedTopicsSection } from "@/components/content";

const relatedTopics = [
  {
    id: "article-1",
    title: "Designing Component APIs",
    description: "Creating clear contracts for reusable components",
    href: "/insights/component-apis",
    cluster: "design-systems",
  },
  {
    id: "article-2",
    title: "Storybook as Platform Infra",
    description: "Using Storybook for component governance",
    href: "/insights/storybook-infra",
    cluster: "storybook",
  },
];

export default function ArticlePage() {
  return (
    <>
      {/* Article content */}
      <RelatedTopicsSection 
        title="Related Architecture Insights"
        topics={relatedTopics}
      />
    </>
  );
}
```

### Display Expertise Context

```tsx
import { ExpertiseContext } from "@/components/content";

export default function ArticlePage() {
  return (
    <>
      {/* Article content */}
      
      <ExpertiseContext
        title="Design Systems Consulting"
        description="Build shared UI foundations with clear ownership and adoption paths"
        href="/expertise/design-systems"
      />
    </>
  );
}
```

---

## 4. Article Metadata & Frontmatter

### Structure Your Articles

When creating new articles, include metadata:

```yaml
---
title: "Storybook as Governed Platform Infrastructure"
description: "Treating Storybook as platform infrastructure for component contracts, visual states, and shared understanding."
date: "2024-01-15"
author: "Your Name"
clusters:
  - STORYBOOK
  - GOVERNANCE
relatedInsights:
  - "design-systems-consulting"
  - "component-governance"
---

# Article content here
```

### Validation

Use content utilities to validate:

```tsx
import { validateArticleMetadata } from "@/lib/content-utils";

const isValid = validateArticleMetadata({
  title: "...",
  description: "...",
  clusters: ["STORYBOOK", "DESIGN_SYSTEMS"],
});
```

---

## 5. SEO & Structured Data

### Generate Breadcrumb Schema

```tsx
import { getBreadcrumbSchema } from "@/lib/content-utils";
import { JsonLdScript } from "./_components/json-ld";

const breadcrumbs = [
  { label: "Insights", href: "/insights" },
  { label: "Storybook", href: "/insights/storybook" },
  { label: "Governance Patterns", isActive: true },
];

const schema = getBreadcrumbSchema(breadcrumbs);

export default function ArticlePage() {
  return (
    <>
      <JsonLdScript data={[schema]} />
      {/* Page content */}
    </>
  );
}
```

### Generate Article Schema

```tsx
import { getArticleSchema } from "@/lib/content-utils";

const articleSchema = getArticleSchema(
  {
    title: "Article Title",
    description: "Article description",
    date: "2024-01-15",
    clusters: ["STORYBOOK"],
  },
  "https://almarfa.com/insights/article-slug",
  "Author Name"
);
```

---

## 6. Working with Authority Clusters

### Access Cluster Information

```tsx
import { AUTHORITY_CLUSTERS, getAuthorityCluster } from "@/lib/platform";

// Get all clusters
const allClusters = Object.values(AUTHORITY_CLUSTERS);

// Get specific cluster
const storybook = getAuthorityCluster("storybook");
console.log(storybook.label); // "Storybook Ecosystems"
console.log(storybook.slug);  // "storybook"
```

### Get Related Expertise Areas

```tsx
import { getRelatedExpertiseAreas } from "@/lib/content-utils";

const expertise = getRelatedExpertiseAreas(["storybook", "design-systems"]);
// Returns expertise areas that cover these clusters
```

---

## 7. Navigation Structure

### Primary Navigation

The header automatically displays:

```
Services | Expertise | Insights | About | Contact
```

These are defined in `NAVIGATION.primary` in `lib/platform.ts`.

### Footer Navigation

The footer displays clusters organized in 4 sections:

- **Navigation** — Main nav items
- **Architecture** — Frontend Architecture, Design Systems
- **Platforms** — Storybook, Nx, Platform Engineering
- **Operations** — Governance, DX, Angular Patterns

---

## 8. Creating New Pages

### Service Pages

```tsx
import { Container, Section, Stack, Heading, Body } from "@repo/ui";
import { EXPERTISE_AREAS } from "@/lib/platform";

export default function FrontendArchitecturePage() {
  const area = EXPERTISE_AREAS.find(a => a.slug === "frontend-architecture");
  
  return (
    <main>
      <Section spacing="default">
        <Container size="content">
          <Stack gap="lg">
            <Heading>{area.title}</Heading>
            <Body>{area.description}</Body>
          </Stack>
        </Container>
      </Section>
    </main>
  );
}
```

### Expertise Pages

```tsx
import { getAuthorityCluster } from "@/lib/platform";
import { RelatedTopicsSection } from "@/components/content";

export default function ExpertisePage({ params }: { params: { slug: string } }) {
  const cluster = getAuthorityCluster(params.slug);
  
  if (!cluster) return <div>Not found</div>;
  
  // Fetch related articles for this cluster
  const relatedArticles = await getArticlesByCluster(cluster.id);
  
  return (
    <main>
      <Section spacing="default">
        <Container size="content">
          <Heading>{cluster.label}</Heading>
          <Body>{cluster.description}</Body>
        </Container>
      </Section>
      
      <RelatedTopicsSection
        title="Featured Insights"
        topics={relatedArticles}
      />
    </main>
  );
}
```

---

## 9. File Organization

```
apps/web/
├── app/
│   ├── layout.tsx              # Root layout (uses PlatformShell)
│   ├── page.tsx                # Home page
│   ├── insights/
│   │   └── [slug]/
│   │       └── page.tsx        # Individual articles
│   ├── expertise/
│   │   └── [slug]/
│   │       └── page.tsx        # Cluster pages
│   └── services/
│       └── page.tsx            # Services overview
│
├── components/
│   ├── navigation/             # NEW: Navigation system
│   │   ├── index.ts
│   │   ├── header.tsx
│   │   ├── primary-nav.tsx
│   │   ├── footer.tsx
│   │   └── breadcrumb.tsx
│   ├── content/                # NEW: Wayfinding components
│   │   ├── index.ts
│   │   └── related-topics.tsx
│   └── layout/
│       ├── platform-shell.tsx  # NEW: Global shell
│       ├── container.tsx
│       └── section.tsx
│
└── lib/
    ├── platform.ts             # NEW: Taxonomy & configuration
    └── content-utils.ts        # NEW: Article utilities
```

---

## 10. Styling Considerations

### Design Tokens Used

The components use these design tokens:

```css
/* Spacing */
--spacing-rhythm-sm, --rhythm-md, --rhythm-lg, --rhythm-xl

/* Colors */
--color-border, --color-text, --color-surface, --color-accent

/* Typography */
--font-sans (Geist Sans)
--text-display, --text-heading, --text-body, --text-caption
```

### Tailwind Classes

- `py-rhythm-md` — Vertical padding
- `space-y-rhythm-md` — Vertical spacing in lists
- `text-text`, `text-text/75`, `text-text/50` — Text colors
- `border-border` — Border colors

---

## 11. Next Steps

### Phase 4: Content Integration
1. Update article frontmatter with cluster metadata
2. Generate breadcrumbs from metadata
3. Create related topics based on cluster relationships

### Phase 5: Pages & Services
1. Create `/expertise/[slug]` pages for each cluster
2. Create `/services` overview page
3. Create `/about` and `/contact` pages

### Phase 6: SEO & Structured Data
1. Add JSON-LD breadcrumb and article schema
2. Implement sitemap reflecting semantic structure
3. Add OpenGraph metadata

### Phase 7: Analytics & Monitoring
1. Track internal link clicks
2. Monitor discoverability metrics
3. Measure content engagement by cluster

---

## 12. Key Principles

✅ **Semantic first** — Structure before styling
✅ **Content-driven** — Architecture supports content growth
✅ **Editorial focus** — Publication-like navigation and wayfinding
✅ **Low maintenance** — Cluster structure is stable
✅ **Scalable** — Easy to add articles within existing clusters
✅ **Accessible** — Proper HTML hierarchy and ARIA labels
✅ **Responsive** — Mobile-first, readable at all sizes
✅ **Performance** — Static rendering, minimal JavaScript

---

## Questions?

Refer to:
- `docs/ai/platform-architecture.md` — Full architectural decisions
- `apps/web/lib/platform.ts` — Taxonomy definitions
- `apps/web/lib/content-utils.ts` — Content utilities
