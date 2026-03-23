import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationsSchema, type LocationsFormData } from "./schema";

export function useLocationsForm() {
  const form = useForm<LocationsFormData>({
    resolver: zodResolver(locationsSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
      movingDate: "",
    },
  });

  return form;
}
