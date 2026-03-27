import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-md hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-accent",
  secondary:
    "bg-accent text-text border border-border hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary",
  ghost:
    "bg-transparent text-text hover:bg-surface border border-border focus-visible:ring-2 focus-visible:ring-primary",
  danger:
    "bg-danger text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-danger",
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition bg-primary hover:bg-hover",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClass[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
