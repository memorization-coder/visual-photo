import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type ButtonVariant = "filled" | "outlined" | "ghost" | "muted" | "success";
type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
};

type LinkButtonProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return clsx(
    "inline-flex items-center justify-center rounded-lg font-medium transition focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:shrink-0",
    size === "sm" && "min-h-10 px-md py-sm text-sm",
    size === "md" && "min-h-11 px-lg py-sm text-sm",
    size === "lg" && "min-h-12 px-lg py-md text-base",
    variant === "filled" && "bg-accent text-white hover:opacity-95",
    variant === "outlined" && "border border-[var(--color-border-strong)] bg-surface text-text-primary hover:bg-surface-muted",
    variant === "ghost" && "bg-transparent text-text-primary hover:bg-surface-muted",
    variant === "muted" && "bg-surface-muted text-text-primary hover:opacity-95",
    variant === "success" && "bg-success text-white hover:opacity-95",
    className
  );
}

function isLinkButton(props: NativeButtonProps | LinkButtonProps): props is LinkButtonProps {
  return "href" in props && typeof props.href === "string";
}

export function Button(props: NativeButtonProps | LinkButtonProps) {
  const variant = props.variant ?? "filled";
  const size = props.size ?? "md";
  const disabled = Boolean(props.disabled);
  const classes = buttonClasses(variant, size, props.className);

  if (isLinkButton(props)) {
    const { children, href, target, rel, onClick } = props;

    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={classes}
        aria-disabled={disabled ? "true" : undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (event) => event.preventDefault() : onClick}
      >
        {children}
      </Link>
    );
  }

  const { children, variant: _variant, size: _size, className: _className, ...rest } = props;

  return (
    <button type="button" className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
