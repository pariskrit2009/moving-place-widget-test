interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function StepProgress({ currentStep, totalSteps, stepLabels }: StepProgressProps) {
  const isStepComplete = (index: number) => index < currentStep;
  const isCurrentStep = (index: number) => index === currentStep - 1;

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {stepLabels.map((label, index) => (
          <div key={label} className="flex items-center">
            <div
              className={`
                flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium
                ${isStepComplete(index) ? "bg-blue-600 text-white" : ""}
                ${isCurrentStep(index) ? "bg-blue-100 text-blue-600 ring-2 ring-blue-600" : ""}
                ${!isStepComplete(index) && !isCurrentStep(index) ? "bg-gray-100 text-gray-500" : ""}
              `}
              aria-current={isCurrentStep(index) ? "step" : undefined}
            >
              {isStepComplete(index) ? "✓" : index + 1}
            </div>
            <span
              className={`
                ml-2 text-sm font-medium
                ${isCurrentStep(index) ? "text-gray-900" : "text-gray-500"}
              `}
            >
              {label}
            </span>
            {index < totalSteps - 1 && (
              <div
                className={`
                  mx-2 h-0.5 w-12
                  ${isStepComplete(index + 1) ? "bg-blue-600" : "bg-gray-200"}
                `}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepProgress;
