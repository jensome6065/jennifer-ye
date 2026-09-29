import Link from "next/link";
import { Container } from "@/components/ui/container";
import { NycStamp } from "@/components/ui/nyc-stamp";
import { PlaceCrumbs } from "@/components/ui/place-crumbs";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/lib/site-config";

const YEAR = new Date().getFullYear();

/**
 * Footer with a late-night navy wash — one atmospheric NYC band, not a costume.
 * Stamp + place crumbs keep the brand personal without skyline chrome.
 */
export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border night-wash">
      <Container as="div" className="relative z-10 py-14">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
          <div className="space-y-4">
            <NycStamp />
            <Link
              href="/"
              className="block font-display text-lg font-bold uppercase tracking-[0.06em] text-foreground transition-opacity hover:opacity-70"
            >
              {siteConfig.name}
            </Link>
            <p className="max-w-xs text-sm text-muted">{siteConfig.role}</p>
            <PlaceCrumbs className="pt-1" />
          </div>

          <SocialLinks />
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/80 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {YEAR} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built with Next.js, Tailwind CSS &amp; Framer Motion.</p>
        </div>
      </Container>
    </footer>
  );
}
