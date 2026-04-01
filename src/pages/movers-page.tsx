import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import StickyFooter from "@/components/layout/StickyFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormSection from "@/components/form/FormSection";
import { postComplete } from "@/lib/utils/messaging";
import { useSubmitBooking } from "@/features/checkout/hooks";
import { useCheckoutForm } from "@/features/checkout/useCheckoutForm";
import { StarRating } from "@/components/ui/star-rating";

export default function MoversPage() {
  const { navigateWithParams } = useNavigateWithParams();
  // const { selectedQuote } = useWidgetState();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useCheckoutForm();
  // const validateBooking = useValidateBooking();
  const submitBooking = useSubmitBooking();
  const quotes = [
    {
      id: 1,
      company: "M.B.G.S",
      price: 200,
      services: ["Branding"],
      rating: 3,
    },
    {
      id: 2,
      company: "Alpha Solutions",
      price: 350,
      services: ["Web Design", "SEO"],
      rating: 4,
    },
    {
      id: 3,
      company: "Nova Tech",
      price: 500,
      services: ["App Development"],
      rating: 5,
    },
    {
      id: 4,
      company: "Bright Media",
      price: 275,
      services: ["Marketing", "Content Writing"],
      rating: 4,
    },
    {
      id: 5,
      company: "Skyline Agency",
      price: 420,
      services: ["UI/UX Design"],
      rating: 4,
    },
    {
      id: 6,
      company: "Pixel Works",
      price: 300,
      services: ["Graphic Design"],
      rating: 3,
    },
    {
      id: 7,
      company: "Code Craft",
      price: 650,
      services: ["Software Development", "Testing"],
      rating: 5,
    },
    {
      id: 8,
      company: "Blue Orbit",
      price: 180,
      services: ["Consulting"],
      rating: 2,
    },
    {
      id: 9,
      company: "Prime Edge",
      price: 390,
      services: ["Web Development"],
      rating: 4,
    },
    {
      id: 10,
      company: "Fusion Hub",
      price: 520,
      services: ["Cloud Services", "DevOps"],
      rating: 5,
    },
    {
      id: 11,
      company: "Zenith Labs",
      price: 610,
      services: ["AI Solutions"],
      rating: 5,
    },
    {
      id: 12,
      company: "Market Minds",
      price: 240,
      services: ["Social Media Management"],
      rating: 3,
    },
    {
      id: 13,
      company: "Digital Nest",
      price: 330,
      services: ["E-commerce Setup"],
      rating: 4,
    },
    {
      id: 14,
      company: "Vertex Group",
      price: 450,
      services: ["Business Analysis"],
      rating: 4,
    },
    {
      id: 15,
      company: "NextWave",
      price: 700,
      services: ["Enterprise Solutions"],
      rating: 5,
    },
    {
      id: 16,
      company: "Spark Bridge",
      price: 260,
      services: ["Email Marketing"],
      rating: 3,
    },
    {
      id: 17,
      company: "Core Vision",
      price: 380,
      services: ["Data Analytics"],
      rating: 4,
    },
    {
      id: 18,
      company: "Apex Studio",
      price: 290,
      services: ["Video Editing"],
      rating: 3,
    },
    {
      id: 19,
      company: "Cloud Nest",
      price: 560,
      services: ["Hosting", "Maintenance"],
      rating: 5,
    },
    {
      id: 20,
      company: "Inspire Works",
      price: 310,
      services: ["Consulting", "Training"],
      rating: 4,
    },
  ];

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
    <WidgetLayout>
      <FormSection
        title="Checkout"
        description="Enter your contact information to complete the booking"
      >
        <div className="">
          {quotes.map((quote) => (
            <Card
              key={quote.id}
              className={`
                  cursor-pointer transition-all hover:shadow-md
                  
                `}
              role="radio"
              tabIndex={0}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{quote.company}</CardTitle>
                  <span className="text-lg font-semibold text-blue-600">
                    ${quote.price}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <StarRating rating={quote.rating} />
                  <span className="text-gray-300">|</span>
                  <span className="flex flex-wrap gap-1">
                    {quote.services.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{quote.services.length - 2} more
                      </span>
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </FormSection>

      <StickyFooter>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigateWithParams("/quote")}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || submitBooking.isPending}
            className="flex-1"
            size="lg"
          >
            {isSubmitting || submitBooking.isPending
              ? "Processing..."
              : "Complete Booking"}
          </Button>
        </div>
      </StickyFooter>
    </WidgetLayout>
  );
}
