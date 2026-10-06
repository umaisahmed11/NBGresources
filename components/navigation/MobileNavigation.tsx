"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { capabilityLinks, companyLinks } from "@/content/navigation";

/**
 * Full-screen mobile menu overlay (spec §6 mobile navigation).
 * Dark graphite background, large labels, clear RFQ action, focus managed.
 */
export function MobileNavigation({
  onClose,
  closeIcon,
}: {
  onClose: () => void;
  closeIcon: React.ReactNode;
}) {
  // Lock scroll + escape to close (spec §49 dialog focus management).
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex flex-col bg-graphite lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="flex h-[84px] items-center justify-between px-[18px] sm:px-8">
        <span className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-text-light">
          Menu
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-text-light"
        >
          {closeIcon}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-[18px] pb-10 pt-4 sm:px-8" aria-label="Mobile">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-slate">
          Capabilities
        </p>
        <ul className="mb-8 grid gap-1">
          {capabilityLinks.map((item, i) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="flex items-baseline gap-3 py-2.5 font-display text-[26px] font-medium tracking-tight text-text-light"
              >
                <span className="text-sm text-slate">{item.index}</span>
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-slate">
          Company
        </p>
        <ul className="mb-8 grid gap-1">
          {companyLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-2 font-display text-[22px] font-medium tracking-tight text-text-light"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={onClose}
              className="block py-2 font-display text-[22px] font-medium tracking-tight text-text-light"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className="border-t border-white/10 p-[18px] sm:p-8">
        <Link
          href="/request-rfq"
          onClick={onClose}
          className="flex items-center justify-center gap-2 rounded-full bg-frost px-6 py-4 text-[13px] font-medium uppercase tracking-[0.12em] text-carbon"
        >
          Request RFQ
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
