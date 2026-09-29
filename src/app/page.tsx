import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { FeaturedSlot } from "@/components/sections/featured-slot";
import { Current } from "@/components/sections/current";
import { Connect } from "@/components/sections/connect";

/**
 * Home page. City-block rhythm: hard rules between sections, station labels
 * inside each. Order: hero → about → featured → current → connect.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="block-rule">
        <About />
      </div>
      <div className="block-rule">
        <FeaturedSlot />
      </div>
      <div className="block-rule">
        <Current />
      </div>
      <div className="block-rule">
        <Connect />
      </div>
    </>
  );
}
