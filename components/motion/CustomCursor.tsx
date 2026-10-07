"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionState } from "./MotionProvider";

/**
 * Restrained custom cursor, desktop + fine-pointer only (spec §20).
 *
 * - Never shown on touch devices.
 * - Disabled under reduced motion.
 * - Native cursor hidden only while the custom cursor is active.
 * - Small dot; expands slightly and shows a label ("VIEW"/"OPEN") over
 *   elements carrying data-cursor.
 */
export function CustomCursor() {
  const { reduced } = useReducedMotionState();
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || reduced) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (el) {
        setHovering(true);
        setLabel(el.dataset.cursor || null);
      } else {
        const interactive = (e.target as HTMLElement)?.closest("a,button,input,textarea,select,label");
        setHovering(Boolean(interactive));
        setLabel(null);
      }
    };

    const render = () => {
      // Small magnetic smoothing (spec §68: 1–2px magnetic movement).
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center"
      style={{ willChange: "transform" }}
    >
      <div
        className="flex items-center justify-center rounded-full border-2 border-white bg-cursor text-[9px] font-bold uppercase tracking-[0.12em] text-carbon transition-[width,height] duration-200"
        style={{
          width: label ? 56 : hovering ? 24 : 14,
          height: label ? 56 : hovering ? 24 : 14,
          // Light and dark edges keep the cursor distinct on any surface.
          boxShadow: "0 0 0 1px #080a0d, 0 2px 8px rgb(8 10 13 / 45%)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
