import type { SiteConfig } from "@/types";

/**
 * Single source of truth for global site metadata, navigation, and social links.
 * Editing this file updates the navbar, footer, and SEO metadata everywhere.
 */
export const siteConfig: SiteConfig = {
  name: "Jennifer Ye",
  role: "Software Engineer",
  description:
    "I can't sit still — whether that's learning, building, or exploring.",
  url: "https://jensome6065.github.io",
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "Lifestyle", href: "/lifestyle" },
  ],
  social: [
    {
      platform: "github",
      label: "GitHub",
      href: "https://github.com/jensome6065",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/",
    },
    {
      platform: "email",
      label: "Email",
      href: "mailto:hello@example.com",
    },
    {
      platform: "spotify",
      label: "Spotify",
      href: "https://open.spotify.com/",
    },
  ],
};
