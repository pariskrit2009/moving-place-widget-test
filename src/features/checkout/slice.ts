import type { StateCreator } from "zustand";
import type { CheckoutFormData } from "./schema";

export interface CheckoutSlice {
  checkout: CheckoutFormData | null;
  setCheckout: (data: CheckoutFormData) => void;
  resetCheckout: () => void;
}

export const createCheckoutSlice: StateCreator<CheckoutSlice, [], [], CheckoutSlice> = (set) => ({
  checkout: null,
  setCheckout: (data) => set({ checkout: data }),
  resetCheckout: () => set({ checkout: null }),
});
