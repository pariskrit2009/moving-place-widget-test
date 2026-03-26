import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  specialInstructions: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const bookingDataSchema = checkoutSchema.extend({
  quoteId: z.string(),
  selectedServices: z.array(z.string()),
  totalCost: z.number(),
});

export type BookingData = z.infer<typeof bookingDataSchema>;
