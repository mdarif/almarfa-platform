# Al Marfa Technologies — Logo & Identity System

## Overview

The Al Marfa editorial identity system is built on a restrained, institutional architectural aesthetic. The logo consists of an interlocked AM monogram derived from modular 12-unit grid geometry, paired with institutional typography in Geist Sans.

The system emphasizes:
- **Architectural authority** — Grid-derived letterforms suggest structural rigor
- **Institutional credibility** — Timeless, impersonal brand mark
- **Editorial refinement** — Calm, understated visual language
- **Technical maturity** — Geometric precision without flashiness
- **Scalability** — Optimized for header, footer, favicon, and social contexts

---

## Logo Concept: Direction C (Architectural Monogram)

### Conceptual Foundation

The logo is an **interlocked AM monogram** where:
- **Letterforms** are derived from a 12-unit modular grid (10px per unit = 120px canvas)
- **Geometry** is architectural: strokes align to grid intersections, negative space creates rhythm
- **Interlock** creates visual unity and suggests the platform's integrated, systemic nature
- **Teal accent** highlights the center junction, reinforcing institutional authority without excessive color

### Design Rationale

| Element | Rationale |
|---------|-----------|
| **Interlocked AM** | Suggests integration, systems thinking, shared foundation |
| **Grid-based geometry** | Communicates architectural discipline and precision |
| **Restrained teal accent** | Secondary color adds institutional warmth without distraction |
| **Geometric frame** | Subtle reference frame grounds the mark in structured thinking |
| **Monochrome primary** | Ensures clarity and versatility across all contexts |

---

## Logo Concepts (Alternative Directions)

Three concept directions were developed during design exploration:

### Direction A: Grid-in-Letters
**Character**: Pure grid structure where AM letterforms ARE the grid cells  
**Strengths**: Minimal, highly geometric, strongest grid expression  
**Use case**: Design documentation, conceptual reference  
**File**: `apps/web/public/logos/am-mark-concept-a.svg`

### Direction B: Layered Grid Authority
**Character**: Geometric grid frame (outer) contains AM letters (inner)  
**Strengths**: Sculptural, strong visual hierarchy, grid creates authority structure  
**Use case**: Alternative if Direction C feels too subtle  
**File**: `apps/web/public/logos/am-mark-concept-b.svg`

### Direction C: Architectural Monogram ✓ **SELECTED**
**Character**: Interlocked AM with grid as subtle construction foundation  
**Strengths**: Wordmark-friendly, readable at all sizes, institutional refinement  
**Use case**: Primary brand identity across all contexts  
**File**: `apps/web/public/logos/am-mark-primary.svg`

---

## SVG Files & Assets

### Primary Logo Files

| File | Size | Use Case | Format |
|------|------|----------|--------|
| `am-mark-primary.svg` | 120×120 | Design files, documentation | SVG (color + teal accent) |
| `am-mark-mono.svg` | 120×120 | High-contrast contexts, monochrome | SVG (monochrome only) |
| `am-mark-outline.svg` | — | Outline stroke variant | *Planned* |
| `am-wordmark-horizontal.svg` | 320×80 | Footer branding, social cards | SVG (mark + text) |
| `am-wordmark-stacked.svg` | — | Vertical layouts, limited space | *Planned* |

### Favicon Assets

| File | Size | Use Case |
|------|------|----------|
| `favicon.svg` | 32×32 | Primary browser favicon |
| `apple-touch-icon.png` | 180×180 | iOS home screen (generate from SVG) |
| `favicon.ico` | 32×32 | Legacy fallback (optional) |

### Reference Concept Files

| File | Description |
|------|-------------|
| `am-mark-concept-a.svg` | Grid-in-Letters direction (reference only) |
| `am-mark-concept-b.svg` | Layered Authority direction (reference only) |
| `am-mark-concept-c.svg` | Architectural Monogram (reference, similar to primary) |

---

## React Component API

The branding system is implemented as a lightweight, SVG-based React component library in `packages/ui/src/components/branding/`.

### AmLogo Component

