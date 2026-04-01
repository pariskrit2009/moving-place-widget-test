// Common widget types

export interface WidgetConfig {
  primaryColor?: string;
  borderRadius?: string;
  fontFamily?: string;
}

export interface Step {
  id: string;
  title: string;
  description?: string;
}

export interface FormData {
  locations?: LocationData;
  quote?: QuoteData;
  customize?: CustomizeData;
  checkout?: CheckoutData;
}

export interface LocationData {
  fromAddress?: string;
  toAddress?: string;
  moveDate?: string;
}

export interface QuoteData {
  price?: number;
  estimate?: string;
}

export interface CustomizeData {
  services?: string[];
  notes?: string;
}

export interface CheckoutData {
  email?: string;
  phone?: string;
  name?: string;
}

export type PageRoute =
  | "/"
  | "/quote"
  | "/customize"
  | "/checkout"
  | "/movers"
  | "/location";
