import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type StackedInputProps = React.ComponentProps<typeof Input> & {
  label?: string;
};

const LabelStackedInput = React.forwardRef<HTMLInputElement, StackedInputProps>(
  ({ className, label, id, autoComplete = "off", type, ...props }, ref) => {
    return (
      <div className="relative w-full leading-[130%]">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "absolute left-3 text-[#677890] top-2 text-xs font-semibold",
            )}
          >
            {label}
          </label>
        )}

        <Input
          id={id}
          ref={ref}
          type={type}
          className={cn("h-14 pt-6 pb-2 pr-8", className)}
          autoComplete={autoComplete}
          {...props}
        />
      </div>
    );
  },
);

LabelStackedInput.displayName = "LabelStackedInput";

export { LabelStackedInput };
