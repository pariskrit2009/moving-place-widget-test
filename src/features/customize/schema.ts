import { z } from "zod";

export const customizeSchema = z.object({
  packagingType: z.enum(["standard", "premium", "eco-friendly"]),
  insuranceLevel: z.enum(["basic", "standard", "premium"]),
  additionalServices: z.array(z.string()).default([]),
});

export type CustomizeFormData = z.infer<typeof customizeSchema>;

export const packagingOptions = [
  { value: "standard", label: "Standard Packaging", description: "Basic boxes and materials" },
  { value: "premium", label: "Premium Packaging", description: "High-quality protective materials" },
  { value: "eco-friendly", label: "Eco-Friendly", description: "Sustainable recycled materials" },
];

export const insuranceOptions = [
  { value: "basic", label: "Basic Coverage", description: "Essential protection" },
  { value: "standard", label: "Standard Coverage", description: "Comprehensive protection" },
  { value: "premium", label: "Premium Coverage", description: "Full value protection" },
];

export const additionalServices = [
  { value: "assembly", label: "Furniture Assembly" },
  { value: "disassembly", label: "Furniture Disassembly" },
  { value: "storage", label: "Temporary Storage" },
  { value: "cleaning", label: "Post-Move Cleaning" },
];
