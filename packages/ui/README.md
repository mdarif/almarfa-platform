# @repo/ui

Shared editorial UI primitives for the Al Marfa Technologies platform.

This package is intentionally small. It provides layout, typography, and token primitives for a platform that should read like an architecture publication, not a startup landing page or generic SaaS application.

## Purpose

`@repo/ui` exists to keep the platform visually and semantically consistent as it grows into:

- an enterprise frontend architecture authority platform
- a technical publication ecosystem
- a semantic content platform

The package should protect readability, spacing rhythm, and semantic composition. It should not become a broad component library.

## Boundaries

This package owns:

- editorial layout primitives
- typography primitives
- shared Tailwind token mappings
- tiny utility helpers used by those primitives

Applications own:

- page composition
- routing and metadata
- content loading
- app-specific sections
- product or publication features

Avoid adding page-specific components, marketing sections, dashboards, or stateful client behavior here.

## Importing

Use the root export for normal application work:

```tsx
import { Body, Container, Display, Section, Stack } from "@repo/ui";
```

Use subpath exports only when a narrow import is useful:

```tsx
import { Container } from "@repo/ui/components/layout/container";
```

Import tokens once from the consuming app stylesheet:

```css
@import "@repo/ui/styles/tokens.css";
```

## Layout Primitives

### Container

Constrains horizontal width and applies responsive page padding.

Use `Container` to prevent text and editorial layouts from stretching across wide screens. The available sizes map to readable measures:

- `page`: broad page layout
- `content`: editorial section layout
- `narrow`: focused content or article framing
- `measure`: paragraph-scale content

```tsx
<Container size="content">
  <ArticleIntro />
</Container>
```

### Section

Applies semantic vertical spacing for page sections.

Use `Section` to create predictable scroll rhythm. Prefer its `spacing` prop over one-off padding utilities.

```tsx
<Section spacing="spacious">
  <Container>...</Container>
</Section>
```

### Stack

Creates vertical rhythm between related elements.

Use `Stack` for headings, intro copy, article headers, and grouped content. Its gap values map to rhythm tokens rather than arbitrary spacing.

```tsx
<Stack gap="md">
  <Caption>Design Systems</Caption>
  <Heading>Governance before scale</Heading>
  <Body>...</Body>
</Stack>
```

### Grid

Creates responsive editorial grids.

Use `Grid` for repeated content groups where the layout should stay calm and predictable across breakpoints.

```tsx
<Grid columns="three" gap="lg">
  <ArticleCard />
  <ArticleCard />
  <ArticleCard />
</Grid>
```

## Typography Primitives

Typography is the primary visual system for the platform. These primitives encode hierarchy, tone, and readable line length.

### Display

Primary page-level statement. Defaults to `h1`.

Use for homepage, section landing, or article title moments that need clear authority.

### Heading

Section or article heading. Defaults to `h2`.

Use the `as` prop to preserve semantic heading order when needed.

### Body

Readable prose. Defaults to `p`.

Use `size="large"` for intro copy or summary text. Keep long-form content constrained with `measure="content"` or `measure="narrow"`.

### Caption

Metadata, labels, and quiet contextual text. Defaults to `p`.

Use sparingly. Captions should clarify structure, not create decorative noise.

## Token Philosophy

Tokens live in `src/styles/tokens.css` and are consumed through Tailwind utilities.

The token names describe intent:

- `section-*` controls page rhythm
- `rhythm-*` controls vertical composition inside content groups
- `grid-*` controls spacing between repeated items
- `container-*` controls readable layout widths
- `text-*` and `leading-*` control typographic hierarchy
- `surface-*` and foreground tokens control calm visual layering

Avoid arbitrary spacing values unless there is a strong, local reason. Most layout decisions should use the tokenized primitives first.

## Composition Pattern

Prefer this shape for editorial sections:

```tsx
<Section spacing="spacious">
  <Container size="content">
    <Stack gap="md" className="max-w-measure-wide">
      <Caption tone="accent">Al Marfa Technologies</Caption>
      <Display>Enterprise frontend architecture for systems that need to scale.</Display>
      <Body size="large">
        Durable frontend platforms, governed design systems, and shared UI
        infrastructure with architectural discipline.
      </Body>
    </Stack>
  </Container>
</Section>
```

This keeps structure explicit while preserving readable line lengths and predictable rhythm.

## Review Checklist

Before adding to this package, ask:

- Is this primitive reusable across publication or platform surfaces?
- Does it protect semantic structure, rhythm, or readability?
- Can the same result be composed from existing primitives?
- Does it avoid client JavaScript?
- Does it avoid page-specific language or behavior?

If the answer is unclear, keep the component in the consuming app until the pattern repeats.
