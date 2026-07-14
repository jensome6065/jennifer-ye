/**
 * Shared domain types for the portfolio.
 * Kept centralized so content files and components share a single source of truth.
 */

export interface NavItem {
  label: string;
  href: string;
}

export type SocialPlatform = "github" | "linkedin" | "email" | "spotify";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  description: string;
  url: string;
  nav: NavItem[];
  social: SocialLink[];
}
