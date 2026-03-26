import { get, post, put, del } from "@/lib/api/client";
import type { CustomizeFormData } from "./schema";
import type { MoverQuote } from "@/features/quote/schema";

export interface ServiceSelection {
  id: string;
  label: string;
  price: number;
}

// API functions for customize feature
export async function fetchAvailableServices(quoteId: string) {
  return get<ServiceSelection[]>(`/quotes/${quoteId}/services`);
}

export async function submitCustomization(data: CustomizeFormData) {
  return post<{ success: boolean; updatedQuote: MoverQuote }>('/customization', data);
}

export async function updateCustomization(customizationId: string, data: Partial<CustomizeFormData>) {
  return put(`/customization/${customizationId}`, data);
}

export async function deleteCustomization(customizationId: string) {
  return del<{ success: boolean }>(`/customization/${customizationId}`);
}