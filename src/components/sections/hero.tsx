"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useParallax } from "@/hooks/use-parallax";
import { homeContent } from "@/content/home";

const { hero } = homeContent;

/**
 * Home hero. Communicates who Jennifer is at a glance with an editorial
 * type hierarchy and a single primary CTA. Reveals on load with a restrained
 * staggered rise (reduced-motion is honored globally). A soft radial glow
 * behind the headline adds depth without leaning on gradients elsewhere.
 */
export function Hero() {
  // Drift the decorative glow slightly against the scroll for quiet depth.
  const { ref, y } = useParallax<HTMLElement>(40);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Subtle brand glow — decorative, low-opacity, never a full bleed. */}
      <motion.div
        aria-hidden
        style={y ? { y } : undefined}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_srgb,var(--color-brand)_10%,transparent),transparent)]"
      />
      <Container
        as="div"
        className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-24"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-muted"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {hero.name}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl"
          >
            {hero.tagline}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <Button href={hero.cta.href} size="lg" className="group">
              {hero.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
