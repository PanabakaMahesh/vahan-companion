"use client";

import Link from "next/link";
import { useState } from "react";

import BackButton from "../../components/BackButton";
import ChatInput from "../../components/ChatInput";
import DocumentCard from "../../components/DocumentCard";
import Header from "../../components/Header";
import JourneyProgress from "../../components/JourneyProgress";
import NextActionCard from "../../components/NextActionCard";
import VehicleCard from "../../components/VehicleCard";

import { ROUTES } from "../../constants/routes";
import type { JourneyStep, Vehicle } from "../../lib/types";

type JourneyPhase =
  | "INPUT"
  | "UNDERSTOOD"
  | "SELLER"
  | "BUYER"
  | "DOCUMENTS"
  | "PAYMENT"
  | "SUBMITTED";

const demoVehicle: Vehicle = {
  registrationNumber: "TN-XX-1234",
  vehicleName: "Demo 125",
  vehicleType: "TWO_WHEELER",
  sellerName: "Demo Seller",
  buyerName: "Demo Citizen",
};

function getJourneyStep(phase: JourneyPhase): JourneyStep {
  switch (phase) {
    case "INPUT":
    case "UNDERSTOOD":
      return "SELLER_INITIATION";

    case "SELLER":
      return "BUYER_CONFIRMATION";

    case "BUYER":
      return "DOCUMENTS";

    case "DOCUMENTS":
      return "DOCUMENTS";

    case "PAYMENT":
      return "PAYMENT";

    case "SUBMITTED":
      return "COMPLETED";

    default:
      return "SELLER_INITIATION";
  }
}

