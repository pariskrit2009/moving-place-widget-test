import { useWidgetParams, useWidgetResize, useWidgetTheme } from "@/hooks";
import StepProgress from "@/components/layout/StepProgress";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface WidgetLayoutProps {
  children: React.ReactNode;
  navigateBack?: () => void;
  onContinue: () => void;
}

export function WidgetLayout({
  children,
  navigateBack,
  onContinue,
}: WidgetLayoutProps) {
  const { hostOrigin } = useWidgetParams();
  useWidgetResize({ hostOrigin });
  useWidgetTheme();

  return (
    <div
      id="widget-content"
      className="flex items-center justify-center bg-gray-100 p-4 "
    >
      <div className="max-h-[794px] overflow-auto relative w-full max-w-5xl rounded-2xl border border-[#b1bbc8] bg-white p-6 flex flex-col">
        <div className="space-y-1"></div>

        <div className="sticky top-0 flex justify-between gap-3 w-full mb-2">
          {navigateBack && (
            <Button
              variant="outline"
              onClick={navigateBack}
              className=" rounded-full border-transparent text-[#2e343e] "
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          <StepProgress />
          <Button
            variant="cta"
            onClick={onContinue}
            // disabled={isSubmitting}
          >
            Continue
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default WidgetLayout;
