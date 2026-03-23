import { useState } from "react";

export interface WidgetState {
  currentStep: number;
  totalSteps: number;
  isComplete: boolean;
}

export function useWidgetState(): WidgetState {
  const [currentStep] = useState(1);
  const totalSteps = 4;

  return {
    currentStep,
    totalSteps,
    isComplete: currentStep >= totalSteps,
  };
}
