import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import StickyFooter from "@/components/layout/StickyFooter";
import { Button } from "@/components/ui/button";
import FormSection from "@/components/form/FormSection";
import { StarRating } from "@/components/ui/star-rating";

export default function QuotePage() {
  const { navigateWithParams } = useNavigateWithParams();
  // const { locationsData } = useWidgetState();
  // const { data: quotes, isLoading, error } = useQuotes(locationsData);
  // const selectQuote = useSelectQuote();
  // const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  const handleContinue = () => {
    // if (selectedQuote) {
    //   navigateWithParams("/customize");
    // }
    navigateWithParams("/customize");
  };

  // const handleQuoteSelect = async (quoteId: string) => {
  //   setSelectedQuote(quoteId);
  //   try {
  //     await selectQuote.mutateAsync(quoteId);
  //   } catch (err) {
  //     console.error("Failed to select quote:", err);
  //   }
  // };

  return (
    <WidgetLayout>
      <FormSection
        title="Mover Quotes"
        description="Compare quotes from top-rated moving companies"
      >
        <p>QUOTE PAGE</p>
        <Button onClick={() => navigateWithParams("/movers")}>
          See more movers
        </Button>
        <StarRating rating={5} />

        {/* {isLoading ? (
          <div className="text-center py-8">Loading quotes...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">Failed to load quotes</div>
        ) : quotes && quotes.length > 0 ? (
          <div className="space-y-3">
            {quotes.map((quote) => (
              <Card
                key={quote.id}
                className={`
                  cursor-pointer transition-all hover:shadow-md
                  ${selectedQuote === quote.id ? "ring-2 ring-blue-600" : ""}
                `}
                onClick={() => handleQuoteSelect(quote.id)}
                role="radio"
                aria-checked={selectedQuote === quote.id}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleQuoteSelect(quote.id);
                  }
                }}
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
                    {quote.services.slice(0, 2).map((service) => (
                      <span key={service} className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                        {service}
                      </span>
                    ))}
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
        ) : (
          <div className="text-center py-8">No quotes available</div>
        )} */}
      </FormSection>

      <StickyFooter>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigateWithParams("/location")}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={false}
            className="flex-1"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </StickyFooter>
    </WidgetLayout>
  );
}
