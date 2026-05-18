import type { StateCreator } from "zustand";
import type { EstimationResponse } from "./types";

export interface EstimationSlice {
  estimation: EstimationResponse | null;
  setEstimation: (data: EstimationResponse) => void;
  resetEstimation: () => void;
}

export const createEstimationSlice: StateCreator<
  EstimationSlice,
  [],
  [],
  EstimationSlice
> = (set) => ({
  estimation: null,
  setEstimation: (data) => set({ estimation: data }),
  resetEstimation: () => set({ estimation: null }),
});
