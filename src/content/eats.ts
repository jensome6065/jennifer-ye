/**
 * Eats content (Milestone 6, Lifestyle).
 *
 * Structured, typed spots — restaurants, cafes, and bars — so the Eats section
 * renders from data. Adding or editing a spot means touching only this file.
 * Types are co-located here (mirroring `content/projects.ts` and
 * `content/experience.ts`): this shape is unique to the Eats section and
 * shared with nothing else, so it does not belong in the global `types/`.
 */

/** What kind of place — drives the label ("Order this" vs "Sip this"). */
export type SpotKind = "restaurant" | "cafe" | "bar";

/** An optional real photograph for a spot card. */
export interface SpotPhoto {
  src: string;
  alt: string;
}

/** A single spot on the Eats board — a restaurant, cafe, or bar. */
export interface Spot {
  /** Stable unique id (React key). */
  id: string;
  /** Spot name. */
  name: string;
  /** What kind of place it is. */
  kind: SpotKind;
  /** Cuisine / category label, e.g. "Sichuan", "Third-wave coffee". */
  category: string;
  /** City / neighborhood, e.g. "San Francisco, CA". */
  location: string;
  /**
   * The thing to get — the reason to go back. A dish at a restaurant, a drink
   * at a cafe or bar. The card labels it by `kind`.
   */
  favorite: string;
  /** Rating out of 5, in half-star steps (e.g. 4.5). */
  rating: number;
  /** One or two sentences — an editorial mini-review. */
  review: string;
  /**
   * Two-tone gradient endpoints (CSS colors) for the generated cover, used
   * until a real photo is added. Warm-leaning to suit the Eats section.
   */
  cover: { from: string; to: string };
  /**
   * Optional real photo. When present it renders instead of the generated
   * gradient cover (drop a file in /public and set the path).
   */
  photo?: SpotPhoto;
  /** Optional link (map, website, reservation). */
  href?: string;
}

/**
 * NOTE: Copy below is a first-draft scaffold — revise freely. The structure is
 * stable; only the strings change. Cover gradients lean warm (amber/terracotta)
 * so the board reads appetizing until real photography is added.
 */
export const spots: Spot[] = [
  {
    id: "rintaro",
    name: "Rintaro",
    kind: "restaurant",
    category: "Izakaya",
    location: "San Francisco, CA",
    favorite: "Charcoal-grilled skewers & house udon",
    rating: 5,
    review:
      "Everything tastes made by hand because it is — the kind of room where a plate of yakitori feels like a small event.",
    cover: { from: "#7a3b2e", to: "#2c140f" },
  },
  {
    id: "nari",
    name: "Nari",
    kind: "restaurant",
    category: "Thai",
    location: "San Francisco, CA",
    favorite: "Crab curry over rice noodles",
    rating: 4.5,
    review:
      "Bold, layered, and unafraid — Thai cooking treated with the seriousness of a tasting menu without losing the joy of it.",
    cover: { from: "#8a5a1c", to: "#301f08" },
  },
  {
    id: "saint-frank",
    name: "Saint Frank Coffee",
    kind: "cafe",
    category: "Third-wave coffee",
    location: "San Francisco, CA",
    favorite: "Cortado & a slice of banana bread",
    rating: 4.5,
    review:
      "My reset button. Bright, balanced espresso and enough calm corners to actually think — the cortado is the move.",
    cover: { from: "#9a6b2f", to: "#33240f" },
  },
  {
    id: "tartine",
    name: "Tartine Bakery",
    kind: "cafe",
    category: "Bakery & cafe",
    location: "San Francisco, CA",
    favorite: "Morning bun & a flat white",
    rating: 4.5,
    review:
      "Worth the line. The morning bun is a masterclass in laminated dough — crisp, buttery, gone in a minute.",
    cover: { from: "#8f6326", to: "#31230f" },
  },
  {
    id: "trick-dog",
    name: "Trick Dog",
    kind: "bar",
    category: "Cocktail bar",
    location: "San Francisco, CA",
    favorite: "Whatever's on the themed menu",
    rating: 4.5,
    review:
      "A cocktail bar that reinvents its menu like a design project — playful concepts, seriously good drinks. Go for the ride.",
    cover: { from: "#6f4a2b", to: "#2a1c10" },
  },
  {
    id: "hometown-noodle",
    name: "Hometown Noodle",
    kind: "restaurant",
    category: "Hand-pulled noodles",
    location: "Seattle, WA",
    favorite: "Beef noodle soup, extra chili",
    rating: 4,
    review:
      "The kind of unassuming spot that ruins other noodle soups for you. Broth with real depth and noodles pulled to order.",
    cover: { from: "#7d4a24", to: "#2c190c" },
  },
];

/** All spots, in display order. */
export const getSpots = (): Spot[] => spots;
