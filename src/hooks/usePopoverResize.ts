import { useEffect, useRef } from "react";
import { postResize } from "@/lib/utils/messaging";

const DEFAULT_POPOVER_SELECTOR = "#popover-content";
const DEFAULT_IFRAME_HEIGHT = 694;
const BOTTOM_BUFFER = 16;

interface UsePopoverResizeOptions {
  isPopoverOpen: boolean;
  hostOrigin: string;
  popoverSelector?: string;
  defaultIframeHeight?: number;
}

export function usePopoverResize({
  isPopoverOpen,
  hostOrigin,
  popoverSelector = DEFAULT_POPOVER_SELECTOR,
  defaultIframeHeight = DEFAULT_IFRAME_HEIGHT,
}: UsePopoverResizeOptions) {
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!hostOrigin || window.parent === window) {
      return;
    }

    if (isPopoverOpen) {
      wasOpenRef.current = true;

      const rafId = requestAnimationFrame(() => {
        const popover = document.querySelector<HTMLElement>(popoverSelector);
        if (!popover) return;

        const popoverRect = popover.getBoundingClientRect();
        const iframeHeight = window.innerHeight;
        const requiredHeight = Math.ceil(popoverRect.bottom + BOTTOM_BUFFER);

        if (requiredHeight > iframeHeight) {
          postResize(hostOrigin, requiredHeight);
        }
      });

      return () => cancelAnimationFrame(rafId);
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      postResize(hostOrigin, defaultIframeHeight);
    }
  }, [isPopoverOpen, hostOrigin, popoverSelector, defaultIframeHeight]);

  useEffect(() => {
    return () => {
      if (wasOpenRef.current) {
        postResize(hostOrigin, defaultIframeHeight);
      }
    };
  }, [hostOrigin, defaultIframeHeight]);
}
