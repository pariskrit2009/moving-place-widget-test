import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import FormSection from "@/components/form/FormSection";
import FieldError from "@/components/form/FieldError";
import { postComplete } from "@/lib/utils/messaging";
import { useCheckoutForm } from "@/features/checkout/useCheckoutForm";
import { Input } from "@/components/ui/input";

export default function CheckoutPage() {
  const { navigateWithParams } = useNavigateWithParams();
  // const { selectedQuote } = useWidgetState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCheckoutForm();
  // const validateBooking = useValidateBooking();
  // const submitBooking = useSubmitBooking();

  const onSubmit = async () => {
    try {
      // Validate first
      // const validation = await validateBooking.mutateAsync(data);
      // if (validation && !validation.valid) {
      //   // Handle validation errors if needed
      //   console.error("Validation failed:", validation.errors);
      //   return;
      // }

      // Submit booking
      // const bookingData = {
      //   ...data,
      //   quoteId: selectedQuote?.id || "",
      //   selectedServices: selectedQuote?.services || [],
      //   totalCost: selectedQuote?.price || 0,
      // };

      // await submitBooking.mutateAsync(bookingData);

      // Notify parent window of completion
      postComplete({ mode: "checkout" });

      navigateWithParams("/");
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <WidgetLayout
      onContinue={handleSubmit(onSubmit)}
      navigateBack={() => navigateWithParams("/customize")}
    >
      <FormSection
        title="Checkout"
        description="Enter your contact information to complete the booking"
      >
        <Card>
          <CardContent className="space-y-4 pt-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                {...register("fullName")}
              />
              <FieldError message={errors.fullName?.message} />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                {...register("phone")}
              />
              <FieldError message={errors.phone?.message} />
            </div>

            <div>
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Input
                id="specialInstructions"
                placeholder="Any special requirements..."
                {...register("specialInstructions")}
              />
              <FieldError message={errors.specialInstructions?.message} />
            </div>
          </CardContent>
        </Card>
      </FormSection>
    </WidgetLayout>
  );
}
