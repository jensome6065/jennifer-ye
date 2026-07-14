import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

/**
 * Placeholder home hero for Milestone 1 — validates the layout, theme,
 * typography, and navigation shell. The full home page (hero, about,
 * featured projects, etc.) is built in Milestone 3.
 */
export default function HomePage() {
  return (
    <Container
      as="section"
      className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-24"
    >
      <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-muted">
        {siteConfig.role}
      </p>
      <h1 className="max-w-4xl text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
        {siteConfig.name}
      </h1>
      <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl">
        {siteConfig.description}
      </p>
      <div className="mt-10">
        <Button href="/projects" size="lg" className="group">
          View Projects
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </Container>
  );
}
