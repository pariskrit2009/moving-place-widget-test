import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import FormSection from "@/components/form/FormSection";
import { useCustomizeForm } from "@/features/customize/useCustomizeForm";

export default function CustomizePage() {
  const { navigateWithParams } = useNavigateWithParams();
  const { handleSubmit } = useCustomizeForm();
  // const { data: availableServices, isLoading } = useAvailableServices(selectedQuote?.id || "");
  // const submitCustomization = useSubmitCustomization();
  const isLoading = false;
  const onSubmit = async () => {
    try {
      // await submitCustomization.mutateAsync({ ...data, quoteId: selectedQuote?.id });
      navigateWithParams("/checkout");
    } catch (error) {
      console.error("Failed to submit customization:", error);
    }
  };

  return (
    <WidgetLayout
      onContinue={handleSubmit(onSubmit)}
      navigateBack={() => navigateWithParams("/quote")}
    >
      <FormSection
        title="Customize Your Move"
        description="Select additional services for your move"
      >
        {isLoading ? (
          <div className="text-center py-8">Loading services...</div>
        ) : (
          <div className="space-y-3">
            {/* {availableServices && availableServices.map((service: ServiceSelection) => (
              <Card
                key={service.id}
                className={`
                  cursor-pointer transition-all hover:shadow-md
                  ${control.watch("additionalServices")?.includes(service.id) ? "ring-2 ring-blue-600" : ""}
                `}
              >
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={service.id}
                      checked={control.watch("additionalServices")?.includes(service.id)}
                      onCheckedChange={() => {
                        const current = control.watch("additionalServices") || [];
                        if (current.includes(service.id)) {
                          control.setValue("additionalServices", current.filter((id: string) => id !== service.id));
                        } else {
                          control.setValue("additionalServices", [...current, service.id]);
                        }
                      }}
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
            ))} */}
          </div>
        )}
      </FormSection>
    </WidgetLayout>
  );
}
