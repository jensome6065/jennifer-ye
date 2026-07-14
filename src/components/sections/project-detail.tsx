import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/content/projects";
import { AnimatedItem, AnimatedSection } from "@/components/ui/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProjectCover } from "@/components/ui/project-cover";

/** Status → badge variant, matching the card. Live earns the gold accent. */
const STATUS_VARIANT: Record<Project["status"], "accent" | "brand" | "neutral"> =
  {
    Live: "accent",
    "In progress": "brand",
    Prototype: "neutral",
    Archived: "neutral",
  };

/** Ordered case-study sections; only those present on the project render. */
const BODY_SECTIONS: { key: keyof Project; title: string }[] = [
  { key: "problem", title: "The problem" },
  { key: "solution", title: "The solution" },
  { key: "architecture", title: "Architecture" },
  { key: "lessons", title: "What I learned" },
];

/** A titled prose block — a heading and its paragraphs. */
function ProseSection({ title, body }: { title: string; body: string[] }) {
  return (
    <section className="border-t border-border pt-10">
      <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-muted">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-pretty text-lg leading-relaxed text-muted-foreground">
        {body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

/** Renders the correct external-link icon for a project link. */
function LinkIcon({ href }: { href: string }) {
  const isGithub = href.includes("github.com");
  const Icon = isGithub ? Github : ArrowUpRight;
  return <Icon className="h-4 w-4" aria-hidden />;
}

interface ProjectDetailProps {
  project: Project;
}

/**
 * Full case-study layout for a single project: a back link, an editorial
 * hero (meta, name, tagline, tech, links), a large cover, then the prose
 * body (overview + any present problem/solution/architecture/lessons) and an
 * optional screenshot gallery. Reveals on scroll with the shared vocabulary.
 */
export function ProjectDetail({ project }: ProjectDetailProps) {
  const bodySections = BODY_SECTIONS.filter(
    (s) => Array.isArray(project[s.key]) && (project[s.key] as string[]).length,
  );

  return (
    <article className="py-16 sm:py-24">
      <Container>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden
          />
          All projects
        </Link>

        {/* Hero */}
        <AnimatedSection className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={STATUS_VARIANT[project.status]}>
              {project.status}
            </Badge>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
              {project.category} · {project.year}
            </p>
          </div>
          <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            {project.tagline}
          </p>

          {project.links && project.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link, i) => (
                <Button
                  key={link.href}
                  href={link.href}
                  variant={i === 0 ? "primary" : "secondary"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  {link.label}
                  <LinkIcon href={link.href} />
                </Button>
              ))}
            </div>
          )}
        </AnimatedSection>
      </Container>

      {/* Cover */}
      <Container className="mt-12 sm:mt-16">
        <AnimatedSection className="group relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-background-elevated">
          <ProjectCover
            project={project}
            priority
            sizes="(min-width: 1152px) 1088px, 100vw"
          />
        </AnimatedSection>
      </Container>

      {/* Body */}
      <Container className="mt-16 sm:mt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
          <div className="max-w-2xl space-y-10">
            {/* Overview — leads, no top border. */}
            <section>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                Overview
              </h2>
              <div className="mt-5 space-y-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {project.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {bodySections.map((s) => (
              <ProseSection
                key={s.key as string}
                title={s.title}
                body={project[s.key] as string[]}
              />
            ))}
          </div>

          {/* Tech stack — sticky aside on desktop. */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-background-elevated p-6">
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                Built with
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li key={tech}>
                    <Badge variant="neutral">{tech}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>

      {/* Screenshots */}
      {project.screenshots && project.screenshots.length > 0 && (
        <Container className="mt-20 sm:mt-24">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Screenshots
          </h2>
          <AnimatedSection
            stagger
            as="ul"
            className="mt-6 grid gap-6 sm:grid-cols-2"
          >
            {project.screenshots.map((shot) => (
              <AnimatedItem as="li" key={shot.src}>
                <figure>
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-background-elevated">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  {shot.caption && (
                    <figcaption className="mt-3 text-sm text-muted">
                      {shot.caption}
                    </figcaption>
                  )}
                </figure>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </Container>
      )}
    </article>
  );
}
