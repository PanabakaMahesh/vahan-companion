"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import StatusCard from "../../components/StatusCard";

import { ROUTES } from "../../constants/routes";
import type { StatusResponse } from "../../lib/types";

const demoApplications: Record<string, StatusResponse> = {
  "DEMO-VH-1001": {
    id: "DEMO-VH-1001",
    status: "UNDER_VERIFICATION",
    action: "Wait for verification to finish",
    explanation:
      "Your application has been submitted successfully. The details are now being checked. You don't need to upload anything or make another payment right now.",
    missing_documents: [],
  },

  "DEMO-VH-1002": {
    id: "DEMO-VH-1002",
    status: "DOCUMENT_REQUIRED",
    action: "Upload the missing transfer document",
    explanation:
      "Your application cannot move forward yet because one required document has not been provided.",
    missing_documents: ["Transfer document"],
  },

  "DEMO-VH-1003": {
    id: "DEMO-VH-1003",
    status: "PAYMENT_PENDING",
    action: "Complete the application fee",
    explanation:
      "Your application has been prepared, but the application fee has not been completed yet.",
    missing_documents: [],
  },

  "DEMO-VH-1004": {
    id: "DEMO-VH-1004",
    status: "COMPLETED",
    action: "No action required",
    explanation:
      "The ownership transfer has been completed successfully. The application no longer needs any action from you.",
    missing_documents: [],
  },
};

export default function StatusPage() {
  const router = useRouter();

  const [applicationId, setApplicationId] = useState("");
  const [application, setApplication] =
    useState<StatusResponse | null>(null);
  const [searched, setSearched] = useState(false);

  function handleBack() {
    router.back();
  }

  function checkStatus(id?: string) {
    const value = (id ?? applicationId).trim().toUpperCase();

    if (!value) {
      return;
    }

    const result = demoApplications[value];

    setApplication(result ?? null);
    setApplicationId(value);
    setSearched(true);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
      checkStatus(id);
    }
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    checkStatus();
  }

  return (
    <div className="page-shell">
      <Header />

      <main className="container py-8 sm:py-12">
        <div className="mb-8">
          <BackButton onClick={handleBack} />

          <div className="mt-5 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#155EEF]">
              Application status
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101828] sm:text-4xl">
              Don't just see your status. Understand it.
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#667085] sm:text-base">
              Enter your application ID and we'll explain what the status
              means, whether you need to do anything, and what happens next.
            </p>
          </div>
        </div>

        {/* rest of your existing page */}

        <div className="mx-auto max-w-4xl">
          {/* Search */}
          <section className="service-card p-5 sm:p-7">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="application-id"
                className="block text-sm font-bold text-[#101828]"
              >
                Application ID
              </label>

              <p className="mt-1 text-xs leading-5 text-[#667085]">
                Use one of the demo IDs below. No real government application
                is accessed.
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  id="application-id"
                  value={applicationId}
                  onChange={(event) =>
                    setApplicationId(event.target.value)
                  }
                  placeholder="Example: DEMO-VH-1002"
                  className="min-h-12 flex-1 rounded-xl border border-[#D0D5DD] bg-white px-4 text-sm font-medium text-[#101828] outline-none transition placeholder:text-[#98A2B3] focus:border-[#155EEF] focus:ring-4 focus:ring-[#155EEF]/10"
                />

                <button
                  type="submit"
                  disabled={!applicationId.trim()}
                  className="primary-button sm:w-auto disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Check status
                  <span>→</span>
                </button>
              </div>
            </form>

            {/* Demo IDs */}
            <div className="mt-6 border-t border-[#E4E7EC] pt-5">
              <p className="text-xs font-bold text-[#475467]">
                Try a demo application
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {Object.keys(demoApplications).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => checkStatus(id)}
                    className="rounded-full border border-[#D0D5DD] bg-white px-3 py-2 font-mono text-xs font-semibold text-[#475467] transition hover:border-[#155EEF] hover:bg-[#F5F8FF] hover:text-[#155EEF]"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Result */}
          {searched && application && (
            <div className="mt-6">
              <StatusCard
                application={application}
                onAction={() => {
                  if (
                    application.status === "DOCUMENT_REQUIRED"
                  ) {
                    window.location.href = ROUTES.JOURNEY;
                  }
                }}
              />
            </div>
          )}

          {/* Not found */}
          {searched && !application && (
            <section className="mt-6 rounded-2xl border border-[#FEDF89] bg-[#FFFCF5] p-5 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFFAEB] font-bold text-[#B54708]">
                  ?
                </div>

                <div>
                  <h2 className="text-lg font-extrabold text-[#101828]">
                    We couldn't find that demo application
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#667085]">
                    Check the application ID and try again. For this prototype,
                    use one of the demo IDs shown above.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Explanation */}
          {!searched && (
            <section className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="service-card p-5">
                <div className="text-2xl">1</div>

                <h2 className="mt-3 text-sm font-extrabold text-[#101828]">
                  Enter your ID
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#667085]">
                  No complicated menus or service names.
                </p>
              </div>

              <div className="service-card p-5">
                <div className="text-2xl">2</div>

                <h2 className="mt-3 text-sm font-extrabold text-[#101828]">
                  Understand the status
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#667085]">
                  We translate the status into plain language.
                </p>
              </div>

              <div className="service-card p-5">
                <div className="text-2xl">3</div>

                <h2 className="mt-3 text-sm font-extrabold text-[#101828]">
                  Know what to do
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#667085]">
                  Get one clear next action instead of guessing.
                </p>
              </div>
            </section>
          )}
        </div>

        <footer className="mx-auto mt-10 max-w-4xl border-t border-[#E4E7EC] pt-6 text-center">
          <p className="text-xs leading-5 text-[#98A2B3]">
            Independent prototype • Synthetic demo data • No live government
            systems are accessed
          </p>
        </footer>
      </main>
    </div>
  );
}