import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WidgetLayout from "@/components/layout/WidgetLayout";
import StickyFooter from "@/components/layout/StickyFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormSection from "@/components/form/FormSection";
import type { MoverQuote } from "@/features/quote/schema";

const mockQuotes: MoverQuote[] = [
  {
    id: "1",
    company: "Swift Movers",
    price: 800,
    rating: 4.5,
    services: ["Packing", "Loading", "Transport"],
  },
  {
    id: "2",
    company: "Quick Move Co",
    price: 650,
    rating: 4.2,
    services: ["Loading", "Transport"],
  },
  {
    id: "3",
    company: "Premium Relocations",
    price: 1200,
    rating: 4.8,
    services: ["Full Service", "Packing", "Loading", "Transport", "Unpacking"],
  },
];

export default function QuotePage() {
  const navigate = useNavigate();
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedQuote) {
      navigate("/customize");
    }
  };

  return (
    <WidgetLayout>
      <FormSection
        title="Mover Quotes"
        description="Compare quotes from top-rated moving companies"
      >
        <div className="space-y-3">
          {mockQuotes.map((quote) => (
            <Card
              key={quote.id}
              className={`
                cursor-pointer transition-all hover:shadow-md
                ${selectedQuote === quote.id ? "ring-2 ring-blue-600" : ""}
              `}
              onClick={() => setSelectedQuote(quote.id)}
              role="radio"
              aria-checked={selectedQuote === quote.id}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedQuote(quote.id);
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
                  <span>★ {quote.rating}</span>
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
      </FormSection>

      <StickyFooter>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedQuote}
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
