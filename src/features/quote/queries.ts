import { useQuery } from "@tanstack/react-query";
import { fetchQuotes } from "./api";
import { get } from "@/lib/api/client";
import type { MoverQuote } from "./schema";
import type { QuoteParams } from "./api";

export function useQuotes(locationsParams: QuoteParams['locations']) {
  return useQuery({
    queryKey: ["quotes", "list", locationsParams],
    queryFn: () => fetchQuotes({ locations: locationsParams || {} }),
    enabled: !!locationsParams?.startLocation && !!locationsParams?.endLocation,
  });
}

export function useQuoteDetails(quoteId: string) {
  return useQuery({
    queryKey: ["quotes", "detail", quoteId],
    queryFn: () => get<MoverQuote>(`/quotes/${quoteId}`),
    enabled: !!quoteId,
  });
}