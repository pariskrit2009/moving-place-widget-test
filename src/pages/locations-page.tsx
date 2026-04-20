import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { ArrowLeft, Package, Dumbbell, Info } from "lucide-react";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import StickyFooter from "@/components/layout/StickyFooter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FieldError from "@/components/form/FieldError";
import { useLocationsForm, type LocationsFormData } from "@/features/locations";
import { useWidgetStore } from "@/store";

const PROPERTY_OPTIONS = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment / Condo" },
  { value: "storage", label: "Storage Unit" },
] as const;

export default function LocationsPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const locations = useWidgetStore((s) => s.locations);
  const setLocations = useWidgetStore((s) => s.setLocations);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useLocationsForm(locations ?? undefined);

  useEffect(() => {
    const subscription = watch((values) => {
      setLocations(values as LocationsFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, setLocations]);

  const onSubmit = async () => {
    try {
      navigateWithParams("/quote");
    } catch (error) {
      console.error("Failed to submit locations:", error);
    }
  };

  return (
    <WidgetLayout>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#2e343e]">
              Tell us more about your move
            </h2>
            <p className="text-sm font-normal text-[#677890]">
              This helps us give you more accurate quotes
            </p>
          </div>

          {/* Loading location */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#2e343e]">
              Loading location
            </Label>
            <div>
              <Label
                htmlFor="loadingPropertyType"
                className="text-sm text-[#2e343e]"
              >
                Property type <span className="text-red-500">*</span>
              </Label>
              <Controller
                control={control}
                name="loadingPropertyType"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="min-h-12 rounded-lg border-[#b1bbc8] text-base text-[#2e343e]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.loadingPropertyType?.message} />
            </div>
          </div>

          {/* Unloading location */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#2e343e]">
              Unloading location
            </Label>
            <div>
              <Label
                htmlFor="unloadingPropertyType"
                className="text-sm text-[#2e343e]"
              >
                Property type <span className="text-red-500">*</span>
              </Label>
              <Controller
                control={control}
                name="unloadingPropertyType"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="min-h-12 rounded-lg border-[#b1bbc8] text-base text-[#2e343e]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.unloadingPropertyType?.message} />
            </div>
          </div>

          {/* Extras */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-[#2e343e]">
              Extras
            </Label>

            <div className="flex items-center gap-3 rounded-lg border border-[#e5e7eb] p-4">
              <Controller
                name="needsPacking"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="needsPacking"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1 data-[state=checked]:bg-[#3799a3] data-[state=checked]:border-[#3799a3]"
                  />
                )}
              />
              <div className="flex items-center gap-3 flex-1">
                <Package className="h-6 w-6 shrink-0 text-[#3799a3]" />
                <div>
                  <Label
                    htmlFor="needsPacking"
                    className="cursor-pointer text-sm font-semibold text-[#2e343e]"
                  >
                    I need help packing
                  </Label>
                  <p className="text-sm font-normal text-[#677890] mt-0.5">
                    Help boxing up your kitchen, wardrobe, or entire home.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-[#e5e7eb] p-4">
              <Controller
                name="needsHeavyItems"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="needsHeavyItems"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1 data-[state=checked]:bg-[#3799a3] data-[state=checked]:border-[#3799a3]"
                  />
                )}
              />
              <div className="flex items-center gap-3 flex-1">
                <Dumbbell className="h-6 w-6 shrink-0 text-[#3799a3]" />
                <div>
                  <Label
                    htmlFor="needsHeavyItems"
                    className="cursor-pointer text-sm font-semibold text-[#2e343e]"
                  >
                    I need to move heavy items
                  </Label>
                  <p className="text-sm font-normal text-[#677890] mt-0.5">
                    Pianos, disassembled pool tables (no slate), or large items
                    that take a few people to lift
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="mt-1 shrink-0"
                aria-label="Info about heavy items"
              >
                <Info className="h-4 w-4 text-[#3799a3]" />
              </button>
            </div>
          </div>
        </div>

        <StickyFooter>
          <div className="flex justify-between gap-3 w-full">
            <Button
              variant="link"
              onClick={() => navigateWithParams("/")}
              className=" h-12 rounded-full border-transparent text-[#2e343e]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              variant="cta"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="h-12"
            >
              {isSubmitting ? "Loading..." : "Continue"}
            </Button>
          </div>
        </StickyFooter>
      </div>
    </WidgetLayout>
  );
}
