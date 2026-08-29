export type VehicleType = "TWO_WHEELER" | "FOUR_WHEELER";

export type JourneyStep =
  | "SELLER_INITIATION"
  | "BUYER_CONFIRMATION"
  | "DOCUMENTS"
  | "PAYMENT"
  | "VERIFICATION"
  | "UNDER_VERIFICATION"
  | "COMPLETED";

export type ApplicationStatus =
  | "SUBMITTED"
  | "UNDER_VERIFICATION"
  | "DOCUMENT_REQUIRED"
  | "PAYMENT_PENDING"
  | "APPROVED"
  | "COMPLETED";

export interface Vehicle {
  registrationNumber: string;
  vehicleName: string;
  vehicleType: VehicleType;
  sellerName: string;
  buyerName: string;
}

export interface JourneyResponse {
  journey_id: string;
  current_step: JourneyStep;
  next_action: string;
  progress: number;
  steps: JourneyStep[];
  role: string;
  vehicle_type: VehicleType;
}

export interface StatusResponse {
  id: string;
  status: ApplicationStatus;
  action: string;
  explanation: string;
  missing_documents: string[];
}