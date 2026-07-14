import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site-config";

/**
 * Site-wide Open Graph / Twitter card, generated at build time. Next also
 * wires the resulting URL into the root metadata automatically, so link
 * unfurls for the home and section pages share one branded card.
 */
export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Portfolio",
    title: siteConfig.name,
    subtitle: siteConfig.description,
  });
}
