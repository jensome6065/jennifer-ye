import Image from "next/image";
import type { Project } from "@/content/projects";
import { FilmGrain } from "@/components/ui/film-grain";
import { cn } from "@/lib/utils";

interface ProjectCoverProps {
  project: Project;
  /** `sizes` hint forwarded to next/image when a real cover image exists. */
  sizes?: string;
  /** Prioritize loading (above-the-fold covers only). */
  priority?: boolean;
  className?: string;
}

/**
 * Cover artwork for a project. Real `coverImage` when present; otherwise a
 * navy gradient with city-block grid + street grain so the grid stays
 * polished before screenshots land.
 */
export function ProjectCover({
  project,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className,
}: ProjectCoverProps) {
  const { coverImage, cover, name } = project;

  if (coverImage) {
    return (
      <>
        <Image
          src={coverImage.src}
          alt={coverImage.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]",
            className,
          )}
        />
        <FilmGrain strength="street" />
      </>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(140deg, ${cover.from}, ${cover.to})`,
      }}
    >
      {/* City-block grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(255,255,255,0.14),transparent)]" />
      <FilmGrain strength="street" />
      <span className="absolute -bottom-6 -left-2 select-none font-display text-[10rem] font-bold leading-none text-white/10 sm:text-[13rem]">
        {name.charAt(0)}
      </span>
    </div>
  );
}
