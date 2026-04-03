import { get, post } from "@/lib/api/client";
import type { LocationsFormData } from "./schema";
import type { PlaceSearchResponse } from "./types";

// API functions for locations feature
export async function submitLocations(data: LocationsFormData) {
  return post("/quotes", data);
}

export async function getLocationsHistory() {
  return get("/service-providers/helper-list");
}

export async function searchPlaces(query: string) {
  return get<PlaceSearchResponse>("/places/autocomplete", {
    params: { q: query },
  });
}
