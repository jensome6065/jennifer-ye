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
  /** Spotify track id for `favoriteSong` (deep link to the full song). */
  spotifyTrackId: string;
  /**
   * ~30s AAC preview for in-page playback (iTunes). Browsers allow this from a
   * user gesture without Spotify embed chrome or login.
   */
  previewUrl: string;
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

/** Deep link to a track on Spotify. */
export function spotifyTrackUrl(trackId: string): string {
  return `https://open.spotify.com/track/${trackId}`;
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
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8a/c0/45/8ac0451b-7167-1720-3f11-7920afa94a83/mzaf_18172643508956337729.plus.aac.p.m4a",
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
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/78/5c/e5/785ce560-e408-5eb0-ccf3-e1e7424ff738/mzaf_13043875919120370213.plus.aac.p.m4a",
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
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/be/e1/5c/bee15c13-45e4-a4de-a48d-407cc06a0cb6/mzaf_12967475487789835787.plus.aac.p.m4a",
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
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a7/24/e8/a724e804-d5df-f7a7-24cc-09df9df57a79/mzaf_4087189896444308455.plus.aac.p.m4a",
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
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/2d/e3/9d/2de39d01-7937-db23-f66e-71fe23e58470/mzaf_1127878189669382614.plus.aac.p.m4a",
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
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/1d/d7/a6/1dd7a60d-bd93-4be4-4fc2-32a37d48c372/mzaf_11748079115747040226.plus.aac.p.m4a",
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
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/05/19/13/05191331-9b67-6c9f-c8ab-65425ee9ff20/mzaf_12666906693856504962.plus.aac.p.m4a",
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
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e1/79/d7/e179d7b1-f51b-38c9-6484-186736b74259/mzaf_17429421237886882616.plus.aac.p.m4a",
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
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d8/38/a0/d838a072-db15-df92-cf6d-c08287be6337/mzaf_16654264586004554581.plus.aac.p.m4a",
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
