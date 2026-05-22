"use client";

import { useTranslations } from "next-intl";
import { ActionButton } from "./shared";

type LoveButtonProps = {
  active: boolean;
  count: number;
  onClick?: () => void;
};

export function LoveButton({ active, count, onClick }: LoveButtonProps) {
  const t = useTranslations("demo.wall");

  return (
    <ActionButton
      onClick={onClick}
      className={active ? "bg-accent text-white" : "bg-surface-muted text-text-primary"}
    >
      {t(active ? "loved" : "love", { count })}
    </ActionButton>
  );
}
