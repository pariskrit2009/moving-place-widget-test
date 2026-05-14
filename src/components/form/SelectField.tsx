import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { LabelStackedField } from "./LabelStackedField";

type Option = { readonly value: string; readonly label: string };

export function SelectField({
  id,
  label,
  value,
  onValueChange,
  options,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  options: readonly Option[];
  required?: boolean;
}) {
  return (
    <div className="flex-1">
      <LabelStackedField id={id} required={required} label={label}>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger id={id} className="pb-[7px] pt-7">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </LabelStackedField>
    </div>
  );
}
