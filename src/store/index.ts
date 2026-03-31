import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createSearchSlice, type SearchSlice } from "@/features/search";
import { createLocationsSlice, type LocationsSlice } from "@/features/locations";
import { createQuoteSlice, type QuoteSlice } from "@/features/quote";
import { createCustomizeSlice, type CustomizeSlice } from "@/features/customize";
import { createCheckoutSlice, type CheckoutSlice } from "@/features/checkout";

export type WidgetStore = SearchSlice &
  LocationsSlice &
  QuoteSlice &
  CustomizeSlice &
  CheckoutSlice;

export const useWidgetStore = create<WidgetStore>()(
  devtools(
    (...a) => ({
      ...createSearchSlice(...a),
      ...createLocationsSlice(...a),
      ...createQuoteSlice(...a),
      ...createCustomizeSlice(...a),
      ...createCheckoutSlice(...a),
    }),
    { name: "widget-store" },
  ),
);
