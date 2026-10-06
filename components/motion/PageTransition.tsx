"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionState } from "./MotionProvider";

/**
 * Subtle route-transition mask (spec §23).
 *
 * A thin titanium/atmospheric surface briefly crosses the screen on navigation,
 * then reveals the next page. Kept short (≈500ms) and skipped under reduced
 * motion, where content simply appears.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { reduced } = useReducedMotionState();

  if (reduced) return <>{children}</>;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`mask-${pathname}`}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[9998] origin-top bg-titanium"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
        />
      </AnimatePresence>
    </>
  );
}
