import { cn } from "@/lib/utils";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 gap-1.5">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              index < currentStep ? "bg-[#3799a3]" : "bg-[#d9d9d9]"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="shrink-0 text-sm font-normal text-[#677890]">
        Step{" "}
        <span className="font-bold text-[#3799a3]">{currentStep}</span> /{" "}
        {totalSteps}
      </span>
    </div>
  );
}

export default StepProgress;
