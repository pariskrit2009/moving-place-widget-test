import { useEffect, useState } from "react";
import { Controller, type Control } from "react-hook-form";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { Label } from "@/components/ui/label";
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
import { LabelStackedField } from "@/components/form/LabelStackedField";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";

const PROPERTY_OPTIONS = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment / Condo" },
  { value: "storage", label: "Storage Unit" },
] as const;

const BEDROOM_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5+", label: "5+" },
] as const;

const FLOOR_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3+", label: "3+" },
] as const;

const ELEVATOR_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

interface LocationDetails {
  bedrooms: string;
  floors: string;
  elevator: string;
}

type Option = { readonly value: string; readonly label: string };

function SelectField({
  id,
  label,
  value,
  onValueChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  options: readonly Option[];
}) {
  return (
    <div className="flex-1">
      <LabelStackedField id={id} required label={label}>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger id={id} className="pb-[7px] pt-7">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </LabelStackedField>
    </div>
  );
}

function LocationSection({
  title,
  propertyTypeName,
  control,
  propertyTypeError,
  details,
  setDetails,
  propertyType,
}: {
  title: string;
  propertyTypeName: "loadingPropertyType" | "unloadingPropertyType";
  control: Control<LocationsFormData>;
  propertyTypeError?: string;
  details: LocationDetails;
  setDetails: React.Dispatch<React.SetStateAction<LocationDetails>>;
  propertyType: string | undefined;
}) {
  const showExtraFields =
    propertyType === "house" || propertyType === "apartment";
  const showElevator = propertyType === "apartment";

  // Reset conditional fields when property type changes
  useEffect(() => {
    if (!showExtraFields) {
      setDetails({ bedrooms: "", floors: "", elevator: "" });
    } else if (!showElevator) {
      setDetails((prev) => ({ ...prev, elevator: "" }));
    }
  }, [propertyType, showExtraFields, showElevator, setDetails]);

  return (
    <div className="space-y-2">
      <Label className="text-xl font-bold text-[#2e343e]">{title}</Label>
      <div className="pt-4">
        <Controller
          control={control}
          name={propertyTypeName}
          render={({ field }) => (
            <LabelStackedField
              id={propertyTypeName}
              required
              label="Property Type"
            >
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-14 pb-[7px] pt-7">
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
            </LabelStackedField>
          )}
        />
        <FieldError message={propertyTypeError} />
      </div>

      {showExtraFields && (
        <>
          <div className="flex flex-wrap gap-6">
            <SelectField
              id={`${propertyTypeName}-bedrooms`}
              label="Number of bedrooms"
              value={details.bedrooms}
              onValueChange={(v) =>
                setDetails((prev) => ({ ...prev, bedrooms: v }))
              }
              options={BEDROOM_OPTIONS}
            />
            <SelectField
              id={`${propertyTypeName}-floors`}
              label="Number of floors"
              value={details.floors}
              onValueChange={(v) =>
                setDetails((prev) => ({ ...prev, floors: v }))
              }
              options={FLOOR_OPTIONS}
            />
          </div>
          {showElevator && (
            <SelectField
              id={`${propertyTypeName}-elevator`}
              label="Elevator"
              value={details.elevator}
              onValueChange={(v) =>
                setDetails((prev) => ({ ...prev, elevator: v }))
              }
              options={ELEVATOR_OPTIONS}
            />
          )}
        </>
      )}
    </div>
  );
}

export default function LocationsPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const locations = useWidgetStore((s) => s.locations);
  const setLocations = useWidgetStore((s) => s.setLocations);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useLocationsForm(locations ?? undefined);

  useEffect(() => {
    const subscription = watch((values) => {
      setLocations(values as LocationsFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, setLocations]);

  const loadingPropertyType = watch("loadingPropertyType");
  const unloadingPropertyType = watch("unloadingPropertyType");

  const [loadingDetails, setLoadingDetails] = useState<LocationDetails>({
    bedrooms: "",
    floors: "",
    elevator: "",
  });
  const [unloadingDetails, setUnloadingDetails] = useState<LocationDetails>({
    bedrooms: "",
    floors: "",
    elevator: "",
  });

  const onSubmit = () => {
    navigateWithParams("/moving");
  };

  const navigateBack = () => {
    navigateWithParams("/");
  };

  return (
    <WidgetLayout
      onContinue={handleSubmit(onSubmit)}
      navigateBack={navigateBack}
    >
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

          <LocationSection
            title="Loading location"
            propertyTypeName="loadingPropertyType"
            control={control}
            propertyTypeError={errors.loadingPropertyType?.message}
            details={loadingDetails}
            setDetails={setLoadingDetails}
            propertyType={loadingPropertyType}
          />

          <LocationSection
            title="Unloading location"
            propertyTypeName="unloadingPropertyType"
            control={control}
            propertyTypeError={errors.unloadingPropertyType?.message}
            details={unloadingDetails}
            setDetails={setUnloadingDetails}
            propertyType={unloadingPropertyType}
          />

          <div className="relative">
            <Label className="text-xl font-bold text-[#2e343e]">Extras</Label>
            <div className="border border-input mt-4 rounded-2xl px-3 py-[18.5px] flex items-center gap-3">
              <Checkbox />
              <div className="size-[30px] bg-[#F1FAF9] text-center rounded-full">
                <Icon name="extras" />
              </div>
              <div>
                <p className="text-[#2E343E]  font-bold">
                  I need to move heavy items
                </p>
                <p className="text-[#677890] text-sm">
                  Pianos, disassembled pool tables (no slate), or large items
                  that take a few people to lift
                </p>
              </div>
              <Icon
                name="info"
                size={20}
                className="absolute translate-y-1/2 top-1/2 right-3"
              />
            </div>
          </div>
        </div>
      </div>
    </WidgetLayout>
  );
}
