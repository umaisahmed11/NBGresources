import { cn } from "@/lib/utils";

/**
 * Technical image frame with decorative annotations (spec §14, §40).
 *
 * DEVIATION (see DEVIATIONS.md): No licensed aviation photography was available
 * in this environment, and the spec forbids using unlicensed photos or
 * low-quality AI imagery. Instead of shipping generic/unlicensed stock, this
 * component renders a premium, cinematically-graded CSS placeholder frame that
 * clearly reads as a provisional surface. Replace with the client's licensed
 * high-resolution photography (see the image asset checklist, spec §63) by
 * passing a real `src`.
 *
 * Annotations are DECORATIVE only — no fake part numbers, dimensions or specs
 * are attached (spec §40).
 */

type Tone = "engine" | "titanium" | "glacier" | "carbon";

const toneGradient: Record<Tone, string> = {
  engine:
    "radial-gradient(120% 120% at 30% 20%, #2a3440 0%, #141a22 45%, #080a0d 100%)",
  titanium:
    "radial-gradient(120% 120% at 70% 10%, #303843 0%, #1a2028 50%, #11161d 100%)",
  glacier:
    "radial-gradient(120% 120% at 30% 30%, #397a99 0%, #1a2836 55%, #0b1016 100%)",
  carbon:
    "radial-gradient(120% 120% at 50% 0%, #1a2028 0%, #0d1116 55%, #080a0d 100%)",
};

export function TechnicalImage({
  label,
  detail,
  tone = "engine",
  className,
  aspect = "aspect-[4/3]",
  caption = "LICENSED PHOTOGRAPHY / PLACEHOLDER",
}: {
  label?: string;
  detail?: string;
  tone?: Tone;
  className?: string;
  aspect?: string;
  caption?: string;
}) {
  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-[22px] border border-white/10",
        aspect,
        className,
      )}
      style={{ background: toneGradient[tone] }}
    >
      {/* Metallic light sweep (spec §68), transform-only on hover */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(183,227,243,0.10) 48%, rgba(183,227,243,0.02) 52%, transparent 70%)",
        }}
      />
      {/* Fine technical grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Corner reference label (decorative) */}
      {label ? (
        <figcaption className="absolute left-4 top-4 z-10 flex flex-col gap-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ice/80">
            {label}
          </span>
          <span aria-hidden className="h-px w-10 bg-ice/40" />
        </figcaption>
      ) : null}
      {detail ? (
        <span className="absolute bottom-4 right-4 z-10 text-[10px] font-medium uppercase tracking-[0.18em] text-slate">
          {detail}
        </span>
      ) : null}
      {/* Provisional marker */}
      <span className="absolute bottom-4 left-4 z-10 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-slate backdrop-blur-sm">
        {caption}
      </span>
    </figure>
  );
}
