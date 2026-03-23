import { useEffect } from "react";
import { useWidgetParams } from "./useWidgetParams";

export function useWidgetTheme() {
  const { theme, primaryColor, hostOrigin } = useWidgetParams();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty("--mp-primary", primaryColor);
  }, [theme, primaryColor]);

  return { theme, primaryColor, hostOrigin };
}
