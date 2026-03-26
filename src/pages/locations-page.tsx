import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import WidgetLayout from "@/components/layout/WidgetLayout";
import StickyFooter from "@/components/layout/StickyFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FieldError from "@/components/form/FieldError";
import FormSection from "@/components/form/FormSection";
import {
  locationsSchema,
  type LocationsFormData,
} from "@/features/locations/schema";

export default function LocationsPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LocationsFormData>({
    resolver: zodResolver(locationsSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
      movingDate: "",
    },
  });

  const onSubmit = async (data: LocationsFormData) => {
    // TODO: Call API to fetch quotes
    console.log("Form submitted:", data);
    navigate(`/quote${window.location.search}`);
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

            <div className="flex-1">
              <Label htmlFor="movingDate">Moving Date</Label>
              <Input id="movingDate" type="date" {...register("movingDate")} />
              <FieldError message={errors.movingDate?.message} />
            </div>
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
