"use client";

import type { JourneyStep } from "../lib/types";

interface JourneyProgressProps {
  currentStep: JourneyStep;
}

const steps: {
  id: JourneyStep;
  label: string;
  shortLabel: string;
}[] = [
  {
    id: "SELLER_INITIATION",
    label: "Seller starts transfer",
    shortLabel: "Seller starts",
  },
  {
    id: "BUYER_CONFIRMATION",
    label: "Buyer confirms transfer",
    shortLabel: "Buyer confirms",
  },
  {
    id: "DOCUMENTS",
    label: "Documents",
    shortLabel: "Documents",
  },
  {
    id: "PAYMENT",
    label: "Application fee",
    shortLabel: "Payment",
  },
  {
    id: "VERIFICATION",
    label: "Application verification",
    shortLabel: "Verification",
  },
  {
    id: "COMPLETED",
    label: "Ownership updated",
    shortLabel: "Complete",
  },
];

const order: JourneyStep[] = [
  "SELLER_INITIATION",
  "BUYER_CONFIRMATION",
  "DOCUMENTS",
  "PAYMENT",
  "VERIFICATION",
  "COMPLETED",
];

export default function JourneyProgress({
  currentStep,
}: JourneyProgressProps) {
  const currentIndex = order.indexOf(currentStep);
  const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0;

  return (
    <section
      className="service-card p-5 sm:p-7"
      aria-label="Vehicle ownership transfer progress"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#155EEF]">
            Your journey
          </p>

          <h2 className="mt-1 text-lg font-extrabold text-[#101828] sm:text-xl">
            Vehicle ownership transfer
          </h2>

          <p className="mt-1 text-xs leading-5 text-[#667085] sm:text-sm">
            Follow the steps to complete the transfer.
          </p>
        </div>

        <div
          className="shrink-0 rounded-full border border-[#D0D5DD] bg-white px-3 py-1.5 text-xs font-bold text-[#475467]"
          aria-label={`Step ${safeCurrentIndex + 1} of ${steps.length}`}
        >
          Step {safeCurrentIndex + 1} of {steps.length}
        </div>
      </div>

      {/* Steps */}
      <div className="mt-7">
        {steps.map((step, index) => {
          const isCompleted = index < safeCurrentIndex;
          const isCurrent = index === safeCurrentIndex;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative flex gap-4">
              {/* Connecting line */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  className={`absolute left-[15px] top-8 h-[calc(100%-4px)] w-0.5 ${
                    index < safeCurrentIndex
                      ? "bg-[#12B76A]"
                      : "bg-[#E4E7EC]"
                  }`}
                />
              )}

              {/* Step indicator */}
              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-extrabold ${
                  isCompleted
                    ? "border-[#12B76A] bg-[#12B76A] text-white"
                    : isCurrent
                      ? "border-[#155EEF] bg-[#EAF1FF] text-[#155EEF]"
                      : "border-[#D0D5DD] bg-white text-[#667085]"
                }`}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              {/* Step information */}
              <div
                className={`min-w-0 ${
                  isLast ? "pb-0" : "pb-7"
                }`}
              >
                <p
                  className={`text-sm font-bold ${
                    isCurrent
                      ? "text-[#155EEF]"
                      : isCompleted
                        ? "text-[#101828]"
                        : "text-[#475467]"
                  }`}
                >
                  <span className="sm:hidden">
                    {step.shortLabel}
                  </span>

                  <span className="hidden sm:inline">
                    {step.label}
                  </span>
                </p>

                {isCurrent && (
                  <p className="mt-1 text-xs leading-5 text-[#667085]">
                    You are currently at this step.
                  </p>
                )}

                {isCompleted && (
                  <p className="mt-1 text-xs leading-5 text-[#667085]">
                    Completed
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}