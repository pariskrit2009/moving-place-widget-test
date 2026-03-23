import { useMemo } from "react";

export interface WidgetParams {
  widgetKey: string;
  theme: string;
  primaryColor: string;
  hostOrigin: string;
}

export function useWidgetParams(): WidgetParams {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);

    return {
      widgetKey: params.get("widgetKey") ?? "",
      theme: params.get("theme") ?? "light",
      primaryColor: params.get("primaryColor") ?? "#2563eb",
      hostOrigin: params.get("hostOrigin") ?? "",
    };
  }, []);
}
