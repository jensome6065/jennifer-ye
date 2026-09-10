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
   * Spotify track id for `favoriteSong` — powers the in-page embed player on
   * the turntable (`spotify:track:<id>` / embed URL).
   */
  spotifyTrackId: string;
  /**
   * Two-tone gradient endpoints (CSS colors) for the generated cover, used
   * until real artwork is added. Kept muted so plum can support without
   * dominating (Music-section identity).
   */
  cover: { from: string; to: string };
  /** Optional real artwork. Renders instead of the generated cover. */
  artwork?: AlbumArtwork;
  /** Optional Spotify album link. */
  spotifyUrl?: string;
}

/** Build a Spotify embed URL for a track (compact player). */
export function spotifyTrackEmbedUrl(
  trackId: string,
  options?: { autoplay?: boolean },
): string {
  const params = new URLSearchParams({ utm_source: "generator", theme: "0" });
  if (options?.autoplay) params.set("autoplay", "1");
  return `https://open.spotify.com/embed/track/${trackId}?${params.toString()}`;
}

/** Spotify URI for the IFrame API. */
export function spotifyTrackUri(trackId: string): string {
  return `spotify:track:${trackId}`;
}

/**
 * Favorite albums — display order is intentional. Artwork files live in
 * `/public/images/music/`; cover gradients remain as fallbacks.
 */
export const albums: Album[] = [
  {
    id: "the-secret-of-us",
    title: "The Secret of Us",
    artist: "Gracie Abrams",
    year: "2024",
    favoriteSong: "Free Now",
    spotifyTrackId: "6nN8W5zHOii0P61I8eSdR3",
    cover: { from: "#3a3550", to: "#15131f" },
    artwork: {
      src: "/images/music/the-secret-of-us.jpg",
      alt: "Album cover for The Secret of Us by Gracie Abrams",
    },
    spotifyUrl: "https://open.spotify.com/album/4XXTsu7r9865VvXdvF2iQP",
  },
  {
    id: "beauty-behind-the-madness",
    title: "Beauty Behind The Madness",
    artist: "The Weeknd",
    year: "2015",
    favoriteSong: "Angel",
    spotifyTrackId: "5buWSg8MDfzReA0794pchb",
    cover: { from: "#463a54", to: "#181320" },
    artwork: {
      src: "/images/music/beauty-behind-the-madness.jpg",
      alt: "Album cover for Beauty Behind The Madness by The Weeknd",
    },
    spotifyUrl: "https://open.spotify.com/album/28ZKQMoNBB0etKXZ97G2SN",
  },
  {
    id: "sos",
    title: "SOS",
    artist: "SZA",
    year: "2022",
    favoriteSong: "Open Arms (feat. Travis Scott)",
    spotifyTrackId: "0xaFw2zDYf1rIJWl2dXiSF",
    cover: { from: "#3d3a55", to: "#141422" },
    artwork: {
      src: "/images/music/sos.jpg",
      alt: "Album cover for SOS by SZA",
    },
    spotifyUrl: "https://open.spotify.com/album/07w0rG5TETcyihsEIZR3qG",
  },
  {
    id: "reputation",
    title: "reputation",
    artist: "Taylor Swift",
    year: "2017",
    favoriteSong: "Delicate",
    spotifyTrackId: "6NFyWDv5CjfwuzoCkw47Xf",
    cover: { from: "#33405a", to: "#12151f" },
    artwork: {
      src: "/images/music/reputation.jpg",
      alt: "Album cover for reputation by Taylor Swift",
    },
    spotifyUrl: "https://open.spotify.com/album/6DEjYFkNZh67HP7R9PSZvv",
  },
  {
    id: "honestly-nevermind",
    title: "Honestly, Nevermind",
    artist: "Drake",
    year: "2022",
    favoriteSong: "A Keeper",
    spotifyTrackId: "0nAZGkBGKQCXyaoSJfRhC1",
    cover: { from: "#5a3a4a", to: "#1e131a" },
    artwork: {
      src: "/images/music/honestly-nevermind.jpg",
      alt: "Album cover for Honestly, Nevermind by Drake",
    },
    spotifyUrl: "https://open.spotify.com/album/3cf4iSSKd8ffTncbtKljXw",
  },
  {
    id: "dangerous-woman",
    title: "Dangerous Woman",
    artist: "Ariana Grande",
    year: "2016",
    favoriteSong: "Into You",
    spotifyTrackId: "63y6xWR4gXz7bnUGOk8iI6",
    cover: { from: "#39485a", to: "#13181f" },
    artwork: {
      src: "/images/music/dangerous-woman.jpg",
      alt: "Album cover for Dangerous Woman by Ariana Grande",
    },
    spotifyUrl: "https://open.spotify.com/album/4lVR2fg3DAUQpGVJ6DciHW",
  },
  {
    id: "hard-to-imagine",
    title: "Hard To Imagine The Neighbourhood Ever Changing",
    artist: "The Neighbourhood",
    year: "2018",
    favoriteSong: "Void",
    spotifyTrackId: "747Ki1XZhdywdnrbip0Yak",
    cover: { from: "#2f3548", to: "#12151c" },
    artwork: {
      src: "/images/music/hard-to-imagine.jpg",
      alt: "Album cover for Hard To Imagine The Neighbourhood Ever Changing by The Neighbourhood",
    },
    spotifyUrl: "https://open.spotify.com/album/0ODLCdHBFVvKwJGeSfd1jy",
  },
  {
    id: "what-could-possibly-go-wrong",
    title: "What Could Possibly Go Wrong",
    artist: "Dominic Fike",
    year: "2020",
    favoriteSong: "Wurli",
    spotifyTrackId: "5MSshyHGM9ajWSEoBcR0jv",
    cover: { from: "#3a4558", to: "#141820" },
    artwork: {
      src: "/images/music/what-could-possibly-go-wrong.jpg",
      alt: "Album cover for What Could Possibly Go Wrong by Dominic Fike",
    },
    spotifyUrl: "https://open.spotify.com/album/1BubKJqf6Uc4fNae5kLJJ7",
  },
  {
    id: "octane",
    title: "OCTANE",
    artist: "Don Toliver",
    year: "2026",
    favoriteSong: "Secondhand (feat. Rema)",
    spotifyTrackId: "0ZLi9vyYoUnQHgJiLcjwyw",
    cover: { from: "#4a3548", to: "#1a1218" },
    artwork: {
      src: "/images/music/octane.jpg",
      alt: "Album cover for OCTANE by Don Toliver",
    },
    spotifyUrl: "https://open.spotify.com/album/131x9G87mD0hP0hGZc9qYN",
  },
];

/** All albums, in display order. */
export const getAlbums = (): Album[] => albums;
