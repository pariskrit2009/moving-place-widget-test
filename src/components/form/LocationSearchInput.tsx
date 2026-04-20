import { useState, useCallback } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { X, Loader2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import FieldError from "./FieldError";
import { usePlaceSearch } from "@/features/search";
import { useDebounce } from "@/hooks";

interface LocationSearchInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  id: string;
  placeholder?: string;
  error?: string;
}

export function LocationSearchInput<T extends FieldValues>({
  control,
  name,
  label,
  id,
  placeholder = "Zip code or street address",
  error,
}: LocationSearchInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LocationSearchInner
          field={field}
          id={id}
          label={label}
          placeholder={placeholder}
          error={error}
        />
      )}
    />
  );
}

interface LocationSearchInnerProps {
  field: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    ref: React.RefCallback<HTMLElement>;
  };
  id: string;
  label: string;
  placeholder: string;
  error?: string;
}

function LocationSearchInner({
  field,
  id,
  label,
  placeholder,
  error,
}: LocationSearchInnerProps) {
  const [inputValue, setInputValue] = useState(field.value);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(inputValue, 300);
  const { suggestions, isLoading } = usePlaceSearch(debouncedQuery);

  const handleSelect = useCallback(
    (description: string) => {
      setInputValue(description);
      field.onChange(description);
      setIsOpen(false);
    },
    [field],
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    field.onChange("");
    setIsOpen(false);
  }, [field]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      if (value !== field.value) {
        field.onChange(value);
      }
    },
    [field],
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold text-[#677890]"
      >
        {label}
      </label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="w-full">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#b1bbc8] pointer-events-none" />
            <Input
              id={id}
              value={inputValue}
              placeholder={placeholder}
              onChange={handleInputChange}
              onBlur={() => {
                field.onBlur();
              }}
              className="pl-9 pr-8"
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-sm text-[#b1bbc8] hover:text-[#2e343e] focus:outline-none focus:ring-1 focus:ring-[#3799a3]"
                aria-label="Clear location"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)]"
          align="start"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <Command shouldFilter={false}>
            <CommandList>
              {isLoading ? (
                <div className="flex items-center justify-center py-6 text-sm text-[#677890]">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Searching...
                </div>
              ) : (
                <CommandEmpty>No locations found.</CommandEmpty>
              )}
              {suggestions.length > 0 && (
                <CommandGroup>
                  {suggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.placeId}
                      value={suggestion.placeId}
                      onSelect={() => handleSelect(suggestion.description)}
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-[#677890]" />
                      <span className="truncate">{suggestion.description}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FieldError message={error} />
    </div>
  );
}
