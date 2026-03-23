import { useEffect } from "react";

interface UseWidgetResizeOptions {
  hostOrigin: string;
  containerSelector?: string;
}

export function useWidgetResize({ hostOrigin, containerSelector = "#container" }: UseWidgetResizeOptions) {
  useEffect(() => {
    postResize(hostOrigin);

    const observer = new ResizeObserver(() => postResize(hostOrigin));
    observer.observe(document.body);

    return () => observer.disconnect();
  }, [hostOrigin, containerSelector]);
}
