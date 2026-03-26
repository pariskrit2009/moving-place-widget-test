import { useMutation } from "@tanstack/react-query";
import { submitLocations } from "./api";

export function useSubmitLocations() {
  return useMutation({
    mutationFn: submitLocations,
    onSuccess: () => {
      // Invalidate related queries if needed
      // queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
}