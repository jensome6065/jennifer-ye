/**
 * Music content (Milestone 6, Lifestyle).
 *
 * Structured, typed album entries so the Music section renders from data —
 * adding or editing an album means touching only this file. Types are
 * co-located here (mirroring the other content files): this shape is unique to
 * the Music section and shared with nothing else, so it does not belong in the
 * global `types/`.
 *
 * FUTURE: this shape intentionally mirrors what the Spotify API returns
 * (album, artist, artwork, external URL) so a "currently playing" / "recently
 * played" feed can slot in later without reshaping components.
 */

/** Optional real album artwork. */
export interface AlbumArtwork {
  src: string;
  alt: string;
}

/** A single album / record on the Music board. */
export interface Album {
  /** Stable unique id (React key). */
  id: string;
  /** Album (or single/EP) title. */
  title: string;
  /** Primary artist. */
  artist: string;
  /** Release year label, e.g. "2023". */
  year: string;
  /** The standout track — the one on repeat. */
  favoriteSong: string;
  /**
   * Two-tone gradient endpoints (CSS colors) for the generated cover, used
   * until real artwork is added. Kept muted so plum can support without
   * dominating (Music-section identity).
   */
  cover: { from: string; to: string };
  /** Optional real artwork. Renders instead of the generated cover. */
  artwork?: AlbumArtwork;
  /** Optional Spotify (or other) link. */
  spotifyUrl?: string;
}

/**
 * NOTE: Copy below is a first-draft scaffold — revise freely. The structure is
 * stable; only the strings change. Cover gradients are muted and slightly
 * plum-leaning to complement the Music section's subtle identity.
 */
export const albums: Album[] = [
  {
    id: "blonde",
    title: "Blonde",
    artist: "Frank Ocean",
    year: "2016",
    favoriteSong: "Self Control",
    cover: { from: "#3a3550", to: "#15131f" },
    spotifyUrl: "https://open.spotify.com/",
  },
  {
    id: "in-rainbows",
    title: "In Rainbows",
    artist: "Radiohead",
    year: "2007",
    favoriteSong: "Weird Fishes / Arpeggi",
    cover: { from: "#463a54", to: "#181320" },
    spotifyUrl: "https://open.spotify.com/",
  },
  {
    id: "the-record",
    title: "the record",
    artist: "boygenius",
    year: "2023",
    favoriteSong: "Not Strong Enough",
    cover: { from: "#3d3a55", to: "#141422" },
    spotifyUrl: "https://open.spotify.com/",
  },
  {
    id: "punisher",
    title: "Punisher",
    artist: "Phoebe Bridgers",
    year: "2020",
    favoriteSong: "Kyoto",
    cover: { from: "#33405a", to: "#12151f" },
    spotifyUrl: "https://open.spotify.com/",
  },
  {
    id: "an-evening",
    title: "An Evening with Silk Sonic",
    artist: "Silk Sonic",
    year: "2021",
    favoriteSong: "Leave the Door Open",
    cover: { from: "#5a3a4a", to: "#1e131a" },
    spotifyUrl: "https://open.spotify.com/",
  },
  {
    id: "a-moon-shaped-pool",
    title: "A Moon Shaped Pool",
    artist: "Radiohead",
    year: "2016",
    favoriteSong: "Present Tense",
    cover: { from: "#39485a", to: "#13181f" },
    spotifyUrl: "https://open.spotify.com/",
  },
];

/** All albums, in display order. */
export const getAlbums = (): Album[] => albums;
