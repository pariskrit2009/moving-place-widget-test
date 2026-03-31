import type { StateCreator } from "zustand";
import type { MoverQuote } from "./schema";

export interface QuoteSlice {
  quotes: MoverQuote[];
  selectedQuoteId: string | null;
  setQuotes: (quotes: MoverQuote[]) => void;
  selectQuote: (id: string) => void;
  resetQuotes: () => void;
}

export const createQuoteSlice: StateCreator<QuoteSlice, [], [], QuoteSlice> = (set) => ({
  quotes: [],
  selectedQuoteId: null,
  setQuotes: (quotes) => set({ quotes }),
  selectQuote: (id) => set({ selectedQuoteId: id }),
  resetQuotes: () => set({ quotes: [], selectedQuoteId: null }),
});
