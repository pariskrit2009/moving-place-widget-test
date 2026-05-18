export interface EstimationRequest {
  originZip: string;
  destinationZip: string;
  originAddressType: string;
  originBedroomCount: number;
}

export interface EstimationResponse {
  laborHours: number;
  crewSize: number;
  truckSizeRange: string;
}
