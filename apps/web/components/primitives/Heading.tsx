import type { ElementType, ReactNode } from "react";
import clsx from "clsx";

type HeadingLevel = 1 | 2 | 3 | 4;

type HeadingProps<TTag extends ElementType = "h2"> = {
  level?: HeadingLevel;
  as?: TTag;
  children: ReactNode;
  className?: string;
};

const defaultTagByLevel: Record<HeadingLevel, ElementType> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4"
};

export function Heading<TTag extends ElementType = "h2">({
  level = 2,
  as,
  children,
  className
}: HeadingProps<TTag>) {
  const Component = (as ?? defaultTagByLevel[level]) as ElementType;

  return (
    <Component
      className={clsx(
        "font-semibold tracking-tight text-text-primary",
        level === 1 && "text-4xl",
        level === 2 && "text-3xl",
        level === 3 && "text-2xl",
        level === 4 && "text-xl",
        className
      )}
    >
      {children}
    </Component>
  );
}
