"use client";

import { motion } from "framer-motion";
import type { Project } from "@/content/projects";
import { ProjectCover } from "@/components/ui/project-cover";
import { useParallax } from "@/hooks/use-parallax";

const DRIFT = 28;

interface ProjectCoverParallaxProps {
  project: Project;
  sizes?: string;
}

/**
 * The case-study hero cover with a quiet scroll-linked parallax. The image
 * layer is inset by `-DRIFT` on top and bottom so it overflows the frame; as
 * the section scrolls, that extra bleed is what drifts into view, so an edge is
 * never exposed. The parent Container/frame supplies the clipping aspect box.
 *
 * Under reduced motion `useParallax` returns `y: null` and we render the cover
 * statically (the hover scale on ProjectCover still applies, honoring the CSS
 * reduced-motion reset separately).
 */
export function ProjectCoverParallax({
  project,
  sizes,
}: ProjectCoverParallaxProps) {
  const { ref, y } = useParallax<HTMLDivElement>(DRIFT);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {y ? (
        <motion.div
          style={{ y, top: -DRIFT, bottom: -DRIFT }}
          className="absolute inset-x-0"
        >
          <div className="relative h-full w-full">
            <ProjectCover project={project} priority sizes={sizes} />
          </div>
        </motion.div>
      ) : (
        <ProjectCover project={project} priority sizes={sizes} />
      )}
    </div>
  );
}
