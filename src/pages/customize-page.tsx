import { useState } from "react";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import StickyFooter from "@/components/layout/StickyFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FormSection from "@/components/form/FormSection";

const additionalServices = [
  { id: "packing", label: "Packing Services", price: 200 },
  { id: "unpacking", label: "Unpacking Services", price: 150 },
  { id: "storage", label: "Temporary Storage", price: 100 },
  { id: "insurance", label: "Full Value Insurance", price: 250 },
  { id: "fragile", label: "Fragile Item Handling", price: 120 },
];

export default function CustomizePage() {
  const { navigateWithParams } = useNavigateWithParams();
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set(),
  );

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(serviceId)) {
        next.delete(serviceId);
      } else {
        next.add(serviceId);
      }
      return next;
    });
  };

  const handleContinue = () => {
    navigateWithParams("/checkout");
  };

  return (
    <WidgetLayout>
      <FormSection
        title="Customize Your Move"
        description="Select additional services for your move"
      >
        <div className="space-y-3">
          {additionalServices.map((service) => (
            <Card
              key={service.id}
              className={`
                cursor-pointer transition-all hover:shadow-md
                ${selectedServices.has(service.id) ? "ring-2 ring-blue-600" : ""}
              `}
            >
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={service.id}
                    checked={selectedServices.has(service.id)}
                    onCheckedChange={() => toggleService(service.id)}
                  />
                  <Label
                    htmlFor={service.id}
                    className="flex flex-col gap-1 font-normal cursor-pointer"
                  >
                    <span className="font-medium">{service.label}</span>
                    <span className="text-sm text-gray-500">
                      +${service.price}
                    </span>
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </FormSection>

      <StickyFooter>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => navigateWithParams("/quote")}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            variant="secondary"
            onClick={handleContinue}
            className="flex-1"
            size="lg"
          >
            Continue to Checkout
          </Button>
        </div>
      </StickyFooter>
    </WidgetLayout>
  );
}
