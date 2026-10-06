"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { partCategoryLabels } from "@/content/services";
import { useReducedMotionState } from "@/components/motion/MotionProvider";

/**
 * Engines & Parts cinematic feature (spec §24 Section 4, §45 Sequence 2).
 *
 * One major scroll-linked sequence: the component surface enters from the right
 * and rotates a few degrees while category labels reveal, then settles. Uses
 * GSAP + ScrollTrigger (scrubbed, natural). Fully static under reduced motion,
 * and ScrollTrigger instances are killed on unmount (spec §47).
 */
export function EngineFeature() {
  const root = useRef<HTMLDivElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const { reduced } = useReducedMotionState();

  useEffect(() => {
    if (reduced || !root.current) return;

    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          visual.current,
          { xPercent: 8, rotate: -4, opacity: 0.6 },
          {
            xPercent: 0,
            rotate: 3,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 80%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          },
        );

        gsap.fromTo(
          "[data-cat]",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 65%",
            },
          },
        );
      }, root);
    })();

    return () => {
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <div ref={root} className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-glacier">
          Engine &amp; Parts / 03
        </p>
        <h2 className="mt-6 font-display text-[34px] font-medium leading-[1.03] tracking-[-0.035em] sm:text-[44px] lg:text-[56px]">
          Aviation Parts.
          <br />
          Global Sourcing.
          <br />
          Reliable Supply.
        </h2>
        <p className="mt-8 max-w-[560px] text-[17px] leading-relaxed text-text-muted-dark sm:text-[18px]">
          Northbridge supports a wide range of aviation product requirements for operators, MROs, distributors, and other aviation businesses.
        </p>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {partCategoryLabels.map((label) => (
            <li
              key={label}
              data-cat
              className="text-[12px] font-medium uppercase tracking-[0.14em] text-slate"
            >
              {label}
            </li>
          ))}
        </ul>

        <Link
          href="/services/engines-parts"
          data-cursor="VIEW"
          className="group mt-10 inline-flex items-center gap-2 text-[14px] font-medium text-glacier transition-colors hover:text-ice"
        >
          <span className="relative">
            Explore engines &amp; parts
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
          </span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Component visual */}
      <div className="relative">
        <div ref={visual} className="relative will-change-transform">
          <div
            className="relative aspect-square overflow-hidden rounded-[28px] border border-white/10"
            style={{
              background:
                "radial-gradient(120% 120% at 35% 25%, #313b47 0%, #171e27 48%, #080a0d 100%)",
            }}
          >
            {/* Concentric turbine rings (abstract, decorative) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[0.9, 0.72, 0.54, 0.36, 0.18].map((s, idx) => (
                <div
                  key={s}
                  className="absolute rounded-full border border-white/10"
                  style={{
                    width: `${s * 100}%`,
                    height: `${s * 100}%`,
                    borderColor:
                      idx === 1 ? "rgba(114,185,214,0.35)" : "rgba(255,255,255,0.08)",
                  }}
                />
              ))}
              <div
                className="h-[12%] w-[12%] rounded-full"
                style={{ background: "radial-gradient(circle,#B7E3F3,#397a99)" }}
              />
            </div>
            {/* Annotation hairline (decorative only) */}
            <div className="absolute left-6 top-6">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ice/80">
                Series / Engine
              </span>
              <div className="mt-1 h-px w-12 bg-ice/40" />
            </div>
            <span className="absolute bottom-6 right-6 text-[10px] font-medium uppercase tracking-[0.18em] text-slate">
              Detail / 03
            </span>
          </div>
        </div>
        <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-slate">
          Aircraft Parts | Procurement | Supply Chain Solutions
        </p>
      </div>
    </div>
  );
}
