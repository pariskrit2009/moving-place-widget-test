import { useWidgetParams, useWidgetResize, useWidgetTheme } from "@/hooks";
import StepProgress from "@/components/layout/StepProgress";

interface WidgetLayoutProps {
  children: React.ReactNode;
}

export function WidgetLayout({ children }: WidgetLayoutProps) {
  const { hostOrigin } = useWidgetParams();
  useWidgetResize({ hostOrigin });
  useWidgetTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div
        id="widget-content"
        className="relative w-full max-w-[1024px] min-h-[711px] rounded-2xl border border-[#b1bbc8] bg-white p-6 flex flex-col"
      >
        <div className="space-y-1"></div>

        <StepProgress />
        <p className="text-sm font-normal text-[#677890] my-2">
          Book your move in minutes
        </p>
        {children}
      </div>
    </div>
  );
}

export default WidgetLayout;
