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
  /** One or two sentences — an editorial mini-review. */
  review: string;
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
 *
 * `beli` values are placeholders — replace with your real Beli rankings.
 */
export const spots: Spot[] = [
  {
    id: "nowon",
    name: "Nowon",
    kind: "restaurant",
    category: "Korean-American",
    location: "East Village / Bushwick, NYC",
    favorite: "Chopped cheese rice cakes",
    review:
      "Korean-American comfort food with bold flavors — legendary chopped cheese rice cakes and creative cocktails worth the trip.",
    beli: 9.2,
    cover: { from: "#7a3b2e", to: "#2c140f" },
    photo: {
      src: "/images/eats/nowon.webp",
      alt: "Loaded burger and Korean-American small plates at Nowon",
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
    favorite: "Jambalaya fried rice",
    review:
      "A mashup of Korean and Cajun influences with standout jambalaya fried rice and rotating market-driven specials.",
    beli: 8.7,
    cover: { from: "#8a5a1c", to: "#301f08" },
    photo: {
      src: "/images/eats/kjun.webp",
      alt: "Louisiana-inspired Korean dishes at KJUN in a cozy dining room",
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
    favorite: "Noodle soups & grilled meats",
    review:
      "Deeply flavored noodle soups, grilled meats, and central Vietnam regional specialties — authentic, not tourist-menu Vietnamese.",
    beli: 8.8,
    cover: { from: "#7d4a24", to: "#2c190c" },
    photo: {
      src: "/images/eats/ladong.jpeg",
      alt: "Vietnamese rice noodle dishes and grilled meats at La Dong",
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
    favorite: "Omakase-style sets",
    review:
      "Small and highly rated near Penn Station — quality fish, omakase-style sets, and quick service that still feels careful.",
    beli: 8.9,
    cover: { from: "#6f4a2b", to: "#2a1c10" },
    photo: {
      src: "/images/eats/sushi-35-west.avif",
      alt: "Assorted premium nigiri and maki set at Sushi 35 West",
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
    favorite: "Banh xeo & shareable plates",
    review:
      "Contemporary Vietnamese from the Di An Di team — shareable plates and bold herb-forward flavors.",
    beli: 8.6,
    cover: { from: "#7a4a2e", to: "#2c140f" },
    photo: {
      src: "/images/eats/banh-anh-em.avif",
      alt: "Vietnamese banh xeo crepe and shared plates at Banh Anh Em",
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
    favorite: "Handmade noodles & small plates",
    review:
      "Inventive Korean small plates, handmade noodles, and a thoughtful natural wine list on the Lower East Side.",
    beli: 9.0,
    cover: { from: "#6a3b2e", to: "#24140f" },
    photo: {
      src: "/images/eats/eight-two-eight-two.webp",
      alt: "Contemporary Korean small plates and noodles at 8282",
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
    favorite: "Noodles & shaking beef",
    review:
      "Nite Yun's Ferry Building Cambodian counter — wok-kissed noodles, peppery broths, and one-plate lunches with real presence.",
    beli: 8.8,
    cover: { from: "#7a3b2e", to: "#2c140f" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Lunette%20Ferry%20Building%20San%20Francisco%2C%20CA",
  },
  {
    id: "quanjude",
    name: "Quanjude Roast Duck Restaurant",
    kind: "restaurant",
    category: "Beijing roast duck",
    location: "Beijing, China",
    favorite: "Peking duck",
    review:
      "The classic — carved tableside Peking duck with thin pancakes, scallion, and sweet bean sauce. Worth the pilgrimage.",
    beli: 9.1,
    cover: { from: "#8a5a1c", to: "#301f08" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Quanjude%20Roast%20Duck%20Restaurant%20Beijing%2C%20China",
  },
  {
    id: "geoffs-superlative-sandwiches",
    name: "Geoff's Superlative Sandwiches",
    kind: "restaurant",
    category: "Sandwiches",
    location: "Fox Point, Providence, RI",
    favorite: "Named specialty sandwiches",
    review:
      "Providence institution with creative, stacked sandwiches and a menu full of local lore — a Fox Point essential.",
    beli: 8.4,
    cover: { from: "#9a6b2f", to: "#33240f" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Geoff%27s%20Superlative%20Sandwiches%20Fox%20Point%20Providence%2C%20RI",
  },
  {
    id: "le-phin",
    name: "Le Phin",
    kind: "cafe",
    category: "Vietnamese coffee",
    location: "East Village, NYC",
    favorite: "Phin-brewed Vietnamese coffee",
    review:
      "Rich phin-brewed drinks, matcha, and a calm minimalist atmosphere — my East Village coffee reset.",
    beli: 9.0,
    cover: { from: "#7d4a24", to: "#2c190c" },
    photo: {
      src: "/images/eats/le-phin.jpg",
      alt: "Vietnamese coffee and pastries served at Le Phin",
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
    favorite: "Rice-ball donuts",
    review:
      "Cozy cafe best known for specialty drinks and chewy rice-ball donuts in unique seasonal flavors.",
    beli: 8.4,
    cover: { from: "#8a5a1c", to: "#301f08" },
    photo: {
      src: "/images/eats/brooklyn-ball-factory.jpg",
      alt: "Specialty coffee and mochi donuts at Brooklyn Ball Factory",
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
    favorite: "Espresso & pastry",
    review:
      "Sleek neighborhood coffee bar with carefully brewed espresso drinks and a strong pastry program.",
    beli: 8.5,
    cover: { from: "#9a6b2f", to: "#33240f" },
    photo: {
      src: "/images/eats/verse.jpg",
      alt: "Coffee and espresso drinks prepared at Verse",
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
    favorite: "Phin-brewed Vietnamese coffee",
    review:
      "Rich phin coffee, condensed milk classics, and a calm spot to reset between Boston errands.",
    beli: 8.3,
    cover: { from: "#6f4a2b", to: "#2a1c10" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Phin%20Coffee%20House%20Boston%2C%20MA",
  },
  {
    id: "tong-sui-coconut-lab",
    name: "Tong Sui Coconut Lab",
    kind: "cafe",
    category: "Hong Kong dessert",
    location: "Santa Clara / San Jose, CA",
    favorite: "Coconut desserts & fruit smoothies",
    review:
      "Hong Kong-style coconut desserts and fresh fruit drinks — light, not overly sweet, and perfect for a Valley Fair pit stop.",
    beli: 8.2,
    cover: { from: "#7d4a24", to: "#2c190c" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Tong%20Sui%20Coconut%20Lab%20Valley%20Fair%20Santa%20Clara%2C%20CA",
  },
  {
    id: "cha-thai-tea",
    name: "Cha Thai Tea",
    kind: "cafe",
    category: "Thai tea",
    location: "North Shattuck, Berkeley, CA",
    favorite: "Thai milk tea",
    review:
      "Berkeley Thai tea specialist — creamy, aromatic milk teas and refreshing Thai drinks on North Shattuck.",
    beli: 8.1,
    cover: { from: "#9a6b3f", to: "#33240f" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Cha%20Thai%20Tea%20North%20Shattuck%20Berkeley%2C%20CA",
  },
  {
    id: "maruwu-seicha",
    name: "Maruwu Seicha",
    kind: "cafe",
    category: "Japanese tea",
    location: "Japantown, San Francisco, CA",
    favorite: "Matcha & Hokkaido milk soft serve",
    review:
      "Japantown tea counter for premium matcha, hojicha, and Hokkaido milk soft serve — everything tastes like tea, on purpose.",
    beli: 8.8,
    cover: { from: "#6a5a3e", to: "#24180f" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Maruwu%20Seicha%20Japantown%20San%20Francisco%2C%20CA",
  },
  {
    id: "the-wild-fox",
    name: "The Wild Fox",
    kind: "cafe",
    category: "Japanese cafe",
    location: "Financial District, San Francisco, CA",
    favorite: "Pour-over & Japanese sandwiches",
    review:
      "Japanese-roasted coffee and matcha with onigiri, chashu sandwiches, and quiet FiDi care — a Spro-adjacent daytime favorite.",
    beli: 8.7,
    cover: { from: "#7a3b2e", to: "#2c140f" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=The%20Wild%20Fox%20Battery%20Street%20San%20Francisco%2C%20CA",
  },
  {
    id: "sextant-coffee-roasters",
    name: "Sextant Coffee Roasters",
    kind: "cafe",
    category: "Coffee",
    location: "Yerba Buena, San Francisco, CA",
    favorite: "House-roasted espresso",
    review:
      "Yerba Buena roasting cafe with dialed-in espresso, pour-overs, and a bright space for a downtown caffeine stop.",
    beli: 8.0,
    cover: { from: "#8f6326", to: "#31230f" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sextant%20Coffee%20Roasters%20Yerba%20Buena%20San%20Francisco%2C%20CA",
  },
  {
    id: "kora",
    name: "Kora",
    kind: "bakery",
    category: "Filipino bakery",
    location: "Sunnyside, NYC",
    favorite: "Brioche donuts, rotating flavors",
    review:
      "Filipino-inspired donut shop known for brioche dough, creative seasonal fillings, and flavors worth the Queens trip.",
    beli: 9.1,
    cover: { from: "#8a5a2c", to: "#301f08" },
    photo: {
      src: "/images/eats/kora.webp",
      alt: "Colorful filled brioche donuts and pastries at Kora",
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
    favorite: "The Cronut",
    review:
      "Home of the Cronut — inventive pastries and a rotating lineup of creative baked desserts in Soho.",
    beli: 8.7,
    cover: { from: "#7a4a2e", to: "#2c140f" },
    photo: {
      src: "/images/eats/dominique-ansel.jpeg",
      alt: "Signature Cronut and pastries at Dominique Ansel Bakery",
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
    favorite: "Sweet soups & tofu pudding",
    review:
      "Popular spot for Hong Kong-style sweet soups, tofu pudding, and warm dessert bowls in Flushing.",
    beli: 8.2,
    cover: { from: "#7a3b2e", to: "#2c140f" },
    photo: {
      src: "/images/eats/yuanyang-dessert.jpeg",
      alt: "Hong Kong-style sweet soups and desserts at YuanYang Dessert",
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
    favorite: "Taro balls & shaved ice",
    review:
      "Taiwanese dessert chain famous for taro balls, shaved ice, herbal jelly, and customizable sweet bowls.",
    beli: 8.3,
    cover: { from: "#9a6b2f", to: "#33240f" },
    photo: {
      src: "/images/eats/meet-fresh.webp",
      alt: "Taiwanese grass jelly, taro balls, and shaved ice at Meet Fresh",
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
    favorite: "Chinese-style froyo",
    review:
      "Here specifically for the house-made Chinese frozen yogurt — tart-sweet buttermilk base with lemon curd blueberry or chocolate cherry honey almond.",
    beli: 8.6,
    cover: { from: "#7a4a2e", to: "#2c140f" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Yuja%20Rincon%20Hill%20San%20Francisco%2C%20CA",
  },
  {
    id: "tricycle-ice-cream",
    name: "Tricycle Ice Cream",
    kind: "dessert",
    category: "Ice cream",
    location: "Providence, RI",
    favorite: "Seasonal scoops",
    review:
      "Providence scoop shop with inventive flavors and a neighborhood sweetness that feels local, not corporate.",
    beli: 8.1,
    cover: { from: "#6f4a2b", to: "#2a1c10" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Tricycle%20Ice%20Cream%20Providence%2C%20RI",
  },
  {
    id: "normans-ice-cream",
    name: "Norman's Ice Cream & Freezes",
    kind: "dessert",
    category: "Ice cream",
    location: "San Francisco, CA",
    favorite: "Classic scoops & freezes",
    review:
      "Old-school SF ice cream counter — straightforward scoops, freezes, and the kind of classic treat that never needs reinventing.",
    beli: 8.0,
    cover: { from: "#8a5a2c", to: "#301f08" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Norman%27s%20Ice%20Cream%20%26%20Freezes%20San%20Francisco%2C%20CA",
  },
  {
    id: "powder",
    name: "Powder",
    kind: "dessert",
    category: "Taiwanese shaved snow",
    location: "Lower Haight, San Francisco, CA",
    favorite: "Shaved snow",
    review:
      "Taiwanese shaved snow made with Straus dairy — light, creamy ribbons that melt like fresh powder. Cereal and ube are hard to beat.",
    beli: 8.9,
    cover: { from: "#7d4a24", to: "#2c190c" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Powder%20Shaved%20Snow%20Lower%20Haight%20San%20Francisco%2C%20CA",
  },
  {
    id: "berryline",
    name: "Berryline",
    kind: "dessert",
    category: "Frozen yogurt",
    location: "Cambridge, MA",
    favorite: "Self-serve froyo & toppings",
    review:
      "Cambridge frozen yogurt classic — tart yogurt, endless toppings, and an easy post-class or post-walk treat.",
    beli: 7.8,
    cover: { from: "#8f6326", to: "#31230f" },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Berryline%20Cambridge%2C%20MA",
  },
];

/** All spots, in display order (unsorted — menu sorts by Beli). */
export const getSpots = (): Spot[] => spots;
