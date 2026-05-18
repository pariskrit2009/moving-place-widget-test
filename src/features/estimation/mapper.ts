import type { EstimationRequest } from "./types";
import type { LocationsFormData } from "@/features/locations/schema";
import type { LocationsFormData as SearchFormData } from "@/features/search/schema";

interface EstimationInput {
  search: SearchFormData | null;
  locations: LocationsFormData | null;
}

function parseBedroomCount(value: string): number {
  if (!value) return 0;
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function mapToEstimationRequest(
  input: EstimationInput,
): EstimationRequest | null {
  const { search, locations } = input;

  if (!search || !locations) return null;

  // const originZip = extractZip(search.startLocation ?? "");
  // const destinationZip = extractZip(search.endLocation ?? "");

  const originZip = search.startLocation;
  const destinationZip = search.endLocation;

  if (!originZip || !destinationZip) return null;

  return {
    originZip: "89109",
    destinationZip: "94551",
    originAddressType: locations.loadingPropertyType,
    originBedroomCount: parseBedroomCount(locations.loadingDetails.bedrooms),
  };
}