export default function JourneyPage() {
  const [phase, setPhase] = useState<JourneyPhase>("INPUT");
  const [userMessage, setUserMessage] = useState("");

  function handleBack() {
  switch (phase) {
    case "UNDERSTOOD":
      setPhase("INPUT");
      break;

    case "SELLER":
      setPhase("UNDERSTOOD");
      break;

    case "BUYER":
      setPhase("SELLER");
      break;

    case "DOCUMENTS":
      setPhase("BUYER");
      break;

    case "PAYMENT":
      setPhase("DOCUMENTS");
      break;

    case "SUBMITTED":
      setPhase("PAYMENT");
      break;

    default:
      window.location.href = ROUTES.HOME;
  }
}

  async function handleUnderstand(message: string) {
  setUserMessage(message);

  try {
    const response = await fetch("http://127.0.0.1:8000/api/intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Intent API failed: ${response.status}`);
    }

    const data = await response.json();

    console.log("Backend intent response:", data);

    setPhase("UNDERSTOOD");
  } catch (error) {
    console.error("Backend connection failed:", error);
  }
}

  function renderJourneyContent() {
    if (phase === "INPUT") {
      return (
        <section className="service-card p-5 sm:p-8">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#155EEF]">
              Step 1
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101828] sm:text-4xl">
              Tell us what happened
            </h1>

            <p className="mt-4 text-sm leading-6 text-[#667085] sm:text-base">
              Don't worry about knowing the official service name. Describe
              your situation in your own words.
            </p>
          </div>

          <div className="mt-8">
            <ChatInput onSubmit={handleUnderstand} />
          </div>
        </section>
      );
    }

    if (phase === "UNDERSTOOD") {
      return (
        <div className="space-y-5">
          <section className="rounded-2xl border border-[#C7D7FE] bg-[#F5F8FF] p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FF] text-xl">
                ✨
              </div>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#155EEF]">
                  We understand
                </p>

                <h2 className="mt-2 text-xl font-extrabold text-[#101828]">
                  You're transferring ownership of a used vehicle.
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#475467]">
                  You are the <strong>buyer</strong> and this appears to be a{" "}
                  <strong>two-wheeler</strong>.
                </p>
              </div>
            </div>
          </section>

          <section className="service-card p-5 sm:p-7">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#667085]">
              What we'll guide you through
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Seller starts the transfer",
                "You confirm the vehicle",
                "Check required documents",
                "Pay the application fee",
                "Application verification",
                "Ownership update",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-extrabold text-[#155EEF] shadow-sm">
                    {index + 1}
                  </span>

                  <span className="text-sm font-semibold text-[#344054]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPhase("SELLER")}
              className="primary-button mt-6 sm:w-auto"
            >
              Show my journey
              <span>→</span>
            </button>
          </section>

          <p className="text-xs text-[#98A2B3]">
            You said: “{userMessage}”
          </p>
        </div>
      );
    }

    if (phase === "SELLER") {
      return (
        <div className="space-y-5">
          <NextActionCard
            title="Ask the seller to start the transfer"
            description="The ownership transfer begins with the current owner. Once the seller initiates it, you can review and confirm the vehicle details."
            actionLabel="I've asked the seller"
            onAction={() => setPhase("BUYER")}
            tone="blue"
          />

          <section className="rounded-2xl border border-[#E4E7EC] bg-white p-5 sm:p-6">
            <p className="text-sm font-bold text-[#101828]">
              Why is this the first step?
            </p>

            <p className="mt-2 text-sm leading-6 text-[#667085]">
              Instead of showing you a long list of forms, we show the one
              action that needs to happen next.
            </p>
          </section>
        </div>
      );
    }

    if (phase === "BUYER") {
      return (
        <div className="space-y-5">
          <div className="rounded-2xl border border-[#ABEFC6] bg-[#F6FEF9] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="text-lg text-[#12B76A]">✓</div>

              <div>
                <p className="text-sm font-extrabold text-[#067647]">
                  Seller initiated the transfer
                </p>

                <p className="mt-1 text-xs leading-5 text-[#475467]">
                  The next step is to confirm that the vehicle details are
                  correct.
                </p>
              </div>
            </div>
          </div>

          <VehicleCard vehicle={demoVehicle} />

          <NextActionCard
            title="Confirm this vehicle"
            description="Review the synthetic vehicle details above. In a real implementation, these details would come from an authorised government service."
            actionLabel="Confirm and continue"
            onAction={() => setPhase("DOCUMENTS")}
            tone="blue"
          />
        </div>
      );
    }

    if (phase === "DOCUMENTS") {
      return (
        <DocumentCard onComplete={() => setPhase("PAYMENT")} />
      );
    }

    if (phase === "PAYMENT") {
      return (
        <div className="space-y-5">
          <section className="service-card p-5 sm:p-7">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#155EEF]">
              Application fee
            </p>

            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-extrabold tracking-tight text-[#101828]">
                  ₹XXX
                </p>

                <p className="mt-2 text-sm text-[#667085]">
                  Simulated application fee
                </p>
              </div>

              <div className="rounded-full bg-[#FFFAEB] px-3 py-1 text-xs font-bold text-[#B54708]">
                Demo payment
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-[#F8FAFC] p-4">
              <p className="text-xs leading-5 text-[#667085]">
                No real money is charged. This payment is simulated using
                synthetic data for the hackathon prototype.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setPhase("SUBMITTED")}
              className="primary-button mt-6 sm:w-auto"
            >
              Pay ₹XXX
              <span>→</span>
            </button>
          </section>
        </div>
      );
    }

    return (
      <section className="overflow-hidden rounded-3xl border border-[#ABEFC6] bg-white">
        <div className="bg-[#F6FEF9] px-5 py-10 text-center sm:px-8 sm:py-14">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#12B76A] text-3xl text-white">
            ✓
          </div>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-widest text-[#067647]">
            Application submitted
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101828] sm:text-4xl">
            You're all set.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#475467]">
            Your ownership-transfer application has been submitted for
            verification.
          </p>
        </div>

        <div className="p-5 sm:p-8">
          <div className="rounded-2xl border border-[#E4E7EC] bg-[#F8FAFC] p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#667085]">
              Application ID
            </p>

            <p className="mt-2 font-mono text-2xl font-extrabold tracking-wide text-[#101828]">
              DEMO-VH-1001
            </p>

            <p className="mt-2 text-xs text-[#667085]">
              Keep this ID to check your application status.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href={`${ROUTES.STATUS}?id=DEMO-VH-1001`}
              className="primary-button"
            >
              Track application
              <span>→</span>
            </Link>

            <Link
              href={ROUTES.HOME}
              className="secondary-button"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="page-shell">
      <Header />

      <main className="container py-8 sm:py-12">
        <div className="mb-8">
          <BackButton onClick={handleBack} />

          <div className="mt-5 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#155EEF]">
              Used vehicle ownership
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101828] sm:text-4xl">
              Transfer the vehicle without the guesswork.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085] sm:text-base">
              We'll turn the process into a clear sequence of actions instead
              of making you figure out which government step comes next.
            </p>
          </div>
        </div>

        {phase !== "INPUT" && (
          <div className="mb-6">
            <JourneyProgress currentStep={getJourneyStep(phase)} />
          </div>
        )}

        <div className="mx-auto max-w-4xl">
          {renderJourneyContent()}
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