import { get, post } from "@/lib/api/client";
import type { LocationsFormData } from "./schema";

// API functions for locations feature
export async function submitLocations(data: LocationsFormData) {
  return post('/quotes', data);
}

export async function getLocationsHistory() {
  return get('/locations/history');
}