import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container
      as="section"
      className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center py-24 text-center"
    >
      <p className="font-display text-7xl font-semibold tracking-tight text-foreground">
        404
      </p>
      <p className="mt-4 max-w-sm text-pretty text-lg text-muted-foreground">
        This page wandered off. Let&apos;s get you back on track.
      </p>
      <Button href="/" size="lg" className="mt-8">
        Back home
      </Button>
    </Container>
  );
}
