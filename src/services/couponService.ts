import { httpClient } from "./httpClient";
import { ENDPOINTS } from "../config/api";
import { ApiResponse, Coupon, ApplyCouponPayload } from "../types/api";

export const couponService = {
  getAllActive: () => {
    return httpClient.get<ApiResponse<Coupon[]>>(ENDPOINTS.coupons.list);
  },

  apply: (payload: ApplyCouponPayload) => {
    return httpClient.post<ApiResponse<Coupon>>(ENDPOINTS.coupons.apply, payload);
  },
};