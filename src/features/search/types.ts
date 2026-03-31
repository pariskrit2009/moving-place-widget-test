export interface PlaceSuggestion {
  placeId: string;
  description: string;
}

export interface PlaceSearchResponse {
  suggestions: PlaceSuggestion[];
}
