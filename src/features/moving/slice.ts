import type { StateCreator } from "zustand";
import type { MovingDateFormData } from "./schema";

export interface MovingSlice {
  movingDateData: MovingDateFormData | null;
  setMovingDateData: (data: MovingDateFormData) => void;
  resetMovingDate: () => void;
}

export const createMovingSlice: StateCreator<MovingSlice, [], [], MovingSlice> = (set) => ({
  movingDateData: null,
  setMovingDateData: (data) => set({ movingDateData: data }),
  resetMovingDate: () => set({ movingDateData: null }),
});
