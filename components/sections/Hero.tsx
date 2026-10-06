"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { company } from "@/content/company";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { useReducedMotionState } from "@/components/motion/MotionProvider";

/**
 * Homepage hero (spec §24 Section 1).
 *
 * Full-viewport cinematic surface with restrained scroll choreography:
 * background scales 1.02→1.06 very slowly, copy drifts up ~40px and fades.
 * All movement disabled under reduced motion.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useReducedMotionState();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.02, 1.06]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -44]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], reduced ? [1, 1] : [1, 0.15]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92svh] items-end overflow-hidden bg-carbon"
    >
      {/* Cinematic background surface (placeholder for licensed hero footage/photo) */}
      <motion.div
        aria-hidden
        style={{ scale: bgScale }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 100% at 70% 15%, #26313d 0%, #131a22 42%, #080a0d 78%)",
          }}
        />
        {/* Fine technical grid */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(80% 80% at 60% 40%, black 30%, transparent 90%)",
          }}
        />
        {/* Glacier atmospheric glow */}
        <div
          className="absolute right-[-10%] top-[10%] h-[60vh] w-[60vh] rounded-full opacity-40 blur-[120px]"
          style={{ background: "radial-gradient(circle, #397a99 0%, transparent 70%)" }}
        />
        {/* Lower gradient for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-carbon via-carbon/70 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1520px] px-[18px] pb-20 pt-40 sm:px-8 lg:px-14 lg:pb-28 xl:px-20"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-glacier">
          Northbridge Global Resources
        </p>

        <h1 className="mt-6 max-w-[16ch] font-display text-[42px] font-medium leading-[0.98] tracking-[-0.045em] text-text-light sm:text-[64px] lg:text-[88px] xl:text-[104px]">
          Connecting Aviation. Delivering Solutions.
        </h1>

        <p className="mt-8 max-w-[620px] text-[17px] leading-relaxed text-text-muted-dark sm:text-[19px]">
          {company.supportingStatement}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <PrimaryButton href="/request-rfq">Request a Quote</PrimaryButton>
          <SecondaryButton href="/services">Explore Capabilities</SecondaryButton>
        </div>

        <p className="mt-12 text-[11px] font-medium uppercase tracking-[0.16em] text-slate">
          Aircraft Parts | Global Sourcing | Procurement | Supply Chain Solutions
        </p>
      </motion.div>
    </section>
  );
}
