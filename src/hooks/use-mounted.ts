"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns true only after the component has mounted on the client.
 * Used to avoid hydration mismatches for theme-dependent UI (e.g. the
 * theme toggle, whose correct icon isn't known during SSR).
 */
export function useMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
