import { Button } from "@/components/primitives";

type PrimaryButtonProps = {
  label: string;
  disabled?: boolean;
};

export function PrimaryButton({ label, disabled = false }: PrimaryButtonProps) {
  return <Button disabled={disabled}>{label}</Button>;
}
