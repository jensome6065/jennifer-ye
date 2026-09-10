"use client";

import { useEffect, useRef, useState } from "react";
import {
  spotifyTrackEmbedUrl,
  spotifyTrackUri,
} from "@/content/music";
import { cn } from "@/lib/utils";

interface SpotifyTrackPlayerProps {
  /** Spotify track id for the can't-skip song. */
  trackId: string;
  /** Accessible label for the embed. */
  title: string;
  /**
   * When true (after the visitor picks a sleeve), load with autoplay so the
   * new platter track starts without a second click when the browser allows it.
   */
  autoplay?: boolean;
  /** Fires when Spotify reports play / pause (IFrame API). */
  onPlaybackChange?: (playing: boolean) => void;
  className?: string;
}

type SpotifyEmbedController = {
  loadUri: (uri: string, startOnLoad?: boolean) => void;
  play: () => void;
  pause: () => void;
  destroy?: () => void;
  addListener: (
    event: "playback_update" | "ready",
    cb: (e: {
      data: { isPaused?: boolean; position?: number; duration?: number };
    }) => void,
  ) => void;
};

type SpotifyIFrameAPI = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
    SpotifyIFrameAPI?: SpotifyIFrameAPI;
  }
}

const IFRAME_API_SRC = "https://open.spotify.com/embed/iframe-api/v1";

let apiPromise: Promise<SpotifyIFrameAPI> | null = null;

function loadSpotifyIframeApi(): Promise<SpotifyIFrameAPI> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("No window"));
  }
  if (window.SpotifyIFrameAPI) {
    return Promise.resolve(window.SpotifyIFrameAPI);
  }
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve, reject) => {
    const prev = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (api) => {
      window.SpotifyIFrameAPI = api;
      prev?.(api);
      resolve(api);
    };

    if (document.querySelector(`script[src="${IFRAME_API_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = IFRAME_API_SRC;
    script.async = true;
    script.onerror = () => {
      apiPromise = null;
      reject(new Error("Failed to load Spotify IFrame API"));
    };
    document.body.appendChild(script);
  });

  return apiPromise;
}

/**
 * In-page Spotify player for the platter's can't-skip track. Prefers the
 * official IFrame API (load + play on sleeve change, playback sync). Falls
 * back to a plain embed iframe if the API is unavailable.
 */
export function SpotifyTrackPlayer({
  trackId,
  title,
  autoplay = false,
  onPlaybackChange,
  className,
}: SpotifyTrackPlayerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyEmbedController | null>(null);
  const trackIdRef = useRef(trackId);
  const autoplayRef = useRef(autoplay);
  const onPlaybackChangeRef = useRef(onPlaybackChange);
  const [apiFailed, setApiFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    onPlaybackChangeRef.current = onPlaybackChange;
  }, [onPlaybackChange]);

  useEffect(() => {
    trackIdRef.current = trackId;
    autoplayRef.current = autoplay;
  }, [trackId, autoplay]);

  // Boot controller once.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;

    loadSpotifyIframeApi()
      .then((api) => {
        if (cancelled || !hostRef.current) return;

        api.createController(
          hostRef.current,
          {
            uri: spotifyTrackUri(trackIdRef.current),
            width: "100%",
            height: 80,
          },
          (controller) => {
            if (cancelled) {
              controller.destroy?.();
              return;
            }
            controllerRef.current = controller;
            controller.addListener("playback_update", (e) => {
              const playing = e.data.isPaused === false;
              onPlaybackChangeRef.current?.(playing);
            });
            setReady(true);
          },
        );
      })
      .catch(() => {
        if (!cancelled) setApiFailed(true);
      });

    return () => {
      cancelled = true;
      controllerRef.current?.destroy?.();
      controllerRef.current = null;
      onPlaybackChangeRef.current?.(false);
    };
  }, []);

  // Swap track when the platter changes (after controller is ready).
  useEffect(() => {
    if (!ready) return;
    const controller = controllerRef.current;
    if (!controller) return;

    controller.loadUri(spotifyTrackUri(trackId), autoplay);
    if (autoplay) {
      window.setTimeout(() => controller.play(), 150);
    } else {
      onPlaybackChangeRef.current?.(false);
    }
  }, [trackId, autoplay, ready]);

  if (apiFailed) {
    return (
      <div className={cn("overflow-hidden rounded-xl", className)}>
        <iframe
          key={`${trackId}-${autoplay ? "play" : "idle"}`}
          title={`Play ${title} on Spotify`}
          src={spotifyTrackEmbedUrl(trackId, { autoplay })}
          width="100%"
          height={80}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="border-0"
        />
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-xl", className)}>
      <div
        ref={hostRef}
        className="min-h-[80px] w-full"
        aria-label={`Spotify player for ${title}`}
      />
    </div>
  );
}
