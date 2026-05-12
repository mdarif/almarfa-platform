// Minimal class composer for primitives that do not need tailwind-merge semantics.
export function cn(
  ...classes: ReadonlyArray<string | false | null | undefined>
) {
  return classes.filter(Boolean).join(" ");
}
