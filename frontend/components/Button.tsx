"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "primary-button",
    secondary: "secondary-button",
    outline:
      "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] bg-transparent px-5 font-bold text-[#101828] transition hover:bg-[#F9FAFB]",
  };

  return (
    <button
      className={`${variantClasses[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}