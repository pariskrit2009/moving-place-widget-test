// export function useQuotes(locationsData: LocationsFormData) {
//   return useQuery<MoverQuote[]>({
//     queryKey: ["quotes", locationsData],
//     queryFn: () => submitLocations(locationsData),
//     enabled: !!locationsData.startLocation && !!locationsData.endLocation && !!locationsData.movingDate,
//   });
// }

import { useQuery } from "@tanstack/react-query";
import { getProvidersList } from "./api";

export function useProvidersList() {
  return useQuery({
    queryKey: ["providers", "list"],
    queryFn: getProvidersList,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
