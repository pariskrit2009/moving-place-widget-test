import { DayPicker } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "react-day-picker/style.css";

interface DatePickerModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  minDate?: Date;
  trigger?: React.ReactNode;
}

export function DatePickerModal({
  open,
  onOpenChange,
  selectedDate,
  onSelect,
  minDate,
  trigger,
}: DatePickerModalProps) {
  const handleDateSelect = (date: Date | undefined) => {
    onSelect(date);

    if (onOpenChange) onOpenChange(false);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {trigger && <PopoverTrigger asChild>{trigger}</PopoverTrigger>}
      <PopoverContent>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={{ before: minDate || new Date() }}
          navLayout="around"
          showOutsideDays
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
