import { httpClient } from "./httpClient";
import { Governorate } from "../types/api";

export type ShippingMethodType = "free" | "flat" | "percentage" | "governorate";

export interface ShippingMethod {
  id: number;
  name: string;
  type: ShippingMethodType;
  flat_rate: string | null;
  percentage_value: string | null;
  is_active: 0 | 1;
}

export interface ShippingConfigResponse {
  shipping_method: ShippingMethod;
  governorates: Governorate[];
}

export const governorateService = {
  getShippingConfig: () =>
    httpClient.get<{ success: boolean; status: number; data: ShippingConfigResponse }>(
      "/governorate",
    ),
};