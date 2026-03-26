import axiosInstance, { type AxiosInstanceType } from "./axios-instance";

// Generic GET request
export async function get<T>(
  url: string,
  config?: Parameters<AxiosInstanceType["get"]>[1],
) {
  const response = await axiosInstance.get<T>(url, config);
  return response.data;
}

// Generic POST request
export async function post<T>(
  url: string,
  data?: unknown,
  config?: Parameters<AxiosInstanceType["post"]>[2],
) {
  const response = await axiosInstance.post<T>(url, data, config);
  return response.data;
}

// Generic PUT request
export async function put<T>(
  url: string,
  data?: unknown,
  config?: Parameters<AxiosInstanceType["put"]>[2],
) {
  const response = await axiosInstance.put<T>(url, data, config);
  return response.data;
}

// Generic DELETE request
export async function del<T>(
  url: string,
  config?: Parameters<AxiosInstanceType["delete"]>[1],
) {
  const response = await axiosInstance.delete<T>(url, config);
  return response.data;
}
