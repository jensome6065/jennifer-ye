"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BridgeArcs } from "@/components/ui/bridge-arcs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroPhotos } from "@/components/ui/hero-photos";
import { PlaceCrumbs } from "@/components/ui/place-crumbs";
import { StationLabel } from "@/components/ui/station-label";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useParallax } from "@/hooks/use-parallax";
import { homeContent } from "@/content/home";

const { hero } = homeContent;

/**
 * Home hero — condensed name, place crumbs, bridge cable arcs, photo proof.
 */
export function Hero() {
  const { ref, y } = useParallax<HTMLElement>(40);

  return (
    <section ref={ref} className="relative overflow-hidden wash-panel">
      <BridgeArcs />
      <motion.div
        aria-hidden
        style={y ? { y } : undefined}
        className="pointer-events-none absolute inset-x-0 top-0 -z-[2] h-[42rem] bg-[radial-gradient(55%_45%_at_70%_0%,color-mix(in_srgb,var(--color-brand)_14%,transparent),transparent)]"
      />
      <Container
        as="div"
        className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-20 sm:py-24"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <StationLabel name={hero.eyebrow} className="mb-5" />
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="max-w-4xl text-balance font-display text-6xl font-bold uppercase leading-[0.92] tracking-[-0.02em] text-foreground sm:text-7xl lg:text-8xl"
            >
              {hero.name}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-lg text-pretty text-lg text-muted-foreground sm:text-xl"
            >
              {hero.tagline}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-5">
              <PlaceCrumbs />
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10">
              <Button href={hero.cta.href} size="lg" className="group">
                {hero.cta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <HeroPhotos photos={hero.photos} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
