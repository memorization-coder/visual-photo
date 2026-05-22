import type { ElementType, ReactNode } from "react";
import clsx from "clsx";

type StackGap = "xs" | "sm" | "md" | "lg" | "xl";
type StackDirection = "vertical" | "horizontal";
type StackAlign = "start" | "center" | "end" | "stretch";
type StackJustify = "start" | "center" | "end" | "between";

type StackProps<TTag extends ElementType = "div"> = {
  as?: TTag;
  children: ReactNode;
  className?: string;
  gap?: StackGap;
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
};

export function Stack<TTag extends ElementType = "div">({
  as,
  children,
  className,
  gap = "md",
  direction = "vertical",
  align = "stretch",
  justify = "start",
  wrap = false
}: StackProps<TTag>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      className={clsx(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        gap === "xs" && "gap-xs",
        gap === "sm" && "gap-sm",
        gap === "md" && "gap-md",
        gap === "lg" && "gap-lg",
        gap === "xl" && "gap-xl",
        align === "start" && "items-start",
        align === "center" && "items-center",
        align === "end" && "items-end",
        align === "stretch" && "items-stretch",
        justify === "start" && "justify-start",
        justify === "center" && "justify-center",
        justify === "end" && "justify-end",
        justify === "between" && "justify-between",
        wrap && "flex-wrap",
        className
      )}
    >
      {children}
    </Component>
  );
}
