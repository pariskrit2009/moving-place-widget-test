import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationsSchema, type LocationsFormData } from "./schema";

export function useLocationsForm() {
  const form = useForm<LocationsFormData>({
    resolver: zodResolver(locationsSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
      hasDifferentDates: false,
      // movingDate: "",
      // loadingDate: "",
      // unloadingDate: "",
    },
  });

  const { watch, getValues, setValue } = form;
  const hasDifferentDates = watch("hasDifferentDates");
  console.log("Random Console Has No Meaning");

  // Handle field synchronization when toggling modes
  useEffect(() => {
    if (hasDifferentDates) {
      // Transition to separate dates mode
      // const currentMovingDate = getValues("movingDate");
      // if (currentMovingDate && !getValues("loadingDate") &&  currentMovingDate) {
      //   setValue("loadingDate", currentMovingDate);
      // }
      setValue("movingDate", "");
    } else {
      // Transition to single date mode
      // const currentLoadingDate = getValues("loadingDate");
      // if (currentLoadingDate && !getValues("movingDate")) {
      //   setValue("movingDate", currentLoadingDate);
      // }
      setValue("loadingDate", "");
      setValue("unloadingDate", "");
    }
  }, [hasDifferentDates, getValues, setValue]);

  return form;
}
