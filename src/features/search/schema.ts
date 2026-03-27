import { z } from "zod";

// Single date mode
const singleDateSchema = z.object({
  hasDifferentDates: z.literal(false),
  movingDate: z.string().min(1, "Moving date is required"),
  loadingDate: z.literal(""),
  unloadingDate: z.literal(""),
});

// Separate dates mode
const separateDatesSchema = z.object({
  hasDifferentDates: z.literal(true),
  movingDate: z.literal(""),
  loadingDate: z.string().min(1, "Loading date is required"),
  unloadingDate: z.string().min(1, "Unloading date is required"),
});

// Union for conditional validation
const datesSchema = z.discriminatedUnion("hasDifferentDates", [
  singleDateSchema,
  separateDatesSchema,
]).refine(
  (data) => {
    if (data.hasDifferentDates) {
      return !data.loadingDate || !data.unloadingDate ||
        new Date(data.loadingDate) <= new Date(data.unloadingDate);
    }
    return true;
  },
  {
    message: "Loading date must be before or equal to unloading date",
    path: ["unloadingDate"],
  }
);

// Full locations schema
export const locationsSchema = datesSchema.and(
  z.object({
    startLocation: z.string().min(1, "Start location is required"),
    endLocation: z.string().min(1, "End location is required"),
  })
);

export type LocationsFormData = z.infer<typeof locationsSchema>;

export interface MoverQuote {
  id: string;
  company: string;
  price: number;
  rating: number;
  services: string[];
}
