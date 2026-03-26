import { useForm } from "react-hook-form";
import { checkoutSchema } from "./schema";
import type { CheckoutFormData } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useCheckoutForm() {
  return useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      specialInstructions: "",
    },
  });
}
