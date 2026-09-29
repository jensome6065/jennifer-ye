/**
 * Quiet NYC signals — subway line colors, station label helpers, place crumbs.
 * Inspired by MTA signage / MetroCard geometry without cloning trademarks.
 */

export type MtaLineId = "A" | "B" | "N" | "1" | "4" | "L" | "G";

export interface MtaLine {
  id: MtaLineId;
  /** Official-ish hex for the bullet. */
  color: string;
  /** Dark text on yellow/lime bullets. */
  onColor: "white" | "ink";
}

/** Curated subset — enough color personality without a rainbow. */
export const MTA_LINES: Record<MtaLineId, MtaLine> = {
  A: { id: "A", color: "#0039A6", onColor: "white" },
  B: { id: "B", color: "#FF6319", onColor: "white" },
  N: { id: "N", color: "#FCCC0A", onColor: "ink" },
  "1": { id: "1", color: "#EE352E", onColor: "white" },
  "4": { id: "4", color: "#00933C", onColor: "white" },
  L: { id: "L", color: "#A7A9AC", onColor: "ink" },
  G: { id: "G", color: "#6CBE45", onColor: "ink" },
};

/** Primary nav → line assignment (stable identity per route). */
export const NAV_LINE: Record<string, MtaLineId> = {
  "/": "A",
  "/projects": "N",
  "/experience": "1",
  "/lifestyle": "G",
};

/** Section eyebrow keys → line (home + page sections). */
export const SECTION_LINE: Record<string, MtaLineId> = {
  home: "A",
  about: "B",
  featured: "N",
  currently: "4",
  connect: "L",
  projects: "N",
  experience: "1",
  lifestyle: "G",
  eats: "B",
  music: "G",
  arcade: "N",
};

export type StationKind = "stop" | "line";

/** Format a station-style label: `STOP · ABOUT`. */
export function formatStationLabel(
  name: string,
  kind: StationKind = "stop",
): string {
  const prefix = kind === "line" ? "LINE" : "STOP";
  return `${prefix} · ${name.trim().toUpperCase()}`;
}

export function lineForHref(href: string): MtaLine {
  const id = NAV_LINE[href] ?? "A";
  return MTA_LINES[id];
}

export function lineForSection(key: string): MtaLine {
  const id = SECTION_LINE[key.toLowerCase()] ?? "A";
  return MTA_LINES[id];
}
