import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function HeroSection() {
  return (
    <Section>
      <Container>
        <div className="max-w-4xl">
          <h1 className="heading-hero max-w-5xl">
            Enterprise Frontend Platforms &
            Design Systems
          </h1>

          <p className="body-large mt-10 max-w-xl">
            Al Marfa Technologies helps engineering organizations
            build scalable frontend ecosystems, developer platforms,
            and shared UI infrastructure.
          </p>
        </div>
      </Container>
    </Section>
  );
}