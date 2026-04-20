import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationsSchema, type LocationsFormData } from "./schema";

const DEFAULT_VALUES: LocationsFormData = {
  loadingPropertyType: undefined as unknown as LocationsFormData["loadingPropertyType"],
  unloadingPropertyType: undefined as unknown as LocationsFormData["unloadingPropertyType"],
  needsPacking: false,
  needsHeavyItems: false,
};

export function useLocationsForm(defaultValues?: LocationsFormData) {
  return useForm<LocationsFormData>({
    resolver: zodResolver(locationsSchema),
    defaultValues: defaultValues ?? DEFAULT_VALUES,
  });
}
