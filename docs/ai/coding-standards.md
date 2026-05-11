# Al Marfa Technologies — Coding Standards

# Purpose

This document defines coding conventions and implementation standards for the platform.

The goal is:
- maintainability
- consistency
- readability
- scalability
- low cognitive overhead

Code should feel:
- predictable
- composable
- explicit
- calm
- maintainable

---

# 1. General Principles

Prefer:
- clarity over cleverness
- maintainability over brevity
- explicitness over magic
- composition over complexity

Avoid:
- premature optimization
- over-abstraction
- framework gimmicks
- dense component logic

---

# 2. TypeScript Standards

Use strict TypeScript settings.

Prefer:
- explicit typing
- discriminated unions
- typed component props
- readonly data structures where appropriate

Avoid:
- unnecessary any usage
- implicit assumptions
- unsafe casting

---

# 3. Component Philosophy

Components should:
- have single responsibilities
- remain composable
- stay predictable
- avoid excessive prop complexity

Prefer:
- small focused primitives
- layout composition
- semantic naming

Avoid:
- giant multi-purpose components
- prop explosion
- deeply nested conditionals

---

# 4. File & Folder Naming

Use:
- kebab-case for folders
- PascalCase for React components
- semantic naming

Avoid:
- vague naming
- generic utility dumping

Examples:
- HeroSection.tsx
- ArticleCard.tsx
- typography.ts
- section.tsx

---

# 5. Styling Principles

Use Tailwind CSS as the primary styling system.

Prefer:
- semantic utility composition
- reusable primitives
- token-based spacing
- predictable layout systems

Avoid:
- arbitrary values
- inline style clutter
- inconsistent spacing patterns

---

# 6. Accessibility Standards

All UI must:
- support keyboard navigation
- use semantic HTML
- include accessible labels
- preserve focus visibility

Accessibility is required by default.

---

# 7. React Standards

Prefer:
- server components by default
- client components only when necessary
- minimal client-side state

Avoid:
- unnecessary useEffect usage
- excessive hydration
- client-heavy architecture

---

# 8. Content Rendering

Content systems should:
- support MDX
- preserve semantic structure
- optimize readability

Avoid:
- raw HTML injection
- content-specific hacks

---

# 9. SEO Standards

Every page should include:
- metadata
- canonical URLs
- semantic headings
- structured hierarchy

---

# 10. Performance Standards

Optimize for:
- lightweight bundles
- minimal JavaScript
- responsive rendering
- fast navigation

Avoid:
- unnecessary dependencies
- oversized libraries
- animation-heavy interactions

---

# 11. Dependency Philosophy

Every dependency introduces:
- maintenance cost
- bundle impact
- architectural risk

Prefer:
- mature libraries
- minimal dependency count
- stable ecosystems

Avoid:
- trend-driven package adoption
- unnecessary abstraction libraries

---

# 12. Documentation Standards

Document:
- architectural intent
- complex decisions
- reusable systems

Avoid:
- redundant comments
- obvious code narration

Good documentation explains:
- why
not:
- what

---

# 13. AI-Assisted Development

AI-generated code must:
- follow repository standards
- remain maintainable
- preserve readability
- align with architecture principles

Never merge AI-generated code without review.