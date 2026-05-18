import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

import { createSearchSlice, type SearchSlice } from "@/features/search";
import {
  createLocationsSlice,
  type LocationsSlice,
} from "@/features/locations";
import { createMovingSlice, type MovingSlice } from "@/features/moving";
import {
  createMoveOptionSlice,
  type MoveOptionSlice,
} from "@/features/move-option";
import { createQuoteSlice, type QuoteSlice } from "@/features/quote";
import {
  createCustomizeSlice,
  type CustomizeSlice,
} from "@/features/customize";
import { createCheckoutSlice, type CheckoutSlice } from "@/features/checkout";
import {
  createEstimationSlice,
  type EstimationSlice,
} from "@/features/estimation";

export type WidgetStore = SearchSlice &
  LocationsSlice &
  MovingSlice &
  MoveOptionSlice &
  QuoteSlice &
  CustomizeSlice &
  CheckoutSlice &
  EstimationSlice;

const PERSIST_KEYS: (keyof WidgetStore)[] = [
  "search",
  "locations",
  "movingDateData",
  "selectedMoveOption",
  "quotes",
  "selectedQuoteId",
  "customization",
  "checkout",
  "estimation",
];

export const useWidgetStore = create<WidgetStore>()(
  persist(
    devtools(
      (...a) => ({
        ...createSearchSlice(...a),
        ...createLocationsSlice(...a),
        ...createMovingSlice(...a),
        ...createMoveOptionSlice(...a),
        ...createQuoteSlice(...a),
        ...createCustomizeSlice(...a),
        ...createCheckoutSlice(...a),
        ...createEstimationSlice(...a),
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
