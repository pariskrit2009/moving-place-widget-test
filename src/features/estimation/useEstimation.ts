import { useMutation } from "@tanstack/react-query";
import { getEstimation } from "./api";
import type { EstimationRequest, EstimationResponse } from "./types";
import { useWidgetStore } from "@/store";

export function useEstimation() {
  const setEstimation = useWidgetStore((s) => s.setEstimation);
  return useMutation<EstimationResponse, Error, EstimationRequest>({
    mutationFn: getEstimation,
    onSuccess: (data) => {
      setEstimation(data);
    },
  });
}
