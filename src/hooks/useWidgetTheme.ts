import { useEffect } from "react";
import { useWidgetParams } from "./useWidgetParams";

export function useWidgetTheme() {
  const { theme, primaryColor, secondaryColor, hostOrigin } = useWidgetParams();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty("--primary", primaryColor);
    document.documentElement.style.setProperty("--secondary", secondaryColor);
  }, [theme, primaryColor, secondaryColor]);

  return { theme, primaryColor, hostOrigin };
}
