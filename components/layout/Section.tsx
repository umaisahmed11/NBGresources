import { cn } from "@/lib/utils";
import { Container } from "./Container";

/**
 * Themed section wrapper (spec §10 light/dark rhythm, §12 vertical spacing).
 *
 * Generous vertical spacing scales down at tablet/mobile. Theme controls the
 * background/text material so pages can compose a continuous light/dark
 * sequence rather than a stack of independent rectangles.
 */

type Theme = "carbon" | "graphite" | "arctic" | "frost";

const themeClasses: Record<Theme, string> = {
  carbon: "bg-carbon text-text-light",
  graphite: "bg-graphite text-text-light",
  arctic: "bg-arctic text-text-dark",
  frost: "bg-frost text-text-dark",
};

export function Section({
  children,
  theme = "carbon",
  className,
  containerClassName,
  wide = false,
  id,
  bare = false,
}: {
  children: React.ReactNode;
  theme?: Theme;
  className?: string;
  containerClassName?: string;
  wide?: boolean;
  id?: string;
  /** When true, render without the inner Container (for full-bleed sections). */
  bare?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-[72px] md:py-[110px] lg:py-[160px]",
        themeClasses[theme],
        className,
      )}
    >
      {bare ? children : <Container wide={wide} className={containerClassName}>{children}</Container>}
    </section>
  );
}
