import type { ElementType, ReactNode } from "react";
import clsx from "clsx";

type ShellProps<TTag extends ElementType = "main"> = {
  as?: TTag;
  children: ReactNode;
  className?: string;
  width?: "md" | "lg" | "xl";
};

export function Shell<TTag extends ElementType = "main">({
  as,
  children,
  className,
  width = "md"
}: ShellProps<TTag>) {
  const Component = (as ?? "main") as ElementType;

  return (
    <Component className={clsx("mx-auto w-full", width === "md" && "max-w-md", width === "lg" && "max-w-2xl", width === "xl" && "max-w-4xl", className)}>
      {children}
    </Component>
  );
}
