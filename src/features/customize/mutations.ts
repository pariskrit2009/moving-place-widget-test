import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitCustomization, updateCustomization, deleteCustomization } from "./api";
import type { CustomizeFormData } from "./schema";

export function useSubmitCustomization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitCustomization,
    onSuccess: (data) => {
      queryClient.setQueryData(["quotes", "detail", data.updatedQuote.id], data.updatedQuote);
    },
  });
}

export function useUpdateCustomization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CustomizeFormData> }) =>
      updateCustomization(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
}

export function useDeleteCustomization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
}