import { httpClient } from "./httpClient";
import { ENDPOINTS } from "../config/api";
import { ApiResponse } from "../types/api";
import { OrderPayload } from "../pages/CheckoutPage"; // عدّل المسار حسب مكان الملف

export interface CreatedOrder {
  order_id: number;
  order_number?: string;
  [key: string]: any;
}

export const orderService = {
  // POST /order
  create: (payload: OrderPayload, receipt?: File | null) => {
    if (receipt) {
      const formData = new FormData();
      formData.append("order", JSON.stringify(payload));
      formData.append("receipt", receipt);

      return httpClient.post<ApiResponse<CreatedOrder>>(
        ENDPOINTS.orders.create,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
    }

    return httpClient.post<ApiResponse<CreatedOrder>>(
      ENDPOINTS.orders.create,
      payload,
    );
  },
};