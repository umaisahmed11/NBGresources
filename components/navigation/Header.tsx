"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/content/company";
import { capabilityLinks, companyLinks } from "@/content/navigation";
import { MegaMenu } from "./MegaMenu";
import { MobileNavigation } from "./MobileNavigation";

/**
 * Global header (spec §6).
 *
 * - Solid graphite at the top of every page, with a subtle border.
 * - After scroll: transitions to solid carbon while retaining its height.
 * - "Capabilities" uses a wide mini mega-menu rather than a small dropdown.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState<null | "capabilities" | "company">(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change.
  useEffect(() => {
    setMenuOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled ? "bg-carbon" : "bg-graphite",
      )}
      onMouseLeave={() => setMenuOpen(null)}
    >
      <div
        className="mx-auto flex h-[84px] max-w-[1520px] items-center justify-between px-[18px] sm:px-8 lg:px-14 xl:px-20"
      >
        {/* Logo / wordmark (restrained) */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-text-light"
          aria-label={`${company.name} home`}
          data-cursor="HOME"
        >
          <LogoMark />
          <span className="font-display text-[15px] font-semibold uppercase tracking-[0.14em]">
            {company.wordmark}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavTrigger
            label="Company"
            active={menuOpen === "company"}
            onEnter={() => setMenuOpen("company")}
          />
          <NavTrigger
            label="Capabilities"
            active={menuOpen === "capabilities"}
            onEnter={() => setMenuOpen("capabilities")}
          />
          <NavItem href="/contact" label="Contact" />
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/request-rfq"
            data-cursor="OPEN"
            className="hidden items-center gap-2 rounded-full bg-frost px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-carbon transition-colors duration-200 hover:bg-ice sm:inline-flex"
          >
            Request RFQ
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-text-light lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Wide mega-menu */}
      <AnimatePresence>
        {menuOpen ? (
          <MegaMenu
            variant={menuOpen}
            capabilities={capabilityLinks}
            company={companyLinks}
          />
        ) : null}
      </AnimatePresence>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen ? (
          <MobileNavigation onClose={() => setMobileOpen(false)} closeIcon={<X className="h-5 w-5" />} />
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-white/20 bg-gradient-to-br from-titanium to-carbon"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1.5 L14.5 14 L8 11 L1.5 14 Z"
          fill="none"
          stroke="#B7E3F3"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full px-4 py-2 text-[13px] font-medium tracking-tight text-text-light/85 transition-colors duration-200 hover:text-text-light"
    >
      {label}
    </Link>
  );
}

function NavTrigger({
  label,
  active,
  onEnter,
}: {
  label: string;
  active: boolean;
  onEnter: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className={cn(
        "rounded-full px-4 py-2 text-[13px] font-medium tracking-tight transition-colors duration-200",
        active ? "text-text-light" : "text-text-light/85 hover:text-text-light",
      )}
      aria-expanded={active}
    >
      {label}
    </button>
  );
}
