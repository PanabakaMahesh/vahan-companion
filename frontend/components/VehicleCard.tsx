"use client";

import type { Vehicle } from "../lib/types";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const vehicleType =
    vehicle.vehicleType === "TWO_WHEELER"
      ? "Two-wheeler"
      : "Four-wheeler";

  return (
    <section className="service-card p-5 sm:p-7">
      {/* Vehicle heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#667085]">
            Vehicle details
          </p>

          <h2 className="mt-1 text-xl font-extrabold text-[#101828] sm:text-2xl">
            {vehicle.vehicleName}
          </h2>

          <p className="mt-1 text-sm text-[#667085]">
            {vehicleType}
          </p>
        </div>

        {/* Registration number */}
        <div className="w-fit rounded-lg border border-[#D0D5DD] bg-[#F8FAFC] px-3.5 py-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">
            Registration number
          </p>

          <p className="mt-0.5 font-mono text-sm font-bold tracking-wide text-[#101828]">
            {vehicle.registrationNumber}
          </p>
        </div>
      </div>

      {/* Buyer and seller */}
      <div className="mt-6 grid gap-4 border-t border-[#E4E7EC] pt-5 sm:grid-cols-2">
        <div className="rounded-xl border border-[#E4E7EC] bg-white p-4">
          <p className="text-xs font-bold text-[#667085]">
            Seller
          </p>

          <p className="mt-1 text-sm font-bold text-[#101828]">
            {vehicle.sellerName}
          </p>
        </div>

        <div className="rounded-xl border border-[#E4E7EC] bg-white p-4">
          <p className="text-xs font-bold text-[#667085]">
            Buyer
          </p>

          <p className="mt-1 text-sm font-bold text-[#101828]">
            {vehicle.buyerName}
          </p>
        </div>
      </div>

      {/* Prototype notice */}
      <div className="mt-5 rounded-xl border border-[#E4E7EC] bg-[#F8FAFC] p-4">
        <p className="text-xs font-bold text-[#475467]">
          About this information
        </p>

        <p className="mt-1 text-xs leading-5 text-[#667085]">
          This prototype uses synthetic vehicle details. No real
          registration data is accessed.
        </p>
      </div>
    </section>
  );
}