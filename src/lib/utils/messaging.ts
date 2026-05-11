export function postResize(hostOrigin: string, height?: number) {
  if (!hostOrigin || window.parent === window) {
    return;
  }
  const widget = document.querySelector("#widget-content");

  // window.parent.postMessage(
  //   {
  //     type: "WIDGET_RESIZE",
  //     payload: { height: Math.ceil(cappedHeight ?? 0) },
  //   },
  //   hostOrigin,
  // );
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
