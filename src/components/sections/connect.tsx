import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { SocialLinks } from "@/components/ui/social-links";
import { homeContent } from "@/content/home";

const { connect } = homeContent;

/**
 * Closing "get in touch" section. A centered invitation with a single
 * accent CTA (the rare gold button, reserved for an important call to
 * action) and the site's social links. Sits above the global footer.
 */
export function Connect() {
  const isEmail = connect.cta.href.startsWith("mailto:");

  return (
    <Container as="section" className="py-24 sm:py-32">
      <AnimatedSection className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <SectionHeader
          align="center"
          eyebrow={connect.eyebrow}
          title={connect.heading}
          description={connect.description}
        />
        <div className="mt-10 flex flex-col items-center gap-8">
          <Button
            href={connect.cta.href}
            variant="accent"
            size="lg"
            {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          >
            {connect.cta.label}
          </Button>
          <SocialLinks />
        </div>
      </AnimatedSection>
    </Container>
  );
}
