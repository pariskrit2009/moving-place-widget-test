export function postResize(hostOrigin: string, height?: number) {
  if (!hostOrigin || window.parent === window) {
    return;
  }

  const nextHeight =
    height ??
    document.querySelector("#widget-content")?.getBoundingClientRect().height ??
    0;

  window.parent.postMessage(
    {
      type: "WIDGET_RESIZE",
      payload: { height: Math.ceil(nextHeight) },
    },
    hostOrigin,
  );
}

export function postComplete(payload: { mode: "quote-only" | "checkout" }) {
  window.parent.postMessage(
    {
      type: "WIDGET_COMPLETE",
      payload,
    },
    "*",
  );
}
