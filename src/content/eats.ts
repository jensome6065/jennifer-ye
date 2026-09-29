/**
 * Eats content (Milestone 6, Lifestyle).
 *
 * Structured, typed spots — restaurants, bakeries, cafes, and dessert shops —
 * so the Eats section renders from data. Adding or editing a spot means
 * touching only this file. Types are co-located here (mirroring
 * `content/projects.ts` and `content/experience.ts`).
 *
 * Spots can be anywhere — not NYC-only. Prefer `mapsUrl` and/or `menuUrl`
 * so visitors can get there or see what to order.
 *
 * `beli` is your personal Beli ranking (0–10, one decimal) — shown on the
 * menu in place of a price. Edit scores here; the menu sorts highest first.
 */

/** What kind of place — drives the favorite caption label. */
export type SpotKind = "restaurant" | "bakery" | "cafe" | "dessert" | "bar";

/**
 * Lifestyle Eats filter chips. Coarser than `SpotKind` so visitors can browse
 * by intent: sit-down food, coffee/tea, or sweets (bakeries + desserts).
 */
export type SpotFilter = "restaurants" | "cafes" | "sweets";

export const SPOT_FILTER_ORDER: SpotFilter[] = [
  "restaurants",
  "cafes",
  "sweets",
];

export const SPOT_FILTERS: Record<
  SpotFilter,
  { label: string; kinds: readonly SpotKind[]; menuHeading: string }
> = {
  restaurants: {
    label: "Restaurants",
    kinds: ["restaurant", "bar"],
    menuHeading: "Restaurants",
  },
  cafes: {
    label: "Cafes",
    kinds: ["cafe"],
    menuHeading: "Cafes & drinks",
  },
  sweets: {
    label: "Sweet treats",
    kinds: ["bakery", "dessert"],
    menuHeading: "Sweet treats",
  },
};

/** An optional real photograph for a spot card. */
export interface SpotPhoto {
  src: string;
  alt: string;
}

/** A single spot on the Eats board. */
export interface Spot {
  /** Stable unique id (React key). */
  id: string;
  /** Spot name. */
  name: string;
  /** What kind of place it is. */
  kind: SpotKind;
  /** Cuisine / category label, e.g. "Korean-American", "Vietnamese coffee". */
  category: string;
  /** Neighborhood / borough, e.g. "East Village, NYC". */
  location: string;
  /**
   * The thing to get — the reason to go back. A dish at a restaurant, a drink
   * at a cafe, a pastry at a bakery.
   */
  favorite: string;
  /** One or two sentences — an editorial mini-review. Optional for cafes & sweets. */
  review?: string;
  /**
   * Personal Beli ranking (0–10). Rendered on the menu where a price would
   * normally sit. One decimal preferred (e.g. 8.7).
   */
  beli: number;
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
  /** Optional link to the place's menu (PDF or website). */
  menuUrl?: string;
  /** Optional Google Maps (or Apple Maps) link for the location. */
  mapsUrl?: string;
}

/** Whether a spot belongs in a given filter chip. */
export function spotMatchesFilter(spot: Spot, filter: SpotFilter): boolean {
  return SPOT_FILTERS[filter].kinds.includes(spot.kind);
}

/** Format a Beli score the way the app shows it (one decimal). */
export function formatBeli(beli: number): string {
  return beli.toFixed(1);
}

/** Sort spots by Beli ranking, highest first (ties keep original order). */
export function sortByBeli(list: Spot[]): Spot[] {
  return [...list].sort((a, b) => b.beli - a.beli);
}

/**
 * Favorite spots — restaurants, bakeries, cafes, and desserts. Photos live in
 * `/public/images/eats/`. Add non-NYC places freely; fill `mapsUrl` / `menuUrl`.
 */
