"use client";

import Link from "next/link";
import { ROUTES } from "../constants/routes";

export default function Header() {
  return (
    <header className="border-b border-[#E4E7EC] bg-white/90 backdrop-blur">
      <div className="container flex min-h-[72px] items-center justify-between">
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-3"
          aria-label="VAHAN Companion home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1FF] text-xl">
            🚗
          </div>

          <div>
            <div className="text-base font-extrabold tracking-tight text-[#101828]">
              VAHAN Companion
            </div>

            <div className="hidden text-xs text-[#667085] sm:block">
              Vehicle services, explained simply
            </div>
          </div>
        </Link>

        <Link
          href={ROUTES.STATUS}
          className="text-sm font-semibold text-[#475467] transition hover:text-[#155EEF]"
        >
          Track application
        </Link>
      </div>
    </header>
  );
}