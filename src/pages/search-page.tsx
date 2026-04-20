import { useEffect } from "react";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import StickyFooter from "@/components/layout/StickyFooter";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { LocationSearchInput } from "@/components/form/LocationSearchInput";
import { useLocationsForm, type LocationsFormData } from "@/features/search";
import { useWidgetStore } from "@/store";
export default function SearchPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const search = useWidgetStore((s) => s.search);
  const setSearch = useWidgetStore((s) => s.setSearch);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useLocationsForm(search ?? undefined);

  // Persist form values to store on every change
  useEffect(() => {
    const subscription = watch((values) => {
      setSearch(values as LocationsFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, setSearch]);

  const onSubmit = async () => {
    try {
      navigateWithParams("/location");
    } catch (error) {
      console.error("Failed to submit locations:", error);
    }
  };

  return (
    <WidgetLayout>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#2e343e]">
              Location Details
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <LocationSearchInput
                control={control}
                name="startLocation"
                label="Loading address"
                id="startLocation"
                placeholder="Zip code or street address"
                error={errors.startLocation?.message}
              />

              <LocationSearchInput
                control={control}
                name="endLocation"
                label="Unloading address"
                id="endLocation"
                placeholder="Zip code or street address"
                error={errors.endLocation?.message}
              />
            </div>

            <div className="rounded-2xl border border-[#2d6671] bg-[#f1faf9] px-3 py-4">
              <div className="flex items-center gap-3">
                <Icon
                  name="info"
                  size={20}
                  className="shrink-0 text-[#2d6671] mt-0.5"
                />
                <p className="text-sm font-normal leading-relaxed text-[#677890]">
                  For a full move, please provide both locations. If you only
                  need help with loading or unloading, just enter the relevant
                  address. We&apos;ll match you with the right type of movers.
                </p>
              </div>
            </div>
          </div>
        </div>

        <StickyFooter className="px-0 self-end">
          <Button
            type="submit"
            variant="cta"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="h-12 self-end"
          >
            {isSubmitting ? "Loading..." : "Continue"}
          </Button>
        </StickyFooter>
      </div>
    </WidgetLayout>
  );
}
