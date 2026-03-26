import { useQuery } from "@tanstack/react-query";
import { getBookingSummary } from "./api";

export function useBookingSummary(bookingId: string) {
  return useQuery({
    queryKey: ["booking", "summary", bookingId],
    queryFn: () => getBookingSummary(bookingId),
    enabled: !!bookingId,
  });
}