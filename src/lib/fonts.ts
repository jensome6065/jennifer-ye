import { Barlow_Condensed, IBM_Plex_Sans } from "next/font/google";

/**
 * Body/UI typeface — IBM Plex Sans.
 * Clean grotesque with more character than Inter; pairs with the condensed
 * display without reading like a generic developer portfolio.
 */
export const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-sans-family",
});

/**
 * Display typeface — Barlow Condensed.
 * Bold, streetwear-editorial energy (SNKRS / subway signage attitude)
 * without costume fonts. Used for names, section titles, large labels.
 */
export const display = Barlow_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
  variable: "--font-display",
});
