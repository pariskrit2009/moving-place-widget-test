import type { StateCreator } from "zustand";
import type { LocationsFormData } from "./schema";

export interface SearchSlice {
  search: LocationsFormData | null;
  setSearch: (data: LocationsFormData) => void;
  resetSearch: () => void;
}

export const createSearchSlice: StateCreator<SearchSlice, [], [], SearchSlice> = (set) => ({
  search: null,
  setSearch: (data) => set({ search: data }),
  resetSearch: () => set({ search: null }),
});
