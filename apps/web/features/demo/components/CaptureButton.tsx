import { ActionButton } from "./shared";

type CaptureButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

export function CaptureButton({ label, onClick, className }: CaptureButtonProps) {
  return (
    <ActionButton onClick={onClick} className={`bg-accent text-white hover:opacity-95 ${className ?? ""}`.trim()}>
      {label}
    </ActionButton>
  );
}
