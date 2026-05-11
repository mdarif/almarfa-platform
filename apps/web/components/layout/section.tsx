type SectionProps = {
  children: React.ReactNode;
};

export function Section({
  children,
}: SectionProps) {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      {children}
    </section>
  );
}