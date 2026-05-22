import type { ReactNode } from "react";
import { Button, Card } from "@/components/primitives";

type SurfaceCardProps = {
  children: ReactNode;
  className?: string;
};

export function SurfaceCard({ children, className }: SurfaceCardProps) {
  return <Card className={className}>{children}</Card>;
}

type ActionButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function ActionButton({
  children,
  className,
  disabled = false,
  onClick,
  type = "button"
}: ActionButtonProps) {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      variant="ghost"
      className={className}
    >
      {children}
    </Button>
  );
}
