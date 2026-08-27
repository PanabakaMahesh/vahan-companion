export type VehicleType = "TWO_WHEELER" | "FOUR_WHEELER";

export type UserRole = "BUYER" | "SELLER";

export type Intent = "OWNERSHIP_TRANSFER";

export type JourneyStep =
  | "SELLER_INITIATION"
  | "BUYER_CONFIRMATION"
  | "DOCUMENTS"
  | "PAYMENT"
  | "VERIFICATION"
  | "COMPLETED";

export type ApplicationStatus =
  | "UNDER_VERIFICATION"
  | "DOCUMENT_REQUIRED"
  | "DELAYED"
  | "COMPLETED";

export type ApplicationAction =
  | "WAIT"
  | "UPLOAD_DOCUMENT"
  | "START_RESOLUTION"
  | "NO_ACTION";

export interface IntentResponse {
  intent: Intent;
  role: UserRole;
  vehicle_type: VehicleType;
}

export interface JourneyResponse {
  journey_id: string;
  current_step: JourneyStep;
  next_action: string;
}

export interface ApplicationResponse {
  id: string;
  status: ApplicationStatus;
  action: ApplicationAction;
  explanation: string;
  missing_documents?: string[];
}

export interface Vehicle {
  registrationNumber: string;
  vehicleName: string;
  vehicleType: VehicleType;
  sellerName: string;
  buyerName: string;
}

export interface JourneyState {
  currentStep: JourneyStep;
  completedSteps: JourneyStep[];
}