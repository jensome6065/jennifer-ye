import Image from "next/image";
import type { Project } from "@/content/projects";
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
 * Cover artwork for a project. Renders the project's real `coverImage` with
 * next/image when present; otherwise draws a refined generated cover — a
 * two-tone brand gradient with a soft grid and the project's initial — so the
 * grid stays polished before real screenshots are added. The parent supplies
 * the aspect-ratio frame; this fills it.
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
      {/* Faint grid — adds engineered texture without competing with content. */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Soft top-light for depth. */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(255,255,255,0.16),transparent)]" />
      {/* Oversized initial — quiet editorial monogram. */}
      <span className="absolute -bottom-6 -left-2 select-none font-display text-[10rem] font-semibold leading-none text-white/10 sm:text-[13rem]">
        {name.charAt(0)}
      </span>
    </div>
  );
}
