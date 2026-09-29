"use client";

import { useEffect, useState } from "react";

/**
 * Custom pigeon cursor for fine-pointer devices.
 * Uses an inline SVG follower (more reliable than CSS `cursor: url(svg)`).
 * Reduced-motion only softens the peck — it does not disable the cursor.
 */
export function PigeonCursor() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [pecking, setPecking] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(fine.matches);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const onDown = () => setPecking(true);
    const onUp = () => setPecking(false);

    // Seed so we never hide the system cursor with nothing to replace it.
    const seed = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      window.removeEventListener("pointermove", seed);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointermove", seed, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointermove", seed);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.classList.remove("pigeon-cursor");
    };
  }, [enabled]);

  // Only hide the OS cursor once the pigeon is actually on-screen.
  useEffect(() => {
    if (!enabled || !pos) return;
    document.documentElement.classList.add("pigeon-cursor");
    return () => document.documentElement.classList.remove("pigeon-cursor");
  }, [enabled, pos]);

  if (!enabled || !pos) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[10000] will-change-transform"
      style={{
        left: pos.x,
        top: pos.y,
        transform: pecking
          ? "translate(-6px, -10px) scale(0.92)"
          : "translate(-6px, -10px)",
        transition: pecking ? "transform 75ms ease-out" : undefined,
      }}
    >
      <PigeonMark pecking={pecking} />
    </div>
  );
}

/** Chunky readable street pigeon — drawn inline so nothing can 404. */
function PigeonMark({ pecking }: { pecking: boolean }) {
  return (
    <svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
    >
      {/* Body */}
      <ellipse cx="22" cy="24" rx="11" ry="8" fill="#6b7280" />
      <ellipse cx="22" cy="24" rx="11" ry="8" fill="#4b5563" fillOpacity="0.35" />
      {/* Wing */}
      <path
        d="M14 22c2-5 7-8 13-7 1.5.3 2.5 2 2 3.5-1.5 4-6 6.5-11 6.5-2 0-3.5-1-4-3Z"
        fill="#374151"
      />
      {/* Head */}
      <circle cx="14" cy="17" r="5.2" fill="#6b7280" />
      <circle cx="12.6" cy="16.2" r="1.15" fill="#111827" />
      <circle cx="12.9" cy="15.9" r="0.35" fill="#f9fafb" />
      {/* Beak — tips toward hotspot */}
      <path
        d={
          pecking
            ? "M9.2 18.2 L3.5 21.2 L9.5 19.6 Z"
            : "M9.2 16.8 L2.8 15.2 L9.5 18.2 Z"
        }
        fill="#F5C518"
      />
      {/* Tail */}
      <path d="M31 22 L40 18 L39 24 L37 28 L31 26 Z" fill="#4b5563" />
      {/* Legs */}
      <path
        d="M19 31.5 V38 M25 31.5 V37.5"
        stroke="#1f2937"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M17.5 38 H21 M23.5 37.5 H27"
        stroke="#1f2937"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
