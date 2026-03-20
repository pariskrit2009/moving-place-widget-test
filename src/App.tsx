import { useEffect, useMemo, useState } from "react";
import "./index.css";
import { postResize } from "./messaging";

function useWidgetParams() {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);

    return {
      widgetKey: params.get("widgetKey") || "",
      theme: params.get("theme") || "light",
      primaryColor: params.get("primaryColor") || "#2563eb",
      hostOrigin: params.get("hostOrigin") || "",
    };
  }, []);
}

type Step = "locations" | "quotes" | "done";

export default function App() {
  const { widgetKey, theme, primaryColor, hostOrigin } = useWidgetParams();

  const [step, setStep] = useState<Step>("locations");
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [form, setForm] = useState({
    startLocation: "",
    endLocation: "",
    movingDate: "",
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty("--mp-primary", primaryColor);
  }, [theme, primaryColor]);

  useEffect(() => {
    postResize();
    const observer = new ResizeObserver(() => postResize());
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [step, loading, quotes]);

  const onChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onContinue = async () => {
    if (!form.startLocation || !form.endLocation || !form.movingDate) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // const data = await fetchQuotes(
      //   {
      //     ...form,
      //     hostOrigin,
      //   },
      //   widgetKey,
      // );

      // setQuotes(data?.quotes || []);
      setStep("quotes");
    } catch (error) {
      console.error(error);
      alert("Failed to load quotes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="widget-shell">
      <div className="card" id="container">
        <h1>Moving Place Widget</h1>
        <p>Enter move details</p>

        {step === "locations" && (
          <div className="flex flex-col items-start lg:flex-row lg:items-end">
            <div className="flex-1">
              <label>Start location</label>
              <input
                value={form.startLocation}
                onChange={(e) => onChange("startLocation", e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label>End location</label>
              <input
                value={form.endLocation}
                onChange={(e) => onChange("endLocation", e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label>Moving date</label>
              <input
                type="date"
                value={form.movingDate}
                onChange={(e) => onChange("movingDate", e.target.value)}
              />
            </div>

            <button onClick={onContinue} disabled={loading}>
              {loading ? "Loading quotes..." : "Continue"}
            </button>
          </div>
        )}

        {step === "quotes" && (
          <>
            <p>Top mover quotes</p>

            {quotes.length === 0 ? (
              <div className="quote-card">No quotes returned</div>
            ) : (
              quotes.map((quote, index) => (
                <div className="quote-card" key={index}>
                  <strong>{quote.name || `Mover ${index + 1}`}</strong>
                  <div>Price: {quote.price || "N/A"}</div>
                </div>
              ))
            )}

            <div className="actions">
              <button>Request Email Quote</button>
              <button>Continue to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
