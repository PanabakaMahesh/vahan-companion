"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const backButtonClasses =
  "inline-flex min-h-10 items-center gap-2 rounded-md px-1.5 py-1 text-sm font-semibold text-[#344054] transition-colors duration-150 hover:text-[#155EEF] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#155EEF]/10";

export default function BackButton({
  href,
  onClick,
  children = "Back",
}: BackButtonProps) {
  if (href) {
    return (
      <Link href={href} className={backButtonClasses}>
        <span aria-hidden="true" className="text-base leading-none">
          ←
        </span>

        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={backButtonClasses}
    >
      <span aria-hidden="true" className="text-base leading-none">
        ←
      </span>

      <span>{children}</span>
    </button>
  );
}