import { z } from "zod";

// Enum definitions for dropdown options
const propertyTypeEnum = z.enum(["house", "apartment", "storage"]);
const bedroomsEnum = z.enum(["studio", "1", "2", "3", "4+"]);
const floorsEnum = z.enum(["ground", "1-2", "3-4", "5+"]);
const itemCountEnum = z.enum(["0", "1", "2", "3+"]);

// Base property details (always visible)
const propertyDetailsBase = z.object({
  propertyType: propertyTypeEnum,
  bedrooms: bedroomsEnum,
  floors: floorsEnum,
});

// No heavy items mode
const noHeavyItemsSchema = propertyDetailsBase.extend({
  hasHeavyItems: z.literal(false),
  babyGrandPianos: z.literal("0"),
  uprightPianos: z.literal("0"),
  heavyItems300to450: z.literal("0"),
  heavyItems450to600: z.literal("0"),
  heavyItemsOver600: z.literal("0"),
});

// Has heavy items mode
const hasHeavyItemsSchema = propertyDetailsBase.extend({
  hasHeavyItems: z.literal(true),
  babyGrandPianos: itemCountEnum,
  uprightPianos: itemCountEnum,
  heavyItems300to450: itemCountEnum,
  heavyItems450to600: itemCountEnum,
  heavyItemsOver600: itemCountEnum,
});

// Union for conditional validation
export const locationsSchema = z.discriminatedUnion("hasHeavyItems", [
  noHeavyItemsSchema,
  hasHeavyItemsSchema,
]);

export type LocationsFormData = z.infer<typeof locationsSchema>;

export interface MoverQuote {
  id: string;
  company: string;
  price: number;
  rating: number;
  services: string[];
}
