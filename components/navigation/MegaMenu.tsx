"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { NavLink } from "@/content/navigation";

/**
 * Wide "mini mega-menu" for Capabilities / Company (spec §6 dropdown design).
 * Numbered capability rows with technical subtext and preview labels — not a
 * traditional small dropdown.
 */
export function MegaMenu({
  variant,
  capabilities,
  company,
}: {
  variant: "capabilities" | "company";
  capabilities: NavLink[];
  company: NavLink[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full border-b border-white/10 bg-carbon/85 backdrop-blur-[18px]"
    >
      <div className="mx-auto max-w-[1520px] px-[18px] py-4 sm:px-8 lg:px-14 xl:px-20">
        {variant === "capabilities" ? (
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate">
              Capabilities / 01–05
            </span>
            <ul className="mt-3 grid gap-1">
              {capabilities.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-cursor="VIEW"
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 rounded-xl border border-transparent px-4 py-4 transition-colors duration-200 hover:border-white/10 hover:bg-white/[0.03]"
                  >
                    <span className="font-display text-sm text-slate">{item.index}</span>
                    <span className="flex flex-col gap-1">
                      <span className="text-[17px] font-medium text-text-light">{item.label}</span>
                      <span className="text-[13px] text-text-muted-dark">{item.description}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ice" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate">
              Company
            </span>
            <ul className="mt-3 grid gap-1 sm:max-w-md">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-cursor="VIEW"
                    className="group flex items-center justify-between rounded-xl border border-transparent px-4 py-4 transition-colors duration-200 hover:border-white/10 hover:bg-white/[0.03]"
                  >
                    <span className="text-[17px] font-medium text-text-light">{item.label}</span>
                    <ArrowRight className="h-4 w-4 text-slate transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ice" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
