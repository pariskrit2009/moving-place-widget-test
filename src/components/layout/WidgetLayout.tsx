import {
  useWidgetParams,
  useWidgetResize,
  useWidgetTheme,
} from "@/hooks";

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
        {children}
      </div>
    </div>
  );
}

export default WidgetLayout;
