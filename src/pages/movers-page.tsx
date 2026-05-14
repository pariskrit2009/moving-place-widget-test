import { useState } from "react";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  QuoteCard,
  SortTabs,
  TrustBadge,
} from "@/features/movers/components";
import type { SortTab } from "@/features/movers/components";
import type { MoverQuote } from "@/features/movers/types";

const mockQuote: MoverQuote = {
  id: "1",
  totalPrice: 420,
  lowestPrice: 486,
  topRatedPrice: 620,
  services: [
    {
      type: "loading",
      date: "Apr 28",
      location: "Loading at San Francisco, CA 94109",
      startingPrice: 220,
      provider: {
        name: "Golden Movers",
        moves: 34,
        yearsInBusiness: 12,
        rating: 4.5,
        reviews: 31,
        summary:
          "Student Movers stands out most for their reliability and flexibility. Customers frequently mention that the crew arrives on time or early and handles schedule changes without any fric...",
      },
      movers: 2,
      hours: 2,
    },
    {
      type: "unloading",
      date: "May 3",
      location: "Unloading at San Francisco, CA 94133",
      startingPrice: 200,
      provider: {
        name: "4 The Love of Moving",
        moves: 34,
        yearsInBusiness: 12,
        rating: 4.5,
        reviews: 31,
        summary:
          "Student Movers stands out most for their reliability and flexibility. Customers frequently mention that the crew arrives on time or early and handles schedule changes without any fric...",
      },
      movers: 2,
      hours: 2,
    },
  ],
};

export default function MoversPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const [activeTab, setActiveTab] = useState<SortTab>("best-value");

  return (
    <WidgetLayout
      onContinue={() => navigateWithParams("/quote")}
      navigateBack={() => navigateWithParams("/move-option")}
    >
      {/* Page header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold leading-8.5 text-gray-800 flex-1">
            Out of 6 movers, here is our top pick for your move.
          </h1>
          <div className="flex items-center gap-1 rounded-2xl bg-gray-50 px-2 py-1 shrink-0">
            <Icon name="timer" size={15} className="text-gray-800" />
            <span className="text-xs text-gray-800">Quotes expire in</span>
            <span className="text-xs font-bold text-gray-800">57:17</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-800">3 bedroom House</span>
          <span className="text-sm text-gray-800">·</span>
          <span className="rounded-2xl border border-teal-600 bg-teal-50 px-2 py-1 text-sm text-gray-800">
            Movers Only
          </span>
        </div>

        <div className="flex items-center gap-6">
          <TrustBadge
            icon={
              <Icon name="shieldcheck" size={20} className="text-gray-800" />
            }
            label="Up to $10,000 damage protection"
          />
          <TrustBadge
            icon={
              <Icon name="circle-dollar" size={24} className="text-gray-800" />
            }
            label="No hidden fees"
          />
          <TrustBadge
            icon={
              <Icon name="shieldcheck" size={20} className="text-gray-800" />
            }
            label="Background-checked movers"
          />
        </div>
      </div>

      <SortTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        lowestPrice={mockQuote.lowestPrice}
        topRatedPrice={mockQuote.topRatedPrice}
      />

      <QuoteCard quote={mockQuote} />

      <Button variant="outline" className="rounded-full self-center">
        View all 6 available movers
      </Button>
    </WidgetLayout>
  );
}
