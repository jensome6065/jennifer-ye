import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work — AI products, developer tools, and communities.",
};

export default function ProjectsPage() {
  return (
    <PagePlaceholder
      milestone="Coming in Milestone 4"
      title="Projects"
      description="A curated set of projects, presented as large visual cards with dedicated case-study pages."
    />
  );
}
