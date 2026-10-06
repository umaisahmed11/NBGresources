"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { capabilities, aogCapability } from "@/content/services";
import { TechnicalImage } from "@/components/ui/TechnicalImage";
import { useReducedMotionState } from "@/components/motion/MotionProvider";

/**
 * Interactive vertically-stacked capability list (spec §24 Section 3 design).
 * Not five generic cards: rows expand on hover with a related image preview and
 * technical subtext. On mobile the preview appears within the selected item.
 */

const rows = [
  ...capabilities.map((c) => ({
    index: c.index,
    title: c.title,
    href: c.href,
    subtext: c.short,
  })),
  {
    index: aogCapability.index,
    title: aogCapability.title,
    href: aogCapability.href,
    subtext: aogCapability.short,
  },
];

const tones = ["engine", "titanium", "glacier", "carbon", "engine"] as const;

export function CapabilityList() {
  const [active, setActive] = useState(0);
  const { reduced } = useReducedMotionState();

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      <ul className="border-t border-silver">
        {rows.map((row, i) => {
          const isActive = active === i;
          return (
            <li key={row.href} className="border-b border-silver">
              <Link
                href={row.href}
                data-cursor="VIEW"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-xl px-4 py-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:py-7 ${
                  isActive ? "bg-deepice" : ""
                }`}
              >
                <span className={`font-display text-sm ${isActive ? "text-ice" : "text-steel"}`}>
                  {row.index}
                </span>
                <span className="flex flex-col gap-2">
                  <span
                    className={`font-display text-[22px] font-medium tracking-tight transition-transform duration-300 sm:text-[28px] ${
                      isActive ? "text-white" : ""
                    } ${isActive && !reduced ? "translate-x-1.5" : ""}`}
                  >
                    {row.title}
                  </span>
                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.span
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="block max-w-[46ch] overflow-hidden text-[14px] leading-relaxed text-white/85"
                      >
                        {row.subtext}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>

                  {/* Mobile inline preview */}
                  {isActive ? (
                    <span className="mt-3 block lg:hidden">
                      <TechnicalImage
                        tone={tones[i]}
                        aspect="aspect-[16/10]"
                        label={`Capability / ${row.index}`}
                      />
                    </span>
                  ) : null}
                </span>
                <ArrowRight
                  className={`h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5 ${
                    isActive ? "text-white" : "text-steel"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Desktop preview panel */}
      <div className="sticky top-28 hidden self-start lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: reduced ? 1 : 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <TechnicalImage
              tone={tones[active]}
              aspect="aspect-[4/5]"
              label={`Capability / ${rows[active].index}`}
              detail={rows[active].title}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
