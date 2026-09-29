import { AnimatedItem, AnimatedSection } from "@/components/ui/animated-section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { homeContent } from "@/content/home";

const { about } = homeContent;

/**
 * About section. An editorial heading paired with a comfortable-measure
 * body. Reveals on scroll, staggering the heading and paragraphs.
 */
export function About() {
  return (
    <Container as="section" className="py-24 sm:py-32">
      <AnimatedSection stagger className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <AnimatedItem>
          <SectionHeader
            eyebrow={about.eyebrow}
            lineKey="about"
            title={about.heading}
          />
        </AnimatedItem>
        <AnimatedItem className="space-y-5">
          {about.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </AnimatedItem>
      </AnimatedSection>
    </Container>
  );
}
