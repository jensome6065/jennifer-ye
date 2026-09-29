import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * 404 — the pigeon stole this page. Quiet NYC easter egg, not a meme dump.
 */
export default function NotFound() {
  return (
    <Container
      as="section"
      className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center py-24 text-center"
    >
      <div className="relative mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cursors/pigeon.svg"
          alt=""
          width={96}
          height={96}
          className="mx-auto opacity-90 drop-shadow-md"
          aria-hidden
        />
        <span
          aria-hidden
          className="absolute -right-2 -top-1 rotate-[12deg] rounded-sm bg-accent px-1.5 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-accent-foreground"
        >
          Got it
        </span>
      </div>

      <p className="font-display text-7xl font-bold uppercase tracking-tight text-foreground sm:text-8xl">
        404
      </p>
      <p className="mt-2 font-display text-sm font-bold uppercase tracking-[0.22em] text-accent">
        Pigeon took this block
      </p>
      <p className="mt-4 max-w-sm text-pretty text-lg text-muted-foreground">
        No skyline here — just a bird with sticky feet and your URL. Head back
        before it finds the bagel cart.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href="/" size="lg">
          Back home
        </Button>
        <Button href="/projects" variant="secondary" size="lg">
          See projects
        </Button>
      </div>
      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        <Link href="/lifestyle" className="link-underline hover:text-foreground">
          Or go feed your curiosity →
        </Link>
      </p>
    </Container>
  );
}
