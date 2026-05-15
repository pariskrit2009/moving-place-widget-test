export interface Provider {
  name: string;
  moves: number;
  yearsInBusiness: number;
  rating: number;
  reviews: number;
  summary: string;
  avatar?: string;
}

export interface ServiceItem {
  type: "loading" | "unloading";
  date: string;
  location: string;
  startingPrice: number;
  provider: Provider;
  movers: number;
  hours: number;
}

export interface MoverQuote {
  id: string;
  totalPrice: number;
  lowestPrice: number;
  topRatedPrice: number;
  services: ServiceItem[];
}

export interface MoverItem {
  id: string;
  provider: Provider;
  price: number;
  priceLabel: string;
  movers: number;
  hours: number;
  hasTruck: boolean;
}
