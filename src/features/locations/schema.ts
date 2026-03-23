import { z } from "zod";

export const locationsSchema = z.object({
  startLocation: z.string().min(1, "Start location is required"),
  endLocation: z.string().min(1, "End location is required"),
  movingDate: z.string().min(1, "Moving date is required"),
});

export type LocationsFormData = z.infer<typeof locationsSchema>;
