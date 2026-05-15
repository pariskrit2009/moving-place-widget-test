import { useState } from "react";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { Icon } from "@/components/ui/icon";
import {
  MoverCard,
  SortDropdown,
  TrustBadge,
} from "@/features/movers/components";
import type { SortOption } from "@/features/movers/components/SortDropdown";
import type { MoverItem } from "@/features/movers/types";

const mockMovers: MoverItem[] = [
  {
    id: "1",
    provider: {
      name: "ProLoad",
      moves: 51,
      yearsInBusiness: 12,
      rating: 4.6,
      reviews: 51,
      summary:
        "ProLoad is known for efficient service and careful handling of items.",
    },
    price: 442,
    priceLabel: "Loading & unloading (no transport)",
    movers: 2,
    hours: 2,
    hasTruck: false,
  },
  {
    id: "2",
    provider: {
      name: "Golden Movers",
      moves: 34,
      yearsInBusiness: 8,
      rating: 4.8,
      reviews: 46,
      summary:
        "Golden Movers stands out for reliability and flexibility with scheduling.",
    },
    price: 486,
    priceLabel: "Loading & unloading (no transport)",
    movers: 2,
    hours: 2,
    hasTruck: false,
  },
  {
    id: "3",
    provider: {
      name: "Student Movers",
      moves: 72,
      yearsInBusiness: 15,
      rating: 4.3,
      reviews: 72,
      summary:
        "Student Movers offers affordable rates with professional service.",
    },
    price: 398,
    priceLabel: "Loading & unloading (no transport)",
    movers: 3,
    hours: 2,
    hasTruck: true,
  },
  {
    id: "4",
    provider: {
      name: "4 The Love of Moving",
      moves: 28,
      yearsInBusiness: 6,
      rating: 4.9,
      reviews: 28,
      summary:
        "A boutique moving company with exceptional attention to detail.",
    },
    price: 520,
    priceLabel: "Loading & unloading (no transport)",
    movers: 2,
    hours: 3,
    hasTruck: false,
  },
  {
    id: "5",
    provider: {
      name: "Bay Area Movers",
      moves: 96,
      yearsInBusiness: 20,
      rating: 4.1,
      reviews: 96,
      summary:
        "One of the most experienced teams in the Bay Area region.",
    },
    price: 370,
    priceLabel: "Loading & unloading (no transport)",
    movers: 2,
    hours: 2,
    hasTruck: true,
  },
  {
    id: "6",
    provider: {
      name: "Swift Move Co",
      moves: 43,
      yearsInBusiness: 10,
      rating: 4.5,
      reviews: 43,
      summary:
        "Swift Move Co provides fast, efficient moves with transparent pricing.",
    },
    price: 455,
    priceLabel: "Loading & unloading (no transport)",
    movers: 2,
    hours: 2,
    hasTruck: false,
  },
];

export default function AllMoversPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const [activeSort, setActiveSort] = useState<SortOption>("best-value");

  return (
    <WidgetLayout
      onContinue={() => navigateWithParams("/quote")}
      navigateBack={() => navigateWithParams("/movers")}
    >
      {/* Page header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold leading-8.5 text-gray-800">
          6 other Similar movers
        </h1>

        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-800">3 bedroom House</span>
          <span className="text-sm text-gray-800">·</span>
          <span className="rounded-2xl border border-teal-600 bg-teal-50 px-2 py-1 text-sm text-gray-800">
            Movers Only
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <TrustBadge
              icon={
                <Icon name="shieldcheck" size={20} className="text-gray-800" />
              }
              label="Up to $10,000 damage protection"
            />
            <TrustBadge
              icon={
                <Icon
                  name="circle-dollar"
                  size={24}
                  className="text-gray-800"
                />
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

          <SortDropdown activeSort={activeSort} onSortChange={setActiveSort} />
        </div>
      </div>

      {/* Mover cards */}
      <div className="flex flex-col gap-3">
        {mockMovers.map((mover) => (
          <MoverCard key={mover.id} mover={mover} />
        ))}
      </div>

      {/* Footer timer */}
      <div className="flex items-center justify-end gap-1 rounded-2xl bg-gray-50 px-2 py-1 self-end">
        <Icon name="timer" size={15} className="text-gray-800" />
        <span className="text-xs text-gray-800">Quotes expire in</span>
        <span className="text-xs font-bold text-gray-800">57:17</span>
      </div>
    </WidgetLayout>
  );
}
