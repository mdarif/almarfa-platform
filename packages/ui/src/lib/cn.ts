export function cn(
  ...classes: ReadonlyArray<string | false | null | undefined>
) {
  return classes.filter(Boolean).join(" ");
}
