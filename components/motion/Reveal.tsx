"use client";

import { motion, type Variants } from "motion/react";
import { useReducedMotionState } from "./MotionProvider";

/**
 * Restrained scroll-into-view reveal (spec §16, §18, §64).
 *
 * Uses transform + opacity only, a single premium ease, and short durations.
 * Under reduced motion, content renders immediately with no transform.
 */

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds for simple staggering. */
  delay?: number;
  /** Vertical travel distance in px (kept small per spec). */
  y?: number;
  as?: "div" | "section" | "span" | "li" | "article";
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className, delay = 0, y = 20, as = "div" }: RevealProps) {
  const { reduced } = useReducedMotionState();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.001 : 0.7, ease: EASE, delay: reduced ? 0 : delay },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers Reveal-like children via CSS-free variant propagation. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const { reduced } = useReducedMotionState();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : stagger },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/** Child intended to be used inside RevealGroup. */
export function RevealItem({
  children,
  className,
  y = 20,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "span" | "article";
}) {
  const { reduced } = useReducedMotionState();
  const item: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.001 : 0.6, ease: EASE } },
  };
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag className={className} variants={item}>
      {children}
    </MotionTag>
  );
}
