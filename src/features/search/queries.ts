// export function useQuotes(locationsData: LocationsFormData) {
//   return useQuery<MoverQuote[]>({
//     queryKey: ["quotes", locationsData],
//     queryFn: () => submitLocations(locationsData),
//     enabled: !!locationsData.startLocation && !!locationsData.endLocation && !!locationsData.movingDate,
//   });
// }

import { useQuery } from "@tanstack/react-query";
import { getLocationsHistory } from "./api";

export function useLocationsHistory() {
  return useQuery({
    queryKey: ["locations", "history"],
    queryFn: getLocationsHistory,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
