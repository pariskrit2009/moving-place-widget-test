import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectQuote, customizeQuote, removeQuote } from "./api";

export function useSelectQuote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: selectQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
}

export function useCustomizeQuote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customizeQuote,
    onSuccess: (data) => {
      queryClient.setQueryData(["quotes", "detail", data.id], data);
      queryClient.invalidateQueries({ queryKey: ["quotes", "list"] });
    },
  });
}

export function useRemoveQuote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
}