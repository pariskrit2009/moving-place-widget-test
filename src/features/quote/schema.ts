import { z } from "zod";

export const quoteSchema = z.object({
  selectedQuote: z.string().min(1, "Please select a quote"),
  emailQuote: z.boolean().default(false),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;

export interface MoverQuote {
  id: string;
  company: string;
  price: number;
  rating: number;
  services: string[];
}
