import { createPageMetadata } from "@repo/seo";
import { Body, Caption, Container, Heading, Section, Stack } from "@repo/ui";
import Link from "next/link";

export const metadata = createPageMetadata({
  description:
    "Contact Al Marfa for architecture advisory conversations about frontend platforms and technical leadership.",
  pathname: "/contact",
  title: "Contact",
});

export default function ContactPage() {
  return (
    <main>
      <PositioningSection />
      <ExpectationsSection />
      <InquirySection />
    </main>
  );
}

/**
 * Positioning - what to expect from contacting us
 */
function PositioningSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg" className="max-w-measure-wide">
          <Caption tone="accent">Contact</Caption>
          <Heading>
            Architecture advisory conversations for enterprise frontend platforms.
          </Heading>
          <Body size="large">
            Al Marfa works with engineering leadership on the architectural and
            governance decisions that shape sustainable frontend platforms. Use
            this form to start a conversation about your platform challenges.
          </Body>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Set expectations about the engagement process
 */
function ExpectationsSection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg">
          <Caption tone="accent">How This Works</Caption>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-rhythm-xl">
            <Stack gap="md" className="max-w-measure-narrow">
              <Heading as="h3" size="sm">What happens next</Heading>
              <ul className="space-y-rhythm-sm">
                <li className="flex gap-rhythm-sm">
                  <span className="text-accent font-semibold flex-shrink-0">→</span>
                  <span className="text-sm">
                    <Body measure="content">
                      We'll review your inquiry and respond within 48 hours.
                    </Body>
                  </span>
                </li>
                <li className="flex gap-rhythm-sm">
                  <span className="text-accent font-semibold flex-shrink-0">→</span>
                  <span className="text-sm">
                    <Body measure="content">
                      Initial conversation focuses on understanding your platform challenges.
                    </Body>
                  </span>
                </li>
                <li className="flex gap-rhythm-sm">
                  <span className="text-accent font-semibold flex-shrink-0">→</span>
                  <span className="text-sm">
                    <Body measure="content">
                      We'll discuss whether architecture advisory is the right fit.
                    </Body>
                  </span>
                </li>
              </ul>
            </Stack>

            <Stack gap="md" className="max-w-measure-narrow">
              <Heading as="h3" size="sm">What this is not</Heading>
              <ul className="space-y-rhythm-sm">
                <li className="flex gap-rhythm-sm">
                  <span className="text-text/50 font-semibold flex-shrink-0">×</span>
                  <span className="text-sm">
                    <Body measure="content" tone="secondary">
                      We don't offer immediate pricing or service packages.
                    </Body>
                  </span>
                </li>
                <li className="flex gap-rhythm-sm">
                  <span className="text-text/50 font-semibold flex-shrink-0">×</span>
                  <span className="text-sm">
                    <Body measure="content" tone="secondary">
                      This is not a product demo or tool evaluation.
                    </Body>
                  </span>
                </li>
                <li className="flex gap-rhythm-sm">
                  <span className="text-text/50 font-semibold flex-shrink-0">×</span>
                  <span className="text-sm">
                    <Body measure="content" tone="secondary">
                      We focus on architectural thinking, not sales pressure.
                    </Body>
                  </span>
                </li>
              </ul>
            </Stack>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Contact inquiry section with form and email option
 */
function InquirySection() {
  return (
    <Section spacing="default">
      <Container size="content">
        <Stack gap="lg">
          <Caption tone="accent">Get In Touch</Caption>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-rhythm-4xl">
            {/* Email option */}
            <Stack gap="md" className="max-w-measure-narrow">
              <Heading as="h3" size="sm">Direct email</Heading>
              <Body measure="content">
                If you prefer email, reach out directly with a brief description
                of your platform challenges.
              </Body>
              <div className="pt-rhythm-md">
                <p className="font-mono text-sm">hello@almarfa.io</p>
              </div>
            </Stack>

            {/* Contact form */}
            <Stack gap="md" className="max-w-measure-narrow">
              <Heading as="h3" size="sm">Inquiry form</Heading>
              <ContactForm />
            </Stack>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

/**
 * Minimal contact form
 */
function ContactForm() {
  return (
    <form className="space-y-rhythm-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-rhythm-sm">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-rhythm-md py-rhythm-sm border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-rhythm-sm">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-rhythm-md py-rhythm-sm border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="context" className="block text-sm font-medium mb-rhythm-sm">
          Brief context
        </label>
        <textarea
          id="context"
          name="context"
          rows={4}
          required
          className="w-full px-rhythm-md py-rhythm-sm border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          placeholder="Tell us about your platform challenges or what brought you here..."
        />
      </div>

      <button
        type="submit"
        className="px-rhythm-lg py-rhythm-sm bg-accent text-accent-foreground font-medium rounded-sm hover:opacity-90 transition-opacity"
      >
        Send Inquiry
      </button>

      <p className="text-xs text-text/50 pt-rhythm-sm">
        We'll respond within 48 hours. Your information is not shared or sold.
      </p>
    </form>
  );
}
