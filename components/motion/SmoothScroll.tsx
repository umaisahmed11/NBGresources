"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotionState } from "./MotionProvider";

/**
 * Lenis smooth-scroll layer (spec §17, §44).
 *
 * Used ONLY as a smooth-scroll enhancement — never for scroll hijacking or
 * forced snapping. Disabled entirely under reduced motion (spec §19) so native
 * scrolling and anchors keep working.
 */
export function SmoothScroll() {
  const { reduced } = useReducedMotionState();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      // Gentle, native-feeling acceleration (spec §44).
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
