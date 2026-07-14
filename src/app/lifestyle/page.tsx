import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Lifestyle",
  description: "Beyond code — favorite eats and the music on repeat.",
};

export default function LifestylePage() {
  return (
    <PagePlaceholder
      milestone="Coming in Milestone 6"
      title="Lifestyle"
      description="Two editorial sections — Eats and Music — with large photography and album art."
    />
  );
}
