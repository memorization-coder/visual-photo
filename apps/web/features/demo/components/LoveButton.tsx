"use client";

import { ActionButton } from "./shared";

type LoveButtonProps = {
  active: boolean;
  count: number;
  onClick?: () => void;
};

export function LoveButton({ active, count, onClick }: LoveButtonProps) {
  return (
    <ActionButton
      onClick={onClick}
      className={
        active
          ? "min-h-[3rem] rounded-full border-0 !bg-[#ef9467] px-lg !text-[#fffaf4]"
          : "min-h-[3rem] rounded-full !border-[rgba(255,243,231,0.18)] !bg-[rgba(255,243,231,0.08)] px-lg !text-[#fff3e6]"
      }
    >
      <span className="inline-flex items-center gap-sm">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-none stroke-current stroke-[1.9]"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20.5 4.8 13.8a4.8 4.8 0 0 1 6.8-6.8L12 7.4l.4-.4a4.8 4.8 0 0 1 6.8 6.8Z" />
        </svg>
        <span>{count}</span>
      </span>
    </ActionButton>
  );
}
