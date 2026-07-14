import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Experience",
  description: "A timeline of roles, teams, and the work along the way.",
};

export default function ExperiencePage() {
  return (
    <PagePlaceholder
      milestone="Coming in Milestone 5"
      title="Experience"
      description="A vertical timeline of roles and impact, with smooth reveal animations."
    />
  );
}