**Primary logo mark component with flexible sizing and variants.**

```tsx
import { AmLogo } from '@repo/ui'

// Default usage
<AmLogo size="md" variant="primary" />

// Header usage
<AmLogo size="sm" variant="primary" className="hover:opacity-75" />

// Footer usage
<AmLogo size="sm" variant="mono" />

// Small inline icon
<AmLogo size="xs" variant="mono" />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | `'md'` | Preset sizes (16px, 24px, 32px, 40px, 64px) or custom pixel value |
| `variant` | `'primary' \| 'mono' \| 'inverted'` | `'primary'` | Visual variant: primary (color + accent), monochrome, or inverted for dark backgrounds |
| `className` | `string` | — | Optional Tailwind classes for override styling |
| `ariaLabel` | `string` | `'Al Marfa Technologies'` | Accessibility label |

#### Size Preset Reference

| Preset | Pixel Size | Use Case |
|--------|-----------|----------|
| `'xs'` | 16px | Inline icon, small badge |
| `'sm'` | 24px | Header logo, footer logo |
| `'md'` | 32px | Standard logo size, favicon |
| `'lg'` | 40px | Large header logo |
| `'xl'` | 64px | Large contexts, documentation |

### AmWordmark Component

**Logo mark + "Al Marfa" text lockup for institutional branding.**

```tsx
import { AmWordmark } from '@repo/ui'

// Horizontal lockup (header/footer)
<AmWordmark layout="horizontal" size="md" />

// Vertical lockup (limited space)
<AmWordmark layout="vertical" size="lg" accentFirstLetter={true} />

// Without accent
<AmWordmark layout="horizontal" accentFirstLetter={false} />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Mark size (24px, 32px, 48px) |
| `accentFirstLetter` | `boolean` | `true` | Highlight "Al" in teal accent |
| `className` | `string` | — | Optional CSS class override |

### AmIcon Component

**Minimal AM mark optimized for favicon and small inline use.**

```tsx
import { AmIcon } from '@repo/ui'

// Favicon-sized
<AmIcon size="md" />

// Inline small icon
<AmIcon size="sm" className="inline-block" />

// Very small (16px)
<AmIcon size="xs" />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| string` | `'md'` | Preset sizes (16px, 24px, 32px) or custom |
| `className` | `string` | — | Optional CSS class override |
| `ariaLabel` | `string` | `'Al Marfa'` | Accessibility label |

---

## Usage Guidelines

### Size & Context Rules

#### Header / Navigation (Desktop)
- **Logo mark**: 32–40px
- **Variant**: `primary` (color + accent)
- **Position**: Left side of header
- **Interaction**: Link to home, hover opacity 75%
- **Component**: `<AmLogo size="sm" />`

#### Header / Navigation (Mobile)
- **Logo mark**: 24–32px
- **Variant**: `primary`
- **Position**: Left side, in `<details>` summary
- **Component**: `<AmLogo size="sm" />`

#### Footer
- **Logo mark**: 24px
- **Variant**: `mono` or `primary`
- **Position**: Left of tagline text
- **Alignment**: Center-aligned with tagline
- **Component**: `<AmLogo size="sm" variant="mono" />`

#### Favicon / Browser Tab
- **Size**: 32×32px
- **Variant**: Monochrome only (for tab clarity)
- **File**: `favicon.svg`
- **Format**: SVG with PNG fallback
- **Metadata**: Configured in `apps/web/app/layout.tsx`

#### Social Media / OG Images
- **Logo mark**: 200–400px (in fullsize social card)
- **Variant**: `primary` (color + accent for visual interest)
- **Layout**: Typically embedded in top-left or center
- **File**: Use `am-wordmark-horizontal.svg` or `am-mark-primary.svg`

