import { useMutation, useQueryClient } from "@tanstack/react-query";
import { validateBooking, submitBooking, updateBooking } from "./api";
import type { BookingData } from "./schema";

export function useValidateBooking() {
  return useMutation({
    mutationFn: validateBooking,
  });
}

export function useSubmitBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitBooking,
    onSuccess: () => {
      // Clear quote data after successful booking
      queryClient.clear();
    },
  });
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BookingData> }) =>
      updateBooking(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });
}