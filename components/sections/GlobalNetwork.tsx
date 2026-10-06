"use client";

import { motion } from "motion/react";
import { useReducedMotionState } from "@/components/motion/MotionProvider";

/**
 * Abstract global network visualization (spec §24 Section 5).
 *
 * Deliberately NOT a cliché world map: a minimal grid globe with fine
 * longitude/latitude arcs and subtle routing lines. No specific city labels or
 * office counts are shown (those are unverified facts per spec §24 IMPORTANT).
 * Routing animation is disabled under reduced motion.
 */
export function GlobalNetwork() {
  const { reduced } = useReducedMotionState();

  const arcs = [
    "M120,210 C220,90 400,90 500,180",
    "M90,300 C260,260 420,320 540,250",
    "M160,360 C300,420 440,380 520,320",
  ];

  return (
    <div className="relative mx-auto aspect-[3/2] w-full max-w-[640px]">
      <svg
        viewBox="0 0 620 420"
        fill="none"
        className="h-full w-full"
        role="img"
        aria-label="Abstract visualization of a connected global aviation network"
      >
        {/* Globe circle */}
        <circle cx="310" cy="210" r="180" stroke="rgba(255,255,255,0.12)" />
        {/* Latitude lines */}
        {[-120, -60, 0, 60, 120].map((offset) => (
          <ellipse
            key={`lat${offset}`}
            cx="310"
            cy={210 + offset}
            rx={Math.sqrt(Math.max(0, 180 * 180 - offset * offset))}
            ry="18"
            stroke="rgba(255,255,255,0.07)"
          />
        ))}
        {/* Longitude lines */}
        {[40, 90, 140].map((rx) => (
          <ellipse
            key={`lon${rx}`}
            cx="310"
            cy="210"
            rx={rx}
            ry="180"
            stroke="rgba(255,255,255,0.07)"
          />
        ))}
        <ellipse cx="310" cy="210" rx="180" ry="180" stroke="rgba(255,255,255,0.07)" />

        {/* Routing arcs */}
        {arcs.map((d, i) => (
          <g key={d}>
            <path d={d} stroke="rgba(114,185,214,0.28)" strokeWidth="1" />
            {reduced ? (
              <circle r="2.5" fill="#B7E3F3">
                <animate attributeName="opacity" values="1" dur="0s" />
              </circle>
            ) : (
              <motion.circle r="2.5" fill="#B7E3F3">
                <animateMotion dur={`${6 + i * 2}s`} repeatCount="indefinite" path={d} />
              </motion.circle>
            )}
          </g>
        ))}

        {/* Node points */}
        {[
          [120, 210],
          [500, 180],
          [540, 250],
          [160, 360],
          [520, 320],
          [90, 300],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#72B9D6" />
        ))}
      </svg>
    </div>
  );
}
