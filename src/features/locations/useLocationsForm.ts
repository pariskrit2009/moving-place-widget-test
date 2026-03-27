import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationsSchema, type LocationsFormData } from "./schema";

export function useLocationsForm() {
  const form = useForm<LocationsFormData>({
    resolver: zodResolver(locationsSchema),
    defaultValues: {
      propertyType: undefined,
      bedrooms: undefined,
      floors: undefined,
      hasHeavyItems: false,
      babyGrandPianos: "0",
      uprightPianos: "0",
      heavyItems300to450: "0",
      heavyItems450to600: "0",
      heavyItemsOver600: "0",
    },
  });

  return form;
}
