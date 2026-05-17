export type PageHeroAtmosphere =
  | "default"
  | "insights"
  | "expertise"
  | "services"
  | "publication"
  | "contact";

type PageHeroBackdropProps = {
  atmosphere?: PageHeroAtmosphere;
};

/**
 * Lighter hero wash for inner-page heroes — radial accent only, no topology SVG.
 */
export function PageHeroBackdrop({ atmosphere = "default" }: PageHeroBackdropProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      data-atmosphere={atmosphere}
    >
      <div className="page-hero-atmosphere-wash absolute inset-0" />
    </div>
  );
}
