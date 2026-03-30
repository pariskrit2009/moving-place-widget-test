import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePickerModal } from "@/components/modals/DatePickerModal";
import FieldError from "./FieldError";

interface DatePickerInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  id: string;
  error?: string;
  minDate?: Date;
}

export function DatePickerInput<T extends FieldValues>({
  control,
  name,
  label,
  id,
  error,
  minDate,
}: DatePickerInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePickerModal
          selectedDate={field.value ? new Date(field.value) : undefined}
          onSelect={(date) =>
            field.onChange(date ? date.toISOString().split("T")[0] : "")
          }
          minDate={minDate}
          trigger={
            <div>
              <Label htmlFor={id}>{label}</Label>
              <div className="relative">
                <Input
                  id={id}
                  readOnly
                  value={field.value || ""}
                  placeholder="Select date"
                  className="cursor-pointer pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              <FieldError message={error} />
            </div>
          }
        />
      )}
    />
  );
}
