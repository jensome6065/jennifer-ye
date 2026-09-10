import type { Project } from "@/content/projects";

/**
 * Pick a random project from `pool`, avoiding an immediate repeat of
 * `excludeSlug` when the pool has more than one item.
 */
export function pickNextProject(
  pool: readonly Project[],
  excludeSlug?: string,
): Project {
  if (pool.length === 0) {
    throw new Error("pickNextProject requires a non-empty pool");
  }
  const only = pool[0];
  if (pool.length === 1 && only) return only;

  const candidates = excludeSlug
    ? pool.filter((p) => p.slug !== excludeSlug)
    : [...pool];
  const list = candidates.length > 0 ? candidates : [...pool];
  const index = Math.floor(Math.random() * list.length);
  const picked = list[index];
  if (!picked) throw new Error("pickNextProject failed to pick a project");
  return picked;
}
