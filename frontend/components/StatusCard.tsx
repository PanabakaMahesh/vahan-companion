"use client";

import type { StatusResponse } from "../lib/types";

interface StatusCardProps {
  application: StatusResponse;
  onAction?: () => void;
}

interface StatusConfig {
  label: string;
  badge: string;
  icon: string;
  border: string;
  iconBackground: string;
  sectionBackground: string;
  actionLabel: string;
  nextStep: string;
}

const statusConfig: Record<string, StatusConfig> = {
  SUBMITTED: {
    label: "Application submitted",
    badge: "bg-[#EEF4FF] text-[#3538CD]",
    icon: "✓",
    iconBackground: "bg-[#EEF4FF] text-[#3538CD]",
    border: "border-[#C7D7FE]",
    sectionBackground: "bg-[#F8FAFC]",
    actionLabel: "No action required",
    nextStep:
      "Your application has been received and will move to verification.",
  },

  UNDER_VERIFICATION: {
    label: "Under verification",
    badge: "bg-[#FFFAEB] text-[#B54708]",
    icon: "●",
    iconBackground: "bg-[#FFFAEB] text-[#B54708]",
    border: "border-[#FEDF89]",
    sectionBackground: "bg-[#F8FAFC]",
    actionLabel: "Please wait",
    nextStep:
      "The details are being checked. You'll be notified when the next action is needed.",
  },

  DOCUMENT_REQUIRED: {
    label: "Document required",
    badge: "bg-[#FEF3F2] text-[#B42318]",
    icon: "!",
    iconBackground: "bg-[#FEF3F2] text-[#B42318]",
    border: "border-[#FECDCA]",
    sectionBackground: "bg-[#FFFCF5]",
    actionLabel: "Action required",
    nextStep:
      "Upload the missing document so the application can move forward.",
  },

  PAYMENT_PENDING: {
    label: "Payment pending",
    badge: "bg-[#FFFAEB] text-[#B54708]",
    icon: "₹",
    iconBackground: "bg-[#FFFAEB] text-[#B54708]",
    border: "border-[#FEDF89]",
    sectionBackground: "bg-[#FFFCF5]",
    actionLabel: "Action required",
    nextStep:
      "Complete the application fee to continue the ownership transfer.",
  },

  APPROVED: {
    label: "Application approved",
    badge: "bg-[#ECFDF3] text-[#067647]",
    icon: "✓",
    iconBackground: "bg-[#ECFDF3] text-[#067647]",
    border: "border-[#ABEFC6]",
    sectionBackground: "bg-[#F8FAFC]",
    actionLabel: "No action required",
    nextStep:
      "Your application has been approved. The ownership record can now be updated.",
  },

  COMPLETED: {
    label: "Ownership updated",
    badge: "bg-[#ECFDF3] text-[#067647]",
    icon: "✓",
    iconBackground: "bg-[#ECFDF3] text-[#067647]",
    border: "border-[#ABEFC6]",
    sectionBackground: "bg-[#F8FAFC]",
    actionLabel: "Completed",
    nextStep:
      "The ownership transfer is complete. No further action is required.",
  },
};

export default function StatusCard({
  application,
  onAction,
}: StatusCardProps) {
  const config =
    statusConfig[application.status] ?? statusConfig.SUBMITTED;

  const needsAction =
    application.status === "DOCUMENT_REQUIRED" ||
    application.status === "PAYMENT_PENDING";

  return (
    <section
      className={`overflow-hidden rounded-3xl border bg-white shadow-sm ${config.border}`}
    >
      {/* Header */}
      <div className="p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold ${config.iconBackground}`}
              aria-hidden="true"
            >
              {config.icon}
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#667085]">
                Current status
              </p>

              <h2 className="mt-1 text-xl font-extrabold text-[#101828] sm:text-2xl">
                {config.label}
              </h2>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${config.badge}`}
              >
                {needsAction ? "Action needed" : config.actionLabel}
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
              Application ID
            </p>

            <p className="mt-0.5 font-mono text-xs font-bold text-[#344054]">
              {application.id}
            </p>
          </div>
        </div>

        {/* What this means */}
        <div className="mt-7 rounded-2xl border border-[#E4E7EC] bg-[#F8FAFC] p-5">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#667085]">
            What this means
          </p>

          <p className="mt-2 text-sm leading-6 text-[#344054]">
            {application.explanation}
          </p>
        </div>

        {/* Missing documents */}
        {application.missing_documents.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-extrabold text-[#101828]">
              What is missing
            </p>

            <div className="mt-3 space-y-2">
              {application.missing_documents.map((document) => (
                <div
                  key={document}
                  className="flex items-center gap-3 rounded-xl border border-[#FECDCA] bg-[#FFFBFA] p-3.5"
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FEF3F2] text-xs font-extrabold text-[#B42318]"
                    aria-hidden="true"
                  >
                    !
                  </span>

                  <span className="text-sm font-semibold text-[#344054]">
                    {document}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Next step */}
      <div
        className={`border-t p-5 sm:p-7 ${
          needsAction
            ? "border-[#FEDF89] bg-[#FFFCF5]"
            : "border-[#E4E7EC] bg-[#F8FAFC]"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
              needsAction
                ? "bg-[#FFFAEB] text-[#B54708]"
                : "bg-white text-[#475467]"
            }`}
            aria-hidden="true"
          >
            →
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#667085]">
              What happens next
            </p>

            <h3 className="mt-2 text-base font-extrabold text-[#101828]">
              {config.nextStep}
            </h3>

            {needsAction && onAction && (
              <button
                type="button"
                onClick={onAction}
                className="primary-button mt-5 sm:w-auto"
              >
                Continue
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}