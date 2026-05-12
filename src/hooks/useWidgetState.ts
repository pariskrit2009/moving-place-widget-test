import { useLocation } from "react-router-dom";

const routeStepMap: Record<string, number> = {
  "/": 1,
  "/location": 2,
  "/moving": 3,
  "/move-option": 4,
  "/quote": 5,
  "/customize": 6,
  "/checkout": 7,
  "/movers": 5,
};

export function useWidgetState() {
  const { pathname } = useLocation();
  const totalSteps = 7;
  const currentStep = routeStepMap[pathname] ?? 1;

  return {
    currentStep,
    totalSteps,
    isComplete: currentStep >= totalSteps,
  };
}
