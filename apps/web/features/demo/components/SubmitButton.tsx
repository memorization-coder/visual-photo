import { ActionButton } from "./shared";

type SubmitButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function SubmitButton({ label, disabled, onClick }: SubmitButtonProps) {
  return (
    <ActionButton
      disabled={disabled}
      onClick={onClick}
      className="bg-success text-white hover:opacity-95"
    >
      {label}
    </ActionButton>
  );
}
