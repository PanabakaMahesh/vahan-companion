"use client";

import { useState } from "react";

interface DocumentCardProps {
  onComplete: () => void;
}

const documents = [
  {
    name: "Vehicle information",
    description: "Basic vehicle details",
    status: "verified",
  },
  {
    name: "Insurance",
    description: "Current insurance details",
    status: "verified",
  },
  {
    name: "Transfer document",
    description: "Required for ownership transfer",
    status: "required",
  },
];

export default function DocumentCard({
  onComplete,
}: DocumentCardProps) {
  const [accepted, setAccepted] = useState(false);

  function handleDemoDocument() {
    setAccepted(true);
  }

  return (
    <section className="service-card p-5 sm:p-7">
      {/* Heading */}
      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#155EEF]">
          Step 3 of 4
        </p>

        <h2 className="mt-1 text-xl font-extrabold text-[#101828] sm:text-2xl">
          Check your documents
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
          Make sure the documents needed for the ownership transfer are ready.
          We will clearly show anything that still needs your attention.
        </p>
      </div>

      {/* Document checklist */}
      <div className="mt-6">
        <p className="text-sm font-extrabold text-[#101828]">
          Document checklist
        </p>

        <div className="mt-3 space-y-3">
          {documents.map((document) => {
            const isAccepted =
              document.status === "verified" ||
              (document.name === "Transfer document" && accepted);

            return (
              <div
                key={document.name}
                className={`flex items-center gap-4 rounded-xl border p-4 ${
                  isAccepted
                    ? "border-[#D1FADF] bg-[#FCFDFD]"
                    : "border-[#FEDF89] bg-[#FFFCF5]"
                }`}
              >
                {/* Status icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                    isAccepted
                      ? "bg-[#ECFDF3] text-[#067647]"
                      : "bg-[#FFFAEB] text-[#B54708]"
                  }`}
                  aria-hidden="true"
                >
                  {isAccepted ? "✓" : "!"}
                </div>

                {/* Document details */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#101828]">
                    {document.name}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#667085]">
                    {document.description}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`hidden rounded-full px-3 py-1 text-xs font-bold sm:inline-flex ${
                    isAccepted
                      ? "bg-[#ECFDF3] text-[#067647]"
                      : "bg-[#FFFAEB] text-[#B54708]"
                  }`}
                >
                  {isAccepted ? "Ready" : "Required"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action area */}
      {!accepted ? (
        <div className="mt-6 rounded-2xl border border-[#FEDF89] bg-[#FFFCF5] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFFAEB] text-sm font-extrabold text-[#B54708]"
              aria-hidden="true"
            >
              !
            </div>

            <div>
              <p className="text-sm font-bold text-[#101828]">
                One document needs your attention
              </p>

              <p className="mt-1 text-xs leading-5 text-[#667085]">
                The transfer document is required to continue. This prototype
                uses a demo document, so no real document will be uploaded.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDemoDocument}
            className="secondary-button mt-4 sm:w-auto"
          >
            Use demo document
          </button>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-[#ABEFC6] bg-[#F6FEF9] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ECFDF3] text-sm font-extrabold text-[#067647]"
              aria-hidden="true"
            >
              ✓
            </div>

            <div>
              <p className="text-sm font-bold text-[#067647]">
                All required documents are ready
              </p>

              <p className="mt-1 text-xs leading-5 text-[#475467]">
                You can now continue to the application fee.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onComplete}
            className="primary-button mt-4 sm:w-auto"
          >
            Continue to payment
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </section>
  );
}