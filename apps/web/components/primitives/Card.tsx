import type { ReactNode } from "react";
import clsx from "clsx";

type CardVariant = "surface" | "muted" | "emphasis";

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  padded?: boolean;
};

export function Card({ children, className, variant = "surface", padded = true }: CardProps) {
  return (
    <section
      className={clsx(
        "rounded-xl border shadow-card",
        variant === "surface" && "border-[#e6d7c8] bg-surface",
        variant === "muted" && "border-[#eadfce] bg-surface-muted",
        variant === "emphasis" && "border-[#d7c4b3] bg-[#fff6ed]",
        padded && "p-lg",
        className
      )}
    >
      {children}
    </section>
  );
}
