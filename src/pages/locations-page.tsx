import { Controller } from "react-hook-form";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import StickyFooter from "@/components/layout/StickyFooter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import FieldError from "@/components/form/FieldError";
import FormSection from "@/components/form/FormSection";
import type { LocationsFormData } from "@/features/locations/schema";
import { useLocationsForm } from "@/features/locations/hooks";
import { useSubmitLocations } from "@/features/locations/hooks";
import { Input } from "@/components/ui/input";

export default function LocationsPage() {
  const { navigateWithParams } = useNavigateWithParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    control,
  } = useLocationsForm();
  const submitLocations = useSubmitLocations();

  const hasDifferentDates = watch("hasDifferentDates");
  const onSubmit = async (data: LocationsFormData) => {
    try {
      // await submitLocations.mutateAsync(data);
      navigateWithParams("/quote");
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
              <Label htmlFor="startLocation">Start Location</Label>
              <Input
                id="startLocation"
                placeholder="Enter starting address"
                {...register("startLocation")}
              />
              <FieldError message={errors.startLocation?.message} />
            </div>

            <div className="flex-1">
              <Label htmlFor="endLocation">End Location</Label>
              <Input
                id="endLocation"
                placeholder="Enter destination address"
                {...register("endLocation")}
              />
              <FieldError message={errors.endLocation?.message} />
            </div>
            {!hasDifferentDates && (
              <div className="flex-1">
                <Label htmlFor="movingDate">Moving Date</Label>
                <Input
                  id="movingDate"
                  type="date"
                  {...register("movingDate")}
                />
                <FieldError message={errors.movingDate?.message} />
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
                  <Label htmlFor="loadingDate">Loading Date</Label>
                  <Input
                    id="loadingDate"
                    type="date"
                    {...register("loadingDate")}
                  />
                  <FieldError message={errors.loadingDate?.message} />
                </div>

                <div className="flex-1">
                  <Label htmlFor="unloadingDate">Unloading Date</Label>
                  <Input
                    id="unloadingDate"
                    type="date"
                    {...register("unloadingDate")}
                  />
                  <FieldError message={errors.unloadingDate?.message} />
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
