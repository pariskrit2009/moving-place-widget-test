import { post } from "@/lib/api/client";
import type { EstimationRequest, EstimationResponse } from "./types";

export async function getEstimation(
  data: EstimationRequest,
): Promise<EstimationResponse> {
  return post<EstimationResponse>(
    "/quote/marketplace/estimations-lfs/",
    data,
  );
}
