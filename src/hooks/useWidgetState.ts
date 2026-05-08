import { useLocation } from "react-router-dom";

const routeStepMap: Record<string, number> = {
  "/": 1,
  "/location": 2,
  "/move-option": 3,
  "/quote": 4,
  "/customize": 5,
  "/checkout": 6,
  "/movers": 4,
};

export function useWidgetState() {
  const { pathname } = useLocation();
  const totalSteps = 6;
  const currentStep = routeStepMap[pathname] ?? 1;

  return {
    currentStep,
    totalSteps,
    isComplete: currentStep >= totalSteps,
  };
}
