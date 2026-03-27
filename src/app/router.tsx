import { createBrowserRouter } from "react-router-dom";

import LocationsPage from "../pages/locations-page";
import QuotePage from "../pages/quote-page";
import CustomizePage from "../pages/customize-page";
import CheckoutPage from "../pages/checkout-page";
import SearchPage from "@/pages/search-page";

export const router = createBrowserRouter([
  { path: "/", element: <SearchPage /> },
  { path: "/location", element: <LocationsPage /> },
  { path: "/quote", element: <QuotePage /> },
  { path: "/customize", element: <CustomizePage /> },
  { path: "/checkout", element: <CheckoutPage /> },
]);
