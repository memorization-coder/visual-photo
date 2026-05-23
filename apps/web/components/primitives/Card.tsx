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
        variant === "surface" && "border-[var(--color-border)] bg-surface",
        variant === "muted" && "border-[var(--color-border)] bg-surface-muted",
        variant === "emphasis" && "border-[var(--color-border-strong)] bg-[var(--color-surface-emphasis)]",
        padded && "p-lg",
        className
      )}
    >
      {children}
    </section>
  );
}
