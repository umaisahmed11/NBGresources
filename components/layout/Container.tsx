import { cn } from "@/lib/utils";

/**
 * Content container implementing the spec §12 grid rules:
 * max content width ~1520px, generous responsive side padding.
 */
export function Container({
  children,
  className,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[18px] sm:px-8 lg:px-14 xl:px-20",
        wide ? "max-w-[1520px]" : "max-w-[1360px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
