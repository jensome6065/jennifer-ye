import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Current } from "@/components/sections/current";
import { Connect } from "@/components/sections/connect";

/**
 * Home page (Milestone 3). Composed from focused section components that
 * each render from typed content in `content/home.ts`. Order: hero →
 * about → current → connect, closing above the global footer.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Current />
      <Connect />
    </>
  );
}
