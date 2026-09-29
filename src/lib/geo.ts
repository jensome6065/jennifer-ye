/**
 * Lightweight map math for the Experience journey.
 *
 * Equirectangular projection into a fixed US canvas, then a scroll-driven
 * camera (pan + zoom) frames each stop as a close-up — long hauls pull back
 * mid-flight, tiny metro hops stay zoomed in and just slide.
 */

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Point {
  x: number;
  y: number;
}

/** Camera framed in projected SVG space. */
export interface MapCamera {
  /** Center x (follows the pin). */
  cx: number;
  /** Center y (slightly above the pin so UI can sit below). */
  cy: number;
  /** Visible width in SVG units — smaller = closer. */
  span: number;
}

/** Contiguous US canvas (Pacific → Maine). */
export const MAP_BOUNDS = {
  west: -125.5,
  east: -66,
  south: 24,
  north: 50,
} as const;

export const MAP_SIZE = {
  width: 1000,
  height: 440,
} as const;

/** Settled frame — regional, enough coast/context to read as a place. */
export const CLOSE_SPAN = 260;

/** Max pullback mid-flight on a coast-to-coast hop. */
export const FAR_SPAN = 980;

/** Tip offset of the pin path (so the point sits on the lat/lng). */
export const PIN_TIP_OFFSET = 18;

/** Full drawn pin height tip→top (before camera scale). */
export const PIN_DESIGN_HEIGHT = 36;

/** Project WGS84 → SVG coordinates inside {@link MAP_BOUNDS}. */
export function project({ lat, lng }: LatLng): Point {
  const { west, east, south, north } = MAP_BOUNDS;
  const { width, height } = MAP_SIZE;
  return {
    x: ((lng - west) / (east - west)) * width,
    y: ((north - lat) / (north - south)) * height,
  };
}

/** Ring of [lat, lng] → SVG path `d` (closed). */
export function ringToPath(ring: LatLng[]): string {
  if (ring.length === 0) return "";
  const pts = ring.map(project);
  const first = pts[0]!;
  const rest = pts.slice(1);
  return [
    `M ${first.x.toFixed(1)} ${first.y.toFixed(1)}`,
    ...rest.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
    "Z",
  ].join(" ");
}

/** Approximate km between two WGS84 points (good enough for hop sizing). */
export function haversineKm(a: LatLng, b: LatLng): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.min(1, Math.sqrt(h)));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Quadratic flight arc between two projected points. Curvature lifts the path
 * “north” on short hops and softens long hauls so the pin never scrapes the
 * straight chord.
 */
export function flightControl(a: Point, b: Point, curvature = 0.22): Point {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const lift = Math.min(140, Math.max(10, len * curvature));
  const up = ny < 0 || (ny === 0 && nx <= 0) ? 1 : -1;
  return {
    x: mx + nx * lift * up,
    y: my + ny * lift * up,
  };
}

export function flightPathD(a: Point, b: Point, curvature?: number): string {
  const c = flightControl(a, b, curvature);
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} Q ${c.x.toFixed(2)} ${c.y.toFixed(2)} ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

/** Sample a quadratic Bezier at t ∈ [0, 1]. */
export function sampleQuadratic(a: Point, c: Point, b: Point, t: number): Point {
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
    y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
  };
}

/**
 * Camera for the current flight segment. Follows the pin; zooms out mid-flight
 * only when the hop is long enough to need context.
 */
export function cameraAlongFlight(
  fromGeo: LatLng,
  toGeo: LatLng,
  pin: Point,
  t: number,
): MapCamera {
  const km = haversineKm(fromGeo, toGeo);
  // < ~120km: stay regional. Coast-to-coast: full pullback.
  const pullback = smoothstep(120, 2800, km);
  const midSpan = lerp(CLOSE_SPAN, FAR_SPAN, pullback);
  // Ease: linger close at ends, open in the middle.
  const open = Math.sin(Math.PI * Math.min(1, Math.max(0, t)));
  const span = lerp(CLOSE_SPAN, midSpan, open * pullback);

  const aspect = MAP_SIZE.height / MAP_SIZE.width;
  // Bias frame upward so the pin sits above the bottom card.
  const cy = pin.y + span * aspect * 0.12;

  return { cx: pin.x, cy, span };
}

export function viewBoxFromCamera(camera: MapCamera): string {
  const aspect = MAP_SIZE.height / MAP_SIZE.width;
  const w = camera.span;
  const h = camera.span * aspect;
  const x = camera.cx - w / 2;
  const y = camera.cy - h / 2;
  return `${x} ${y} ${w} ${h}`;
}

/** Scale so the pin stays ~2.4% of the frame — a marker, not a billboard. */
export function screenConstantScale(span: number): number {
  return (span * 0.024) / PIN_DESIGN_HEIGHT;
}

/**
 * Simplified land silhouette (editorial, not survey-grade). Relative pin
 * geography stays accurate via {@link project}; the camera does the close-ups.
 */
export const LAND_RINGS: LatLng[][] = [
  [
    { lat: 48.5, lng: -124.7 },
    { lat: 46.2, lng: -124.0 },
    { lat: 42.0, lng: -124.2 },
    { lat: 40.0, lng: -124.0 },
    { lat: 37.8, lng: -122.5 },
    { lat: 36.6, lng: -121.9 },
    { lat: 34.5, lng: -120.5 },
    { lat: 34.0, lng: -118.5 },
    { lat: 32.7, lng: -117.2 },
    { lat: 32.5, lng: -114.8 },
    { lat: 31.3, lng: -109.0 },
    { lat: 29.5, lng: -104.0 },
    { lat: 26.0, lng: -97.3 },
    { lat: 27.8, lng: -97.0 },
    { lat: 29.7, lng: -93.8 },
    { lat: 29.2, lng: -89.5 },
    { lat: 30.2, lng: -88.0 },
    { lat: 30.4, lng: -86.5 },
    { lat: 29.8, lng: -85.0 },
    { lat: 27.5, lng: -82.7 },
    { lat: 25.2, lng: -80.8 },
    { lat: 26.5, lng: -80.0 },
    { lat: 30.5, lng: -81.4 },
    { lat: 32.0, lng: -80.8 },
    { lat: 35.2, lng: -75.6 },
    { lat: 37.0, lng: -76.0 },
    { lat: 38.9, lng: -75.0 },
    { lat: 40.5, lng: -74.0 },
    { lat: 41.3, lng: -72.0 },
    { lat: 42.0, lng: -70.0 },
    { lat: 43.0, lng: -70.6 },
    { lat: 44.8, lng: -67.0 },
    { lat: 47.3, lng: -68.0 },
    { lat: 47.4, lng: -69.2 },
    { lat: 45.3, lng: -71.0 },
    { lat: 45.0, lng: -74.5 },
    { lat: 43.6, lng: -76.5 },
    { lat: 43.4, lng: -79.0 },
    { lat: 42.9, lng: -79.0 },
    { lat: 42.3, lng: -81.0 },
    { lat: 41.7, lng: -83.5 },
    { lat: 42.3, lng: -86.3 },
    { lat: 43.6, lng: -86.5 },
    { lat: 45.4, lng: -86.5 },
    { lat: 46.5, lng: -84.5 },
    { lat: 46.8, lng: -90.0 },
    { lat: 47.8, lng: -90.5 },
    { lat: 48.0, lng: -89.5 },
    { lat: 49.0, lng: -95.0 },
    { lat: 49.0, lng: -123.0 },
    { lat: 48.5, lng: -124.7 },
  ],
];
