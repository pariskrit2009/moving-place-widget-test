import { get, post, put } from "@/lib/api/client";
import type { CheckoutFormData, BookingData } from "./schema";

// API functions for checkout feature
export async function validateBooking(data: CheckoutFormData) {
  return post<{ valid: boolean; errors?: Record<string, string> }>('/booking/validate', data);
}

export async function submitBooking(data: BookingData) {
  return post<{ success: boolean; bookingId: string }>('/booking', data);
}

export async function updateBooking(bookingId: string, data: Partial<BookingData>) {
  return put(`/booking/${bookingId}`, data);
}

export async function getBookingSummary(bookingId: string) {
  return get<BookingData>(`/booking/${bookingId}/summary`);
}