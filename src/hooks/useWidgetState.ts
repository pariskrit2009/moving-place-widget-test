import { useLocation } from "react-router-dom";

const routeStepMap: Record<string, number> = {
  "/": 1,
  "/location": 2,
  "/quote": 3,
  "/customize": 4,
  "/checkout": 5,
  "/movers": 3,
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
