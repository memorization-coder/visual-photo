"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Button, Shell, Stack } from "@/components/primitives";
import { buildEventMissionsPath, buildEventPath, buildEventWallPath } from "@/lib/routes";
import { demoEventSlug } from "../demoData";

type DemoGuestShellProps = {
  locale: string;
  children: ReactNode;
};

export function DemoGuestShell({ locale, children }: DemoGuestShellProps) {
  const t = useTranslations("demo.nav");

  return (
    <main className="min-h-screen bg-background px-md py-lg text-text-primary">
      <Shell className="flex flex-col gap-md">
        <Stack
          as="nav"
          direction="horizontal"
          align="center"
          className="rounded-full border border-[#e6d7c8] bg-surface px-sm py-sm shadow-card"
          gap="sm"
        >
          <NavLink href={buildEventPath(locale, demoEventSlug)}>{t("event")}</NavLink>
          <NavLink href={buildEventMissionsPath(locale, demoEventSlug)}>{t("missions")}</NavLink>
          <NavLink href={buildEventWallPath(locale, demoEventSlug)}>{t("wall")}</NavLink>
        </Stack>
        {children}
      </Shell>
    </main>
  );
}

type NavLinkProps = {
  children: ReactNode;
  href: string;
};

function NavLink({ children, href }: NavLinkProps) {
  return (
    <Button
      href={href}
      variant="ghost"
      size="sm"
      className="rounded-full"
    >
      {children}
    </Button>
  );
}
