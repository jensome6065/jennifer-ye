import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { FeaturedSlot } from "@/components/sections/featured-slot";
import { Current } from "@/components/sections/current";
import { Connect } from "@/components/sections/connect";

/**
 * Home page. Order: hero → about → featured slot → current → connect.
 * Slot strip is the recruiter-facing featured draw; the claw lives on Projects.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedSlot />
      <Current />
      <Connect />
    </>
  );
}
