type PrimaryButtonProps = {
  label: string;
  disabled?: boolean;
};

export function PrimaryButton({ label, disabled = false }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-lg py-sm text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {label}
    </button>
  );
}