export const spots: Spot[] = [
  {
    id: "nowon",
    name: "Nowon",
    kind: "restaurant",
    category: "Korean-American",
    location: "East Village / Bushwick, NYC",
    favorite: "The Legendary Cheeseburger",
    review:
      "Double smash burger, kimchi special sauce, American cheese, pickles, onion.",
    beli: 8.5,
    cover: { from: "#7a3b2e", to: "#2c140f" },
    photo: {
      src: "/images/eats/nowon.jpg",
      alt: "The Legendary Cheeseburger at Nowon — double smash, kimchi sauce, sesame bun",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Nowon%20East%20Village%20/%20Bushwick%2C%20NYC",
  },
  {
    id: "kjun",
    name: "KJUN",
    kind: "restaurant",
    category: "Korean-Cajun",
    location: "Murray Hill, NYC",
    favorite: "Soy-Marinated Eggs & Cracklin'",
    review:
      "Soft-boiled soy-marinated eggs with wasabi aioli and cracklin'.",
    beli: 8.1,
    cover: { from: "#8a5a1c", to: "#301f08" },
    photo: {
      src: "/images/eats/kjun.jpg",
      alt: "Soy-marinated egg halves with wasabi aioli and cracklin' at KJUN",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=KJUN%20Murray%20Hill%2C%20NYC",
  },
  {
    id: "la-dong",
    name: "La Dong",
    kind: "restaurant",
    category: "Vietnamese",
    location: "Union Square, NYC",
    favorite: "Wagyu Pho",
    review:
      "Miyazaki A5 Wagyu, American Wagyu, chef's signature pho broth & aromatics.",
    beli: 8.4,
    cover: { from: "#7d4a24", to: "#2c190c" },
    photo: {
      src: "/images/eats/ladong.jpg",
      alt: "Wagyu pho at La Dong — broth poured tableside over raw beef and aromatics",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=La%20Dong%20Union%20Square%2C%20NYC",
  },
  {
    id: "sushi-35-west",
    name: "Sushi 35 West",
    kind: "restaurant",
    category: "Sushi",
    location: "Midtown, NYC",
    favorite: "Lunch sushi selection",
    review: "6pc nigiri and one spicy tuna roll.",
    beli: 8.3,
    cover: { from: "#6f4a2b", to: "#2a1c10" },
    photo: {
      src: "/images/eats/sushi-35-west.jpg",
      alt: "Lunch sushi selection at Sushi 35 West — nigiri and spicy tuna rolls",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sushi%2035%20West%20Midtown%2C%20NYC",
  },
  {
    id: "banh-anh-em",
    name: "Banh Anh Em",
    kind: "restaurant",
    category: "Vietnamese",
    location: "East Village, NYC",
    favorite: "O.G. Bánh Mì",
    review:
      "BÁNH ORIGINAL — combination Vietnamese cold cuts on house baked bread.",
    beli: 8.9,
    cover: { from: "#7a4a2e", to: "#2c140f" },
    photo: {
      src: "/images/eats/banh-anh-em.jpg",
      alt: "O.G. bánh mì at Banh Anh Em with pork floss, cold cuts, and herbs",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Banh%20Anh%20Em%20East%20Village%2C%20NYC",
  },
  {
    id: "8282",
    name: "8282",
    kind: "restaurant",
    category: "Modern Korean",
    location: "Lower East Side, NYC",
    favorite: "8282 Steak",
    review:
      "Grilled hanger steak, mashed sweet potatoes, pine nut basil pesto.",
    beli: 8.4,
    cover: { from: "#6a3b2e", to: "#24140f" },
    photo: {
      src: "/images/eats/eight-two-eight-two.jpg",
      alt: "8282 steak with mashed sweet potatoes and pine nut basil pesto",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=8282%20Lower%20East%20Side%2C%20NYC",
  },
  {
    id: "lunette",
    name: "Lunette",
    kind: "restaurant",
    category: "Cambodian",
    location: "Embarcadero, San Francisco, CA",
    favorite: "K.T.P.P. / Pork Noodle Soup",
    review:
      "Rice noodles, shrimp, pork three ways, crispy garlic, cilantro, and scallions in an 8-hour pork broth.",
    beli: 7.9,
    cover: { from: "#7a3b2e", to: "#2c140f" },
    photo: {
      src: "/images/eats/lunette.jpg",
      alt: "K.T.P.P. pork noodle soup at Lunette with shrimp, herbs, and crispy garlic",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Lunette%20Ferry%20Building%20San%20Francisco%2C%20CA",
  },
  {
    id: "quanjude",
    name: "Quanjude Roast Duck Restaurant",
    kind: "restaurant",
    category: "Beijing roast duck",
    location: "Beijing, China",
    favorite: "Quanjude Signature Beijing Duck",
    review:
      "Steamed crepe, scallion, cucumber, sweet soybean paste.",
    beli: 7.4,
    cover: { from: "#8a5a1c", to: "#301f08" },
    photo: {
      src: "/images/eats/quanjude.jpg",
      alt: "Quanjude signature Beijing duck plated as a rose on a calligraphy platter",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Quanjude%20Roast%20Duck%20Restaurant%20Beijing%2C%20China",
  },
  {
    id: "geoffs-superlative-sandwiches",
    name: "Geoff's Superlative Sandwiches",
    kind: "restaurant",
    category: "Sandwiches",
    location: "Fox Point, Providence, RI",
    favorite: "Providence Monthly",
    review:
      "Grilled chicken with melted Muenster on a bun with lettuce, tomato, onion, avocado & Shedd's sauce.",
    beli: 6.5,
    cover: { from: "#9a6b2f", to: "#33240f" },
    photo: {
      src: "/images/eats/geoffs.jpg",
      alt: "Providence Monthly sandwich from Geoff's — grilled chicken, avocado, and Shedd's sauce",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Geoff%27s%20Superlative%20Sandwiches%20Fox%20Point%20Providence%2C%20RI",
  },
  {
    id: "le-phin",
    name: "Le Phin",
    kind: "cafe",
    category: "Vietnamese coffee",
    location: "East Village, NYC",
    favorite: "Jasmine Pandan Matcha Latte",
    beli: 8.1,
    cover: { from: "#7d4a24", to: "#2c190c" },
    photo: {
      src: "/images/eats/le-phin.jpg",
      alt: "Iced jasmine pandan matcha latte at Le Phin beside Vietnamese coffee art",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Le%20Phin%20East%20Village%2C%20NYC",
  },
  {
    id: "brooklyn-ball-factory",
    name: "Brooklyn Ball Factory",
    kind: "cafe",
    category: "Cafe & mochi donuts",
    location: "Williamsburg, NYC",
    favorite: "Matcha Tiramisu Latte",
    beli: 8.2,
    cover: { from: "#8a5a1c", to: "#301f08" },
    photo: {
      src: "/images/eats/brooklyn-ball-factory.jpg",
      alt: "Matcha tiramisu latte in a takeaway cup at Brooklyn Ball Factory",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Brooklyn%20Ball%20Factory%20Williamsburg%2C%20NYC",
  },
  {
    id: "verse",
    name: "Verse",
    kind: "cafe",
    category: "Coffee",
    location: "Long Island City, NYC",
    favorite: "Earl Grey Lavender Matcha",
    beli: 9.1,
    cover: { from: "#9a6b2f", to: "#33240f" },
    photo: {
      src: "/images/eats/verse.jpg",
      alt: "Layered earl grey lavender matcha drink at Verse",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Verse%20Long%20Island%20City%2C%20NYC",
  },
  {
    id: "phin-coffee-house",
    name: "Phin Coffee House",
    kind: "cafe",
    category: "Vietnamese coffee",
    location: "Boston, MA",
    favorite: "Matcha Snow",
    beli: 8.3,
    cover: { from: "#6f4a2b", to: "#2a1c10" },
    photo: {
      src: "/images/eats/phin-coffee-house.jpg",
      alt: "Matcha Snow iced drink in a Phin Coffee House cup",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Phin%20Coffee%20House%20Boston%2C%20MA",
  },
  {
    id: "tong-sui-coconut-lab",
    name: "Tong Sui Coconut Lab",
    kind: "cafe",
    category: "Hong Kong dessert",
    location: "Santa Clara / San Jose, CA",
    favorite: "Matcha Coconut Cold Brew",
    beli: 8.0,
    cover: { from: "#7d4a24", to: "#2c190c" },
    photo: {
      src: "/images/eats/tong-sui.jpg",
      alt: "Layered matcha coconut cold brew at Tong Sui Coconut Lab",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Tong%20Sui%20Coconut%20Lab%20Valley%20Fair%20Santa%20Clara%2C%20CA",
  },
  {
    id: "cha-thai-tea",
    name: "Cha Thai Tea",
    kind: "cafe",
    category: "Thai tea",
    location: "North Shattuck, Berkeley, CA",
    favorite: "Black Sesame Thai Milk Tea",
    beli: 7.8,
    cover: { from: "#9a6b3f", to: "#33240f" },
    photo: {
      src: "/images/eats/cha-thai.jpg",
      alt: "Black sesame Thai milk tea with foam at Cha Thai Tea",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Cha%20Thai%20Tea%20North%20Shattuck%20Berkeley%2C%20CA",
  },
  {
    id: "maruwu-seicha",
    name: "Maruwu Seicha",
    kind: "cafe",
    category: "Japanese tea",
    location: "Japantown, San Francisco, CA",
    favorite: "Velvet Soy Matcha + Soy Top",
    beli: 8.3,
    cover: { from: "#6a5a3e", to: "#24180f" },
    photo: {
      src: "/images/eats/maruwu-seicha.jpg",
      alt: "Velvet soy matcha with soy foam top at Maruwu Seicha",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Maruwu%20Seicha%20Japantown%20San%20Francisco%2C%20CA",
  },
  {
    id: "the-wild-fox",
    name: "The Wild Fox",
    kind: "cafe",
    category: "Japanese cafe",
    location: "Financial District, San Francisco, CA",
    favorite: "Kikyo Kinako Matcha",
    beli: 6.9,
    cover: { from: "#7a3b2e", to: "#2c140f" },
    photo: {
      src: "/images/eats/the-wild-fox.jpg",
      alt: "Kikyo kinako matcha iced latte at The Wild Fox",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=The%20Wild%20Fox%20Battery%20Street%20San%20Francisco%2C%20CA",
  },
  {
    id: "sextant-coffee-roasters",
    name: "Sextant Coffee Roasters",
    kind: "cafe",
    category: "Coffee",
    location: "Yerba Buena, San Francisco, CA",
    favorite: "Ube Latte",
    beli: 7.1,
    cover: { from: "#8f6326", to: "#31230f" },
    photo: {
      src: "/images/eats/sextant.jpg",
      alt: "Iced ube latte at Sextant Coffee Roasters",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sextant%20Coffee%20Roasters%20Yerba%20Buena%20San%20Francisco%2C%20CA",
  },
  {
    id: "kora",
    name: "Kora",
    kind: "bakery",
    category: "Filipino bakery",
    location: "Sunnyside, NYC",
    favorite: "Ensaymada Croissant",
    beli: 8.9,
    cover: { from: "#8a5a2c", to: "#301f08" },
    photo: {
      src: "/images/eats/kora.jpg",
      alt: "Ensaymada croissant topped with shredded cheese at Kora",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Kora%20Sunnyside%2C%20NYC",
  },
  {
    id: "dominique-ansel",
    name: "Dominique Ansel Bakery",
    kind: "bakery",
    category: "Pastry",
    location: "Soho, NYC",
    favorite: "What-a-Melon Soft Serve",
    beli: 7.9,
    cover: { from: "#7a4a2e", to: "#2c140f" },
    photo: {
      src: "/images/eats/dominique-ansel.jpg",
      alt: "What-a-Melon soft serve on a watermelon slice at Dominique Ansel Bakery",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Dominique%20Ansel%20Bakery%20Soho%2C%20NYC",
  },
  {
    id: "yuanyang-dessert",
    name: "YuanYang Dessert",
    kind: "dessert",
    category: "Hong Kong dessert",
    location: "Flushing, NYC",
    favorite: "Matcha Shaved Ice Cream & Milk Custard w/ Mango",
    beli: 8.2,
    cover: { from: "#7a3b2e", to: "#2c140f" },
    photo: {
      src: "/images/eats/yuanyang-dessert.jpg",
      alt: "Matcha shaved ice and milk custard with mango at YuanYang Dessert",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=YuanYang%20Dessert%20Flushing%2C%20NYC",
  },
  {
    id: "meet-fresh",
    name: "Meet Fresh USA",
    kind: "dessert",
    category: "Taiwanese dessert",
    location: "Flushing / Bayside, NYC",
    favorite: "Pudding & Q Mochi Milk Shaved Ice",
    beli: 7.5,
    cover: { from: "#9a6b2f", to: "#33240f" },
    photo: {
      src: "/images/eats/meet-fresh.jpg",
      alt: "Milk shaved ice with pudding and Q mochi at Meet Fresh",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Meet%20Fresh%20USA%20Flushing%20/%20Bayside%2C%20NYC",
  },
  {
    id: "yuja",
    name: "Yuja",
    kind: "dessert",
    category: "Chinese frozen yogurt",
    location: "Rincon Hill, San Francisco, CA",
    favorite: "Froyo w/ Lemon Curd and Blueberry Sauce",
    beli: 7.3,
    cover: { from: "#7a4a2e", to: "#2c140f" },
    photo: {
      src: "/images/eats/yuja.jpg",
      alt: "Frozen yogurt topped with lemon curd and blueberry sauce at Yuja",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Yuja%20Rincon%20Hill%20San%20Francisco%2C%20CA",
  },
  {
    id: "tricycle-ice-cream",
    name: "Tricycle Ice Cream",
    kind: "dessert",
    category: "Ice cream",
    location: "Providence, RI",
    favorite: "Matcha & Mixed Berries Macaron Ice Cream Sandwich",
    beli: 8.2,
    cover: { from: "#6f4a2b", to: "#2a1c10" },
    photo: {
      src: "/images/eats/tricycle.jpg",
      alt: "Matcha and mixed berries macaron ice cream sandwich at Tricycle",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Tricycle%20Ice%20Cream%20Providence%2C%20RI",
  },
  {
    id: "normans-ice-cream",
    name: "Norman's Ice Cream & Freezes",
    kind: "dessert",
    category: "Ice cream",
    location: "San Francisco, CA",
    favorite: "Halo Halo w/ Ube Ice Cream",
    beli: 7.2,
    cover: { from: "#8a5a2c", to: "#301f08" },
    photo: {
      src: "/images/eats/normans.jpg",
      alt: "Halo-halo with a scoop of ube ice cream at Norman's",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Norman%27s%20Ice%20Cream%20%26%20Freezes%20San%20Francisco%2C%20CA",
  },
  {
    id: "powder",
    name: "Powder",
    kind: "dessert",
    category: "Taiwanese shaved snow",
    location: "Lower Haight, San Francisco, CA",
    favorite: "Cereal Snow w/ Mochi",
    beli: 8.2,
    cover: { from: "#7d4a24", to: "#2c190c" },
    photo: {
      src: "/images/eats/powder.jpg",
      alt: "Cereal snow with mochi at Powder",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Powder%20Shaved%20Snow%20Lower%20Haight%20San%20Francisco%2C%20CA",
  },
  {
    id: "berryline",
    name: "Berryline",
    kind: "dessert",
    category: "Frozen yogurt",
    location: "Cambridge, MA",
    favorite: "Original Froyo w/ Strawberries & Mochi",
    beli: 8.7,
    cover: { from: "#8f6326", to: "#31230f" },
    photo: {
      src: "/images/eats/berryline.jpg",
      alt: "Original froyo with strawberries and mochi at Berryline",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Berryline%20Cambridge%2C%20MA",
  },
];

/** All spots, in display order (unsorted — menu sorts by Beli). */
export const getSpots = (): Spot[] => spots;
