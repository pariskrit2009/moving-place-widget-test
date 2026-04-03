import { Controller } from "react-hook-form";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import StickyFooter from "@/components/layout/StickyFooter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import FormSection from "@/components/form/FormSection";
import { DatePickerInput } from "@/components/form/DatePickerInput";
import { LocationSearchInput } from "@/components/form/LocationSearchInput";
import { useLocationsForm } from "@/features/search";
import { useProvidersList } from "@/features/search/queries";

export default function SearchPage() {
  const { navigateWithParams } = useNavigateWithParams();
  useProvidersList();

  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    control,
  } = useLocationsForm();

  const hasDifferentDates = watch("hasDifferentDates");
  const onSubmit = async () => {
    try {
      navigateWithParams("/location");
    } catch (error) {
      console.error("Failed to submit locations:", error);
    }
  };

  return (
    <WidgetLayout>
      <FormSection
        title="Enter Move Details"
        description="Provide the locations and date for your move to get started"
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-4 min-[600px]:flex-row min-[600px]:items-end">
            <div className="flex-1">
              <LocationSearchInput
                control={control}
                name="startLocation"
                label="Start Location"
                id="startLocation"
                placeholder="Enter starting address"
                error={errors.startLocation?.message}
              />
            </div>

            <div className="flex-1">
              <LocationSearchInput
                control={control}
                name="endLocation"
                label="End Location"
                id="endLocation"
                placeholder="Enter destination address"
                error={errors.endLocation?.message}
              />
            </div>
            {!hasDifferentDates && (
              <div className="flex-1">
                <DatePickerInput
                  id="movingDate"
                  name="movingDate"
                  label="Moving Date"
                  control={control}
                  error={errors.movingDate?.message}
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="hasDifferentDates"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="hasDifferentDates"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="hasDifferentDates" className="cursor-pointer">
              I have different dates for loading and unloading
            </Label>
          </div>

          <div className="flex flex-col gap-4 min-[600px]:flex-row min-[600px]:items-end">
            {hasDifferentDates && (
              <>
                <div className="flex-1">
                  <DatePickerInput
                    id="loadingDate"
                    name="loadingDate"
                    label="Loading Date"
                    control={control}
                    error={errors.loadingDate?.message}
                  />
                </div>

                <div className="flex-1">
                  <DatePickerInput
                    id="unloadingDate"
                    name="unloadingDate"
                    label="Unloading Date"
                    control={control}
                    error={errors.unloadingDate?.message}
                    minDate={
                      watch("loadingDate")
                        ? new Date(watch("loadingDate"))
                        : undefined
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </FormSection>

      <StickyFooter>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? "Loading..." : "Find Movers"}
        </Button>
      </StickyFooter>
    </WidgetLayout>
  );
}
