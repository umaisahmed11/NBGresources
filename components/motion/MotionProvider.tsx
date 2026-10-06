"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

/**
 * Application-level reduced-motion state (spec §19).
 *
 * Combines the OS `prefers-reduced-motion` preference with an in-app toggle so
 * every motion component can consult a single source of truth. When reduced
 * motion is active, smooth scroll, 3D travel, parallax and scroll-scrub effects
 * are disabled while content remains fully visible.
 */

type MotionContextValue = {
  /** True when motion should be reduced (OS preference OR app toggle). */
  reduced: boolean;
  /** App-level override (null = follow system). */
  appReduced: boolean | null;
  setAppReduced: (value: boolean | null) => void;
};

const MotionContext = createContext<MotionContextValue>({
  reduced: false,
  appReduced: null,
  setAppReduced: () => {},
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [systemReduced, setSystemReduced] = useState(false);
  const [appReduced, setAppReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const value = useMemo<MotionContextValue>(() => {
    const reduced = appReduced === null ? systemReduced : appReduced;
    return { reduced, appReduced, setAppReduced };
  }, [appReduced, systemReduced]);

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useReducedMotionState() {
  return useContext(MotionContext);
}
