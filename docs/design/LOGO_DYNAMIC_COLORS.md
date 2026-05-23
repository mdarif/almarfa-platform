# Al Marfa Tech Logo — Dynamic Color System

## Overview

The Al Marfa tech logo (red A, green M) now uses dynamic CSS custom properties for all colors. This allows you to change the logo colors globally via CSS variables or per-instance via component props.

---

## Default Colors

The logo comes with these default colors that can be customized:

```css
/* In :root or any CSS */
--logo-bg-color: #3d7a70 /* Background (dark teal) */ --logo-a-color: #f5f7f8
  /* A letter (off-white) */ --logo-m-color: #111c2a /* M letter (dark navy) */;
```

---

## Usage Examples

### 1. **Default Logo (Red & Green)**

```tsx
import { AmLogo } from "@repo/ui";

<AmLogo size="md" />; // Uses default colors (red A, green M)
```

### 2. **Override Colors via Component Props**

```tsx
// Custom colors for a specific logo instance
<AmLogo
  size="md"
  colors={{
    background: "#1a1a1a",
    aColor: "#ff0000", // Change A to pure red
    mColor: "#00ff00", // Change M to pure green
  }}
/>
```

### 3. **Change Colors Globally via CSS**

Edit `apps/web/app/globals.css` to override the default colors:

```css
:root {
  --logo-bg-color: #2a2a2a;
  --logo-a-color: #ff5500;
  --logo-m-color: #0099dd;
}
```

All `<AmLogo />`, `<AmWordmark />`, and `<AmIcon />` components will automatically use the new colors.

### 4. **Change Colors by Container**

Apply custom colors only within a specific section:

```tsx
// In a React component or CSS
<div style={{ "--logo-bg-color": "#000000", "--logo-a-color": "#ffffff" }}>
  <AmLogo size="md" /> // Only this logo uses the custom colors
</div>
```

### 5. **Wordmark with Custom Colors**

```tsx
<AmWordmark
  layout="horizontal"
  size="md"
  colors={{
    aColor: "#ff00ff",
    mColor: "#00ffff",
  }}
/>
```

### 6. **Icon/Favicon with Custom Colors**

```tsx
<AmIcon
  size="md"
  colors={{
    background: "#ffffff",
    aColor: "#ff0000",
    mColor: "#00ff00",
  }}
/>
```

---

## CSS Custom Properties Reference

### Available Variables

| Variable          | Default   | Purpose                                |
| ----------------- | --------- | -------------------------------------- |
| `--logo-bg-color` | `#3d7a70` | Background rectangle color (dark teal) |
| `--logo-a-color`  | `#f5f7f8` | "A" letter color (off-white)           |
| `--logo-m-color`  | `#111c2a` | "M" letter color (dark navy)           |

### Where They're Used

1. **Global**: `apps/web/app/globals.css` (`:root` selector)
2. **Components**: `packages/ui/src/components/branding/am-logo.tsx`, `am-wordmark.tsx`, `am-icon.tsx`
3. **SVG Files**: `apps/web/public/logos/am-tech-logo.svg`

---

## Dynamic Color Themes

### Example: Light Theme Variant

```css
@media (prefers-color-scheme: light) {
  :root {
    --logo-bg-color: #ffffff;
    --logo-a-color: #d42e1f;
    --logo-m-color: #007a3a;
  }
}
```

### Example: Accent Variant

```css
.logo-accent {
  --logo-bg-color: #1a1a1a;
  --logo-a-color: #00ffff;
  --logo-m-color: #ffff00;
}
```

```tsx
<div className="logo-accent">
  <AmLogo size="md" />
</div>
```

---

## Implementation Details

### How Dynamic Colors Work

Each component (AmLogo, AmWordmark, AmIcon) renders an inline SVG with CSS class bindings:

```tsx
<defs>
  <style>{`
    .cls-1 { fill: var(--logo-bg-color, #231f20); }
    .cls-2 { fill: var(--logo-m-color, #009444); }
    .cls-3 { fill: var(--logo-a-color, #ed1c24); }
  `}</style>
</defs>
```

The SVG respects the CSS cascade, so colors inherit from:

1. **Component props** (highest priority)
2. **Inline styles** on parent element
3. **CSS classes** applied to container
4. **CSS variables** in `:root`
5. **Fallback colors** (hardcoded defaults)

---

## Changing Colors Later

### Quick Global Change

To change the logo colors across the entire platform:

1. Edit `apps/web/app/globals.css`
2. Update the `:root` CSS variables:
   ```css
   --logo-bg-color: #NEW_COLOR;
   --logo-a-color: #NEW_COLOR;
   --logo-m-color: #NEW_COLOR;
   ```
3. Save and the change applies everywhere instantly

### Per-Instance Change

For specific pages or sections, wrap the logo with custom colors:

```tsx
<div
  style={{
    "--logo-a-color": "#ff00ff",
    "--logo-m-color": "#00ff00",
  }}
>
  <AmLogo size="md" />
</div>
```

### Theme-Based Change

Create theme variants in CSS:

```css
.theme-dark {
  --logo-a-color: #ff4444;
  --logo-m-color: #44ff44;
}

.theme-light {
  --logo-a-color: #cc0000;
  --logo-m-color: #00cc00;
}
```

---

## Technical Notes

### Browser Support

- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ IE11+ with fallback colors (hardcoded defaults)
- ✅ Mobile browsers fully supported

### Performance

- ✅ Zero layout shift (no image loading)
- ✅ Fast color changes (instant CSS updates)
- ✅ Lightweight SVG files (< 2KB)

### Accessibility

- ✅ ARIA labels preserved
- ✅ Color contrast maintained (verify with your chosen colors)
- ✅ Semantic HTML structure

---

## Troubleshooting

### Colors Not Changing?

1. Check CSS variable names are spelled correctly
2. Verify CSS is loaded before components render
3. Check browser DevTools: Inspect → Styles → look for CSS variable values
4. Ensure no `!important` rules override the variables

### Fallback Not Working?

If colors still don't apply, add `!important` to the CSS variable:

```css
:root {
  --logo-a-color: #ff0000 !important;
}
```

---

## Files Modified

- ✅ `apps/web/public/logos/am-tech-logo.svg` — Dynamic color support
- ✅ `packages/ui/src/components/branding/am-logo.tsx` — Dynamic colors prop
- ✅ `packages/ui/src/components/branding/am-wordmark.tsx` — Dynamic colors prop
- ✅ `packages/ui/src/components/branding/am-icon.tsx` — Dynamic colors prop
- ✅ `apps/web/app/globals.css` — CSS custom properties

---

_Last updated: 2026-05-18_
