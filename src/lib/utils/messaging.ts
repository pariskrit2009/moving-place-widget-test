export function postResize(hostOrigin: string, height?: number) {
  if (!hostOrigin || window.parent === window) {
    return;
  }
  const widget = document.querySelector("#widget-content");
  const cappedHeight = height && height > 600 ? 600 : height;

  if (height === 600) widget?.classList.add("overflow-y-auto");

  window.parent.postMessage(
    {
      type: "WIDGET_RESIZE",
      payload: { height: Math.ceil(cappedHeight ?? 0) },
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
