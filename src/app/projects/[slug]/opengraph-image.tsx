import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import { getAllProjects, getProjectBySlug } from "@/content/projects";

/**
 * Per-project Open Graph / Twitter card. One image is pre-rendered per slug
 * at build time (via `generateStaticParams`), so every case study unfurls
 * with its own branded card showing the project name and tagline.
 */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

interface OgProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectOpengraphImage({ params }: OgProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return renderOgImage({
    eyebrow: project?.category ?? "Project",
    title: project?.name ?? "Project",
    subtitle: project?.tagline,
  });
}
