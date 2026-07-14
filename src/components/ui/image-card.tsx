import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AspectRatio = "square" | "video" | "portrait" | "wide";

const ASPECT: Record<AspectRatio, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/10]",
};

interface ImageCardProps {
  src: string;
  alt: string;
  /** Fixed aspect ratio for the image frame. Defaults to "video". */
  ratio?: AspectRatio;
  /** Wrap the card in a link. External URLs open in a new tab. */
  href?: string;
  /** Content overlaid at the bottom of the image (e.g. title, meta). */
  overlay?: ReactNode;
  /** Content rendered below the image frame (e.g. caption, badges). */
  children?: ReactNode;
  /** `sizes` hint for responsive image loading. */
  sizes?: string;
  /** Prioritize loading for above-the-fold images. */
  priority?: boolean;
  className?: string;
}

/**
 * Foundational visual card: a rounded, bordered frame around a next/image
 * with a premium restrained hover (image scales gently, border warms to
 * navy, subtle shadow lift). Optional bottom overlay and below-frame content.
 *
 * This is the base the domain cards (ProjectCard, RestaurantCard, AlbumCard)
 * compose in later milestones — SNKRS-style large visuals, one hover language.
 */
export function ImageCard({
  src,
  alt,
  ratio = "video",
  href,
  overlay,
  children,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className,
}: ImageCardProps) {
  const frame = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-background-elevated",
        "transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        href && "hover:border-brand/40 hover:shadow-lg",
        className,
      )}
    >
      <div className={cn("relative w-full overflow-hidden", ASPECT[ratio])}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        {overlay && (
          <>
            {/* Legibility scrim behind bottom overlay content. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              {overlay}
            </div>
          </>
        )}
      </div>
      {children && <div className="p-5">{children}</div>}
    </div>
  );

  if (!href) return frame;

  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {frame}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {frame}
    </Link>
  );
}
