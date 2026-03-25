import { useWidgetParams } from "@/hooks";

export function WidgetHeader() {
  const { theme } = useWidgetParams();

  return (
    <header className="border-b px-4 py-3 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Moving Place Widget</h1>
        <span className="text-sm text-gray-500" data-theme={theme}>
          Theme: {theme}
        </span>
      </div>
    </header>
  );
}

export default WidgetHeader;
