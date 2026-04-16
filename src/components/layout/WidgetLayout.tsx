import {
  useWidgetParams,
  useWidgetResize,
  useWidgetTheme,
} from "@/hooks";
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
        <div className="space-y-1">
          <h1 className="text-[28px] font-bold leading-tight text-[#2e343e]">
            Book Your Move in Minutes
          </h1>
          <p className="text-sm font-normal text-[#2e343e]">
            Tell us about your move and we&apos;ll match you with the best
            options—fast and hassle-free
          </p>
        </div>

        <StepProgress />

        {children}
      </div>
    </div>
  );
}

export default WidgetLayout;
