import { useState, useCallback } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { X, Loader2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  placeholder = "Search for a location",
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
      <Label htmlFor={id}>{label}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              id={id}
              value={inputValue}
              placeholder={placeholder}
              onChange={handleInputChange}
              onBlur={() => {
                field.onBlur();
              }}
              className="pr-8 pl-9"
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-sm text-muted-foreground hover:text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
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
                <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
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
                      <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
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
