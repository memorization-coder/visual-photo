import { ActionButton } from "./shared";

type SkipButtonProps = {
  label: string;
  onClick?: () => void;
};

export function SkipButton({ label, onClick }: SkipButtonProps) {
  return (
    <ActionButton
      onClick={onClick}
      className="border border-[#d7c7b8] bg-transparent text-text-primary hover:bg-surface-muted"
    >
      {label}
    </ActionButton>
  );
}
