"use client";

import Link from "next/link";
import Header from "../components/Header";
import { ROUTES } from "../constants/routes";

export default function HomePage() {
  return (
    <div className="page-shell">
      <Header />

      <main>
        {/* Hero */}
        <section className="container px-0 pb-16 pt-14 sm:pb-24 sm:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D0D5DD] bg-white px-4 py-2 text-sm font-semibold text-[#475467] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#12B76A]" />
              Public-service companion
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] text-[#101828] sm:text-6xl">
              Vehicle services,
              <br />
              <span className="text-[#155EEF]">explained simply.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#667085] sm:text-lg">
              Government processes shouldn't require you to understand
              government vocabulary. Tell us what you're trying to do and
              we'll guide you to the next step.
            </p>
          </div>

          {/* Service choices */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            <Link
              href={ROUTES.JOURNEY}
              className="service-card group p-6 sm:p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF1FF] text-2xl">
                🚗
              </div>

              <div className="mt-7">
                <p className="text-sm font-bold uppercase tracking-wider text-[#155EEF]">
                  Ownership transfer
                </p>

                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#101828]">
                  I bought a used vehicle
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#667085]">
                  Find out what needs to happen next to transfer the vehicle
                  into your name.
                </p>
              </div>

              <div className="mt-8 flex items-center font-bold text-[#155EEF]">
                Start journey
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>

            <Link
              href={ROUTES.STATUS}
              className="service-card group p-6 sm:p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECFDF3] text-2xl">
                📍
              </div>

              <div className="mt-7">
                <p className="text-sm font-bold uppercase tracking-wider text-[#067647]">
                  Application status
                </p>

                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#101828]">
                  Track my application
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#667085]">
                  Don't just see a status. Understand what it means and what
                  you should do next.
                </p>
              </div>

              <div className="mt-8 flex items-center font-bold text-[#067647]">
                Check status
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Product promise */}
        <section className="border-y border-[#E4E7EC] bg-white">
          <div className="container py-12">
            <div className="grid gap-8 sm:grid-cols-3">
              <Feature
                number="01"
                title="Tell us in plain language"
                description="No need to know the exact government form or service name."
              />

              <Feature
                number="02"
                title="Understand your journey"
                description="See where you are, what happened and what comes next."
              />

              <Feature
                number="03"
                title="Always know the next step"
                description="Turn confusing application statuses into clear actions."
              />
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <footer className="container py-8 text-center">
          <p className="text-xs leading-5 text-[#98A2B3]">
            Independent prototype • Synthetic demo data • Not an official
            government service
          </p>
        </footer>
      </main>
    </div>
  );
}

function Feature({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="text-xs font-extrabold tracking-widest text-[#155EEF]">
        {number}
      </div>

      <h3 className="mt-3 text-base font-bold text-[#101828]">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-[#667085]">{description}</p>
    </div>
  );
}