import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

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

const PERSIST_KEYS: (keyof WidgetStore)[] = [
  "search",
  "locations",
  "quotes",
  "selectedQuoteId",
  "customization",
  "checkout",
];

export const useWidgetStore = create<WidgetStore>()(
  persist(
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
    {
      name: "widget-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) =>
            PERSIST_KEYS.includes(key as keyof WidgetStore),
          ),
        ),
    },
  ),
);
