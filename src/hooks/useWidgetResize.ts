import { postResize } from "@/lib/utils/messaging";
import { useEffect } from "react";

interface UseWidgetResizeOptions {
  hostOrigin: string;
  containerSelector?: string;
}

export function useWidgetResize({
  hostOrigin,
  containerSelector = "#widget-content",
}: UseWidgetResizeOptions) {
  useEffect(() => {
    if (!hostOrigin || window.parent === window) {
      return;
    }

    const container = document.querySelector<HTMLElement>(containerSelector);

    if (!container) {
      return;
    }

    let frameId: number | null = null;
    let lastHeight = -1;

    const notifyParent = () => {
      frameId = null;

      const nextHeight = Math.ceil(container.getBoundingClientRect().height);

      if (nextHeight === lastHeight) {
        return;
      }

      lastHeight = nextHeight;
      postResize(hostOrigin, nextHeight);
    };

    const scheduleResize = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(notifyParent);
    };

    scheduleResize();

    const observer = new ResizeObserver(() => {
      scheduleResize();
    });

    observer.observe(container);
    window.addEventListener("load", scheduleResize);
    window.addEventListener("resize", scheduleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", scheduleResize);
      window.removeEventListener("resize", scheduleResize);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [hostOrigin, containerSelector]);
}
