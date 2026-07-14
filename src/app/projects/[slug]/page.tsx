import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/sections/project-detail";
import { getAllProjects, getProjectBySlug } from "@/content/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-render every project at build time (SSG). Adding a project to
 * `content/projects.ts` automatically generates its static page.
 */
export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

/** Per-project metadata for unique titles, descriptions, and OG cards. */
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.tagline,
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.tagline,
    },
  };
}

/**
 * Dynamic project case-study route (`/projects/[slug]`). Looks the project up
 * by slug from typed content and renders the full case study; unknown slugs
 * fall through to the 404 page.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
