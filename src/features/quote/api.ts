import { get, post, put, del } from "@/lib/api/client";
import type { MoverQuote } from "./schema";

export interface QuoteParams {
  locations: {
    startLocation: string;
    endLocation: string;
    movingDate: string;
  };
}

// API functions for quote feature
export async function fetchQuotes(params: QuoteParams) {
  return get<MoverQuote[]>('/quotes', { params });
}

export async function selectQuote(quoteId: string) {
  return post<{ success: boolean }>('/quotes/select', { quoteId });
}

export async function customizeQuote(data: { quoteId: string; [key: string]: unknown }) {
  return put<MoverQuote>(`/quotes/${data.quoteId}`, data);
}

export async function removeQuote(quoteId: string) {
  return del<{ success: boolean }>(`/quotes/${quoteId}`);
}