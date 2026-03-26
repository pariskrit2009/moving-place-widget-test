import { useForm } from "react-hook-form";
import { customizeSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useCustomizeForm() {
  return useForm({
    resolver: zodResolver(customizeSchema),
    defaultValues: {
      packagingType: "standard",
      insuranceLevel: "basic",
      additionalServices: [],
    },
  });
}
