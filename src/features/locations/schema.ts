import { z } from "zod";

const propertyTypeEnum = z.enum(["house", "apartment", "storage"]);

export const locationsSchema = z.object({
  loadingPropertyType: propertyTypeEnum,
  unloadingPropertyType: propertyTypeEnum,
  needsPacking: z.boolean(),
  needsHeavyItems: z.boolean(),
});

export type LocationsFormData = z.infer<typeof locationsSchema>;

export interface MoverQuote {
  id: string;
  company: string;
  price: number;
  rating: number;
  services: string[];
}
