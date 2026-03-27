import { Controller } from "react-hook-form";
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
import FormSection from "@/components/form/FormSection";
import { useLocationsForm } from "@/features/locations/hooks";

export default function LocationsPage() {
  const { navigateWithParams } = useNavigateWithParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useLocationsForm();

  const hasHeavyItems = watch("hasHeavyItems");

  const onSubmit = async () => {
    try {
      navigateWithParams("/quote");
    } catch (error) {
      console.error("Failed to submit locations:", error);
    }
  };

  return (
    <WidgetLayout>
      <FormSection
        title="Enter Move Details"
        description="Provide the locations and property details for your move"
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-4 min-[600px]:flex-row min-[600px]:items-end">
            <div className="flex-1">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "propertyType",
                    value as "house" | "apartment" | "storage",
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment/Condo</SelectItem>
                  <SelectItem value="storage">Storage Unit</SelectItem>
                </SelectContent>
              </Select>
              <FieldError message={errors.propertyType?.message} />
            </div>

            <div className="flex-1">
              <Label htmlFor="bedrooms">Number of Bedrooms</Label>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "bedrooms",
                    value as "studio" | "1" | "2" | "3" | "4+",
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="1">1 bedroom</SelectItem>
                  <SelectItem value="2">2 bedrooms</SelectItem>
                  <SelectItem value="3">3 bedrooms</SelectItem>
                  <SelectItem value="4+">4+ bedrooms</SelectItem>
                </SelectContent>
              </Select>
              <FieldError message={errors.bedrooms?.message} />
            </div>

            <div className="flex-1">
              <Label htmlFor="floors">Number of Floors</Label>
              <Select
                onValueChange={(value) =>
                  setValue("floors", value as "ground" | "1-2" | "3-4" | "5+")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select floors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ground">Ground floor only</SelectItem>
                  <SelectItem value="1-2">1-2 floors</SelectItem>
                  <SelectItem value="3-4">3-4 floors</SelectItem>
                  <SelectItem value="5+">5+ floors</SelectItem>
                </SelectContent>
              </Select>
              <FieldError message={errors.floors?.message} />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="hasHeavyItems"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="hasHeavyItems"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="hasHeavyItems" className="cursor-pointer">
              I need to move heavy items
            </Label>
          </div>

          {hasHeavyItems && (
            <div className="space-y-4">
              <div className="flex flex-col gap-4 min-[600px]:flex-row min-[600px]:items-end">
                <div className="flex-1">
                  <Label htmlFor="babyGrandPianos">Baby or Grand Pianos</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue(
                        "babyGrandPianos",
                        value as "0" | "1" | "2" | "3+",
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3+">3+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError message={errors.babyGrandPianos?.message} />
                </div>

                <div className="flex-1">
                  <Label htmlFor="uprightPianos">Upright Pianos</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("uprightPianos", value as "0" | "1" | "2" | "3+")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3+">3+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError message={errors.uprightPianos?.message} />
                </div>
              </div>

              <div className="flex flex-col gap-4 min-[600px]:flex-row min-[600px]:items-end">
                <div className="flex-1">
                  <Label htmlFor="heavyItems300to450">
                    Heavy Items (300-450 lbs)
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setValue(
                        "heavyItems300to450",
                        value as "0" | "1" | "2" | "3+",
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3+">3+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError message={errors.heavyItems300to450?.message} />
                </div>

                <div className="flex-1">
                  <Label htmlFor="heavyItems450to600">
                    Heavy Items (450-600 lbs)
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setValue(
                        "heavyItems450to600",
                        value as "0" | "1" | "2" | "3+",
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3+">3+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError message={errors.heavyItems450to600?.message} />
                </div>

                <div className="flex-1">
                  <Label htmlFor="heavyItemsOver600">
                    Heavy Items (Over 600 lbs)
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setValue(
                        "heavyItemsOver600",
                        value as "0" | "1" | "2" | "3+",
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3+">3+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError message={errors.heavyItemsOver600?.message} />
                </div>
              </div>
            </div>
          )}
        </div>
      </FormSection>

      <StickyFooter>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigateWithParams("/")}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="flex-1"
            size="lg"
          >
            {isSubmitting ? "Loading..." : "Find Movers"}
          </Button>
        </div>
      </StickyFooter>
    </WidgetLayout>
  );
}