#### Print / Documentation
- **Logo mark**: 1–2 inches (96–192px)
- **Variant**: Primary or mono depending on background
- **Color space**: RGB (RGB #f5f7f8 on #0b1018, or inverted for light backgrounds)

---

## Color & Theme Integration

### CSS Custom Properties

All logo components use CSS custom properties for automatic dark mode support:

```css
/* In apps/web/app/globals.css */
:root {
  --color-foreground: #f5f7f8;
  --color-accent: #5fb6a7;
  --color-background: #0b1018;
}
```

### Variants

#### Primary Variant
- **Primary stroke**: `var(--color-foreground)` (#f5f7f8)
- **Accent element**: `var(--color-accent)` (#5fb6a7) at 75% opacity
- **Frame**: Subtle reference frame at 12% opacity
- **Use case**: Standard contexts with sufficient background contrast

#### Mono Variant
- **Stroke**: `currentColor` (inherits from parent color)
- **Accent**: None (removed for pure monochrome)
- **Frame**: Subtle, at 15% opacity
- **Use case**: High-contrast, favicon, small sizes

#### Inverted Variant
- **Stroke**: `var(--color-background)` (#0b1018)
- **Accent**: `var(--color-accent)` (#5fb6a7)
- **Use case**: On dark backgrounds, contrast enhancement

### Dark Mode Behavior

The logo system is designed for dark mode by default and maintains full clarity:
- Foreground color (#f5f7f8) reads clearly on dark backgrounds (#0b1018)
- Teal accent (#5fb6a7) maintains sufficient contrast on both modes
- Monochrome variant automatically inherits from parent color

---

## Responsive Behavior

### Breakpoint-Based Usage

| Breakpoint | Context | Logo Size | Variant |
|------------|---------|-----------|---------|
| `< 768px` (mobile) | Header | 24px | primary |
| `< 768px` | Footer | 24px | mono |
| `768–1024px` (tablet) | Header | 32px | primary |
| `768–1024px` | Footer | 24px | mono |
| `> 1024px` (desktop) | Header | 40px | primary |
| `> 1024px` | Footer | 32px | mono |

### Grid Logic & Modular Geometry

#### 12-Unit Grid System
- **Base unit**: 10px
- **Canvas**: 120×120px (12 units × 10px)
- **Stroke width**: 1 unit minimum (10px at 120px, scales proportionally)
- **Grid alignment**: All letterform corners align to grid intersections

#### Scaling Rules
- **Monochrome linearity**: All sizes scale proportionally; stroke weight adjusts relative to size
- **Minimum size**: 16px (favicon) — letterforms remain recognizable
- **Maximum size**: Unlimited; grid alignment holds at 1–200+ inches

#### Common Size Mapping

| Display Size | Grid Units | Use Case |
|--------------|-----------|----------|
| 16px | 1.6 units | Favicon, very small inline |
| 24px | 2.4 units | Footer, small nav |
| 32px | 3.2 units | Standard header, favicon |
| 40px | 4 units | Large header |
| 64px | 6.4 units | Large contexts |
| 120px | 12 units | Master design file |

---

## Technical Specifications

### SVG Structure

All primary SVG files follow this structure:

```xml
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <title>Logo Name</title>
  <desc>Descriptive alt text</desc>
  
  <!-- Letterforms -->
  <g stroke="currentColor" stroke-width="3.5" ... >
    <!-- Paths defining AM -->
  </g>
  
  <!-- Accent elements (variant-dependent) -->
  <g fill="var(--color-accent, #5fb6a7)" opacity="0.75">
    <!-- Accent circles, dots -->
  </g>
  
  <!-- Geometric frame (optional) -->
  <g stroke="currentColor" stroke-width="0.8" opacity="0.12" ... >
    <!-- Reference frame -->
  </g>
</svg>
```

### Performance Optimization

- **File sizes**: < 2KB per SVG (uncompressed)
- **Paths**: All curves and strokes use absolute coordinates, rounded to integers
- **No animation**: Static SVG for crisp rendering
- **CSS properties**: Use CSS custom properties for theming (no inline styles)
- **Accessibility**: All logos include `<title>` and `<desc>` elements

### Browser Support

- **SVG**: All modern browsers (Firefox, Chrome, Safari, Edge)
- **CSS custom properties**: IE11+ (with fallbacks)
- **Color-mix()**: Modern browsers; fallback colors provided

---

## Implementation in Platform

### Header Integration

**File**: `apps/web/components/navigation/primary-nav.tsx`

```tsx
import { AmLogo } from "@repo/ui";

function BrandLink() {
  return (
    <Link href="/" aria-label="Al Marfa Technologies">
      <AmLogo size="sm" variant="primary" />
    </Link>
  );
}
```

### Footer Integration

**File**: `apps/web/components/navigation/footer.tsx`

```tsx
import { AmLogo } from "@repo/ui";

<div className="flex items-center gap-rhythm-md">
  <AmLogo size="sm" variant="primary" />
  <h2 className="text-base font-semibold">Al Marfa Technologies</h2>
</div>
```

### Favicon Configuration

**File**: `apps/web/app/layout.tsx`

```tsx
export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
};
```

### CSS Styling

**File**: `apps/web/app/globals.css`

```css
.logo {
  color: var(--color-foreground);
  transition: opacity 150ms ease;
}

.logo:hover {
  opacity: 0.75;
}

.logo--primary { /* Full color with accent */ }
.logo--mono { /* Monochrome only */ }
.logo--inverted { color: var(--color-background); }
```

---

## Accessibility & Testing

### ARIA & Alt Text

All logo components include:
- ✅ `<title>` element for SVG identification
- ✅ `<desc>` element for longer description
- ✅ `aria-label` prop for link context
- ✅ Proper heading hierarchy in footer (h2 for "Al Marfa Technologies")

### Testing Checklist

- [ ] Logo readable at 16px (favicon in browser tab)
- [ ] Logo readable at 32px (header on mobile/tablet)
- [ ] Logo readable at 40px (header on desktop)
- [ ] Dark mode: logo contrast sufficient on all backgrounds
- [ ] Responsive scaling: no CLS (Cumulative Layout Shift)
- [ ] SVG file sizes < 2KB
- [ ] Hover states work on header and footer logos
- [ ] Favicon appears in browser tabs and bookmarks
- [ ] iOS home screen icon displays correctly
- [ ] Social media preview cards show logo correctly

---

## Naming & Branding Rules

### Text Treatment
- Always sentence-case: "Al Marfa" (not "AL MARFA")
- Full name: "Al Marfa Technologies" (in footer, formal contexts)
- Shortened: "Al Marfa" (in headers, casual references)
- Never abbreviate as "AMT" in brand communications

### Logo vs. Wordmark
- **Logo mark**: Just the AM monogram (use AmLogo component)
- **Wordmark**: Logo + "Al Marfa" text together (use AmWordmark component)
- **Logo + text**: Logo mark placed left of separate "Al Marfa" text (use AmLogo + Heading together)

### Color Pairing
- **Primary color**: Foreground #f5f7f8 (never change)
- **Accent color**: Teal #5fb6a7 (secondary detail only)
- **Background**: Dark #0b1018 (default context)
- **No gradients**: Use solid colors only
- **No transparency**: Accent uses opacity property only

---

## Future Considerations

### Planned Variations
- Outline stroke variant (`am-mark-outline.svg`)
- Vertical wordmark layout (`am-wordmark-stacked.svg`)
- Animated logo (subtle motion for future use)

### Expansion Paths
- Print/brand book with detailed guidelines
- Animated SVG for loading states (optional)
- Additional language variations (if needed)
- Print templates with logo placement rules

### Maintenance
- Review logo usage annually for consistency
- Update documentation if variants are added
- Monitor social media OG preview rendering
- Verify favicon display across new browsers

---

## References

- **Design principles**: [docs/ai/design-principles.md](../ai/design-principles.md)
- **Typography system**: [packages/ui/src/components/typography/](../../packages/ui/src/components/typography/)
- **Color tokens**: [apps/web/app/globals.css](../../apps/web/app/globals.css)
- **Component examples**: [packages/ui/src/components/branding/](../../packages/ui/src/components/branding/)

---

*Last updated: 2026-05-17*
*Document version: 1.0*
