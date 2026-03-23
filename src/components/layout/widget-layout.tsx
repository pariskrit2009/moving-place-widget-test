import WidgetHeader from "./widget-header";
import StepProgress from "./step-progress";
import { useWidgetState } from "@/hooks";

interface WidgetLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const stepLabels = ["Locations", "Quotes", "Customize", "Checkout"];

export function WidgetLayout({ children, title }: WidgetLayoutProps) {
  const { currentStep, totalSteps } = useWidgetState();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <WidgetHeader />
      <main className="mx-auto max-w-3xl px-4 py-6">
        {title && <h2 className="mb-4 text-xl font-semibold text-gray-900">{title}</h2>}
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} stepLabels={stepLabels} />
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}

export default WidgetLayout;
