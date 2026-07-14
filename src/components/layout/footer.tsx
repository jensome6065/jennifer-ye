import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/lib/site-config";

const YEAR = new Date().getFullYear();

/**
 * Minimal site footer: brand, social icon links, and a small tech credit.
 * Server component — no interactivity required.
 */
export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <Container as="div" className="py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <Link
              href="/"
              className="font-display text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
            >
              {siteConfig.name}
            </Link>
            <p className="max-w-xs text-sm text-muted">{siteConfig.role}</p>
          </div>

          <SocialLinks />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {YEAR} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built with Next.js, Tailwind CSS &amp; Framer Motion.</p>
        </div>
      </Container>
    </footer>
  );
}
