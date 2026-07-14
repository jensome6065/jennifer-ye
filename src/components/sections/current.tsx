import { ArrowUpRight } from "lucide-react";
import { AnimatedItem, AnimatedSection } from "@/components/ui/animated-section";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { homeContent } from "@/content/home";
import type { CurrentItem } from "@/content/home";
import { cn } from "@/lib/utils";

const { current } = homeContent;

/** Inner content of a Current card, shared between the link and static forms. */
function CardBody({ item }: { item: CurrentItem }) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <Badge variant="brand">{item.label}</Badge>
        {item.href && (
          <ArrowUpRight
            className="h-4 w-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
            aria-hidden
          />
        )}
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">
        {item.title}
      </h3>
      {item.detail && (
        <p className="mt-2 text-pretty text-muted-foreground">{item.detail}</p>
      )}
    </>
  );
}

const cardClasses =
  "group h-full rounded-2xl border border-border bg-background-elevated p-6 transition-[border-color,box-shadow] duration-300";

/**
 * "Currently" section — a compact grid of what Jennifer is building,
 * learning, and involved in. Cards with a link get an interactive hover;
 * static cards stay quiet. Reveals with a stagger on scroll.
 */
export function Current() {
  return (
    <Container as="section" className="py-24 sm:py-32">
      <SectionHeader eyebrow={current.eyebrow} title={current.heading} />
      <AnimatedSection
        stagger
        as="ul"
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {current.items.map((item) => (
          <AnimatedItem as="li" key={item.title}>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  cardClasses,
                  "block hover:border-brand/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                )}
              >
                <CardBody item={item} />
              </a>
            ) : (
              <div className={cardClasses}>
                <CardBody item={item} />
              </div>
            )}
          </AnimatedItem>
        ))}
      </AnimatedSection>
    </Container>
  );
}
