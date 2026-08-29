import type {
    JourneyResponse,
    StatusResponse,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    let message = `API request failed with status ${response.status}`;

    try {
      const errorData = await response.json();

      if (typeof errorData?.detail === "string") {
        message = errorData.detail;
      }
    } catch {
      // Keep the default error message.
    }

    throw new Error(message);
  }

  return response.json();
}

export interface IntentResponse {
  intent: string;
  role: string;
  vehicle_type: "TWO_WHEELER" | "FOUR_WHEELER";
}

export interface DocumentsResponse {
  documents: {
    name: string;
    required: boolean;
    uploaded: boolean;
  }[];
}

export interface CreateJourneyRequest {
  intent: string;
  role: string;
  vehicle_type: "TWO_WHEELER" | "FOUR_WHEELER";
}

export async function detectIntent(
  message: string
): Promise<IntentResponse> {
  return apiRequest<IntentResponse>("/api/intent", {
    method: "POST",
    body: JSON.stringify({
      message,
    }),
  });
}

export async function createJourney(
  data: CreateJourneyRequest
): Promise<JourneyResponse> {
  return apiRequest<JourneyResponse>("/api/journey", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getApplication(
  applicationId: string
): Promise<StatusResponse> {
  return apiRequest<StatusResponse>(
    `/api/applications/${encodeURIComponent(applicationId)}`
  );
}

export async function getDocuments(): Promise<DocumentsResponse> {
  return apiRequest<DocumentsResponse>("/api/documents");
}

export async function checkBackendHealth(): Promise<{
  status: string;
  service: string;
  version: string;
}> {
  return apiRequest("/health");
}