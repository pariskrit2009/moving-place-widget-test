import { useQuery, useMutation } from "@tanstack/react-query";
import type { MoverQuote } from "@/features/quote/schema";
import type { LocationsFormData } from "@/features/locations/schema";

const API_BASE_URL = "/api";

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return response.json();
}

export function useQuotes(locations: LocationsFormData) {
  return useQuery({
    queryKey: ["quotes", locations],
    queryFn: async () => {
      // TODO: Replace with actual API endpoint
      return fetcher<MoverQuote[]>(`${API_BASE_URL}/quotes`);
    },
    enabled: false, // Only fetch when explicitly triggered
  });
}

export function useSubmitBooking() {
  return useMutation({
    mutationFn: async (data: unknown) => {
      // TODO: Replace with actual API endpoint
      return fetcher<{ success: boolean }>(`${API_BASE_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
  });
}
