import { Container } from "@/components/ui/container";

interface PagePlaceholderProps {
  title: string;
  description: string;
  milestone: string;
}

/**
 * Temporary section scaffold used while pages are built out in later
 * milestones. Keeps routing and layout verifiable without shipping
 * throwaway markup inside each page file.
 */
export function PagePlaceholder({
  title,
  description,
  milestone,
}: PagePlaceholderProps) {
  return (
    <Container as="section" className="py-24 sm:py-32">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted">
        {milestone}
      </p>
      <h1 className="text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
        {description}
      </p>
    </Container>
  );
}
