// src/services/paymentGatewayService.ts
import { httpClient } from "./httpClient";
import { ENDPOINTS } from "../config/api";
import { ApiResponse } from "../types/api";

export interface PaymentGateway {
  id: number;
  name: string;
  image: string;
  value: string | null;
  requires_receipt: 0 | 1;
  is_active: 0 | 1;
  created_at: string;
  updated_at: string;
}

export const paymentGatewayService = {
  // GET /front/payment-getway
  getAll: () =>
    httpClient.get<ApiResponse<PaymentGateway[]>>(ENDPOINTS.paymentGateways.list),
};