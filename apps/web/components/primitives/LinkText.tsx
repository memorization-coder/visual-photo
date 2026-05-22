import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type LinkTextProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function LinkText({ href, children, className }: LinkTextProps) {
  return (
    <Link
      href={href}
      className={clsx("text-sm font-medium text-accent underline-offset-4 transition hover:underline", className)}
    >
      {children}
    </Link>
  );
}
