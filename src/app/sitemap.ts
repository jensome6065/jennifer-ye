import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllProjects } from "@/content/projects";

/**
 * Dynamic sitemap (Metadata API). Static top-level routes plus one entry per
 * project case study, so adding a project to `content/projects.ts`
 * automatically extends the sitemap — no manual upkeep.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, priority: 1, changeFrequency: "monthly" },
    { url: `${base}/projects`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/experience`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${base}/lifestyle`, priority: 0.6, changeFrequency: "monthly" },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map(
    (project) => ({
      url: `${base}/projects/${project.slug}`,
      priority: 0.8,
      changeFrequency: "yearly",
    }),
  );

  return [...routes, ...projectRoutes];
}
