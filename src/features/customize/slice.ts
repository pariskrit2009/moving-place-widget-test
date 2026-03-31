import type { StateCreator } from "zustand";
import type { CustomizeFormData } from "./schema";

export interface CustomizeSlice {
  customization: CustomizeFormData | null;
  setCustomization: (data: CustomizeFormData) => void;
  resetCustomize: () => void;
}

export const createCustomizeSlice: StateCreator<CustomizeSlice, [], [], CustomizeSlice> = (set) => ({
  customization: null,
  setCustomization: (data) => set({ customization: data }),
  resetCustomize: () => set({ customization: null }),
});
