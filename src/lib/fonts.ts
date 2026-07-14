import { Inter, Space_Grotesk } from "next/font/google";

/**
 * Body/UI typeface — Inter variable, optimized via next/font.
 * Exposed as `--font-inter` and consumed by `--font-sans` in globals.css.
 */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Display typeface for large editorial headings.
 * Space Grotesk gives a confident, slightly technical character
 * without reading like a generic developer portfolio.
 */
export const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
