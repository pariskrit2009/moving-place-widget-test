export function postResize() {
  const height =
    document.querySelector("#container")?.getBoundingClientRect().height ?? 0;
  window.parent.postMessage(
    {
      type: "WIDGET_RESIZE",
      payload: { height: height + 20 },
    },
    "*",
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
