import type { ElementType, ReactNode } from "react";
import clsx from "clsx";

type TextVariant = "bodyLg" | "bodyMd" | "bodySm" | "labelMd" | "labelSm";
type TextTone = "default" | "muted" | "success" | "warning" | "error";

type TextProps<TTag extends ElementType = "p"> = {
  as?: TTag;
  children: ReactNode;
  className?: string;
  tone?: TextTone;
  variant?: TextVariant;
};

export function Text<TTag extends ElementType = "p">({
  as,
  children,
  className,
  tone = "default",
  variant = "bodyMd"
}: TextProps<TTag>) {
  const Component = (as ?? "p") as ElementType;

  return (
    <Component
      className={clsx(
        variant === "bodyLg" && "text-base leading-7",
        variant === "bodyMd" && "text-sm leading-6",
        variant === "bodySm" && "text-sm",
        variant === "labelMd" && "text-sm font-medium",
        variant === "labelSm" && "text-xs font-medium uppercase tracking-[0.16em]",
        tone === "default" && "text-text-primary",
        tone === "muted" && "text-text-secondary",
        tone === "success" && "text-success",
        tone === "warning" && "text-warning",
        tone === "error" && "text-error",
        className
      )}
    >
      {children}
    </Component>
  );
}
