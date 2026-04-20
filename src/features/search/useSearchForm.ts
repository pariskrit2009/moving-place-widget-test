import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationsSchema, type LocationsFormData } from "./schema";

const DEFAULT_VALUES: LocationsFormData = {
  startLocation: "",
  endLocation: "",
  hasDifferentDates: false,
};

export function useLocationsForm(defaultValues?: LocationsFormData) {
  const form = useForm<LocationsFormData>({
    resolver: zodResolver(locationsSchema),
    defaultValues: defaultValues ?? DEFAULT_VALUES,
  });

  const { control, getValues, setValue } = form;
  const hasDifferentDates = useWatch({ control, name: "hasDifferentDates" });

  useEffect(() => {
    if (hasDifferentDates) {
      setValue("movingDate", "");
    } else {
      setValue("loadingDate", "");
      setValue("unloadingDate", "");
    }
  }, [hasDifferentDates, getValues, setValue]);

  return form;
}
