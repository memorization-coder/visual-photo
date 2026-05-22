"use client";

import type { ReactNode } from "react";
import { Shell } from "@/components/primitives";

type DemoGuestShellProps = {
  children: ReactNode;
};

export function DemoGuestShell({ children }: DemoGuestShellProps) {
  return (
    <main className="min-h-screen bg-background px-md py-lg text-text-primary">
      <Shell className="flex flex-col gap-md">{children}</Shell>
    </main>
  );
}
