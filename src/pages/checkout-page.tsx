import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import WidgetLayout from "@/components/layout/widget-layout";
import StickyFooter from "@/components/layout/sticky-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import FormSection from "@/components/form/form-section";
import FieldError from "@/components/form/field-error";
import { postComplete } from "@/messaging";

const checkoutSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  specialInstructions: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      specialInstructions: "",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Call API to submit booking
      console.log("Checkout data:", data);

      // Notify parent window of completion
      postComplete({ mode: "checkout" });

      navigate("/");
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <WidgetLayout>
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

      <StickyFooter>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/customize")}
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
            {isSubmitting ? "Processing..." : "Complete Booking"}
          </Button>
        </div>
      </StickyFooter>
    </WidgetLayout>
  );
}
