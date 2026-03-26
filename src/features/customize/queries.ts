import { useQuery } from "@tanstack/react-query";
import { fetchAvailableServices } from "./api";

export function useAvailableServices(quoteId: string) {
  return useQuery({
    queryKey: ["services", "available", quoteId],
    queryFn: () => fetchAvailableServices(quoteId),
    enabled: !!quoteId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}