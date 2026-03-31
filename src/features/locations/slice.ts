import type { StateCreator } from "zustand";
import type { LocationsFormData } from "./schema";

export interface LocationsSlice {
  locations: LocationsFormData | null;
  setLocations: (data: LocationsFormData) => void;
  resetLocations: () => void;
}

export const createLocationsSlice: StateCreator<LocationsSlice, [], [], LocationsSlice> = (set) => ({
  locations: null,
  setLocations: (data) => set({ locations: data }),
  resetLocations: () => set({ locations: null }),
});
