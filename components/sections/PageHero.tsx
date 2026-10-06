import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

/**
 * Reusable interior page hero (spec §25–§35 hero blocks).
 * Dark by default with a restrained atmospheric glow, following the
 * "dark hero → light body" page rhythm (spec §66).
 */
export function PageHero({
  eyebrow,
  heading,
  copy,
  theme = "carbon",
  primaryCta,
  secondaryCta,
  align = "left",
}: {
  eyebrow: string;
  heading: React.ReactNode;
  copy?: string;
  theme?: "carbon" | "graphite" | "arctic";
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  align?: "left" | "center";
}) {
  const dark = theme !== "arctic";
  return (
    <section
      className={`relative overflow-hidden pt-[132px] pb-[72px] md:pt-[160px] md:pb-[110px] lg:pt-[200px] lg:pb-[140px] ${
        dark ? "bg-carbon text-text-light" : "bg-arctic text-text-dark"
      }`}
    >
      {dark ? (
        <div
          aria-hidden
          className="absolute right-[-5%] top-[10%] h-[55vh] w-[55vh] rounded-full opacity-30 blur-[130px]"
          style={{ background: "radial-gradient(circle, #397a99 0%, transparent 70%)" }}
        />
      ) : null}
      <Container>
        <Reveal className={align === "center" ? "mx-auto max-w-[900px] text-center" : "max-w-[900px]"}>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-glacier">
            {eyebrow}
          </p>
          <h1 className="mt-6 font-display text-[42px] font-medium leading-[1.0] tracking-[-0.04em] sm:text-[58px] lg:text-[76px]">
            {heading}
          </h1>
          {copy ? (
            <p
              className={`mt-8 text-[17px] leading-relaxed sm:text-[19px] ${
                align === "center" ? "mx-auto" : ""
              } max-w-[640px] ${dark ? "text-text-muted-dark" : "text-steel"}`}
            >
              {copy}
            </p>
          ) : null}
          {primaryCta || secondaryCta ? (
            <div
              className={`mt-10 flex flex-col gap-3 sm:flex-row sm:items-center ${
                align === "center" ? "sm:justify-center" : ""
              }`}
            >
              {primaryCta ? <PrimaryButton href={primaryCta.href}>{primaryCta.label}</PrimaryButton> : null}
              {secondaryCta ? (
                <SecondaryButton href={secondaryCta.href} dark={!dark}>
                  {secondaryCta.label}
                </SecondaryButton>
              ) : null}
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
