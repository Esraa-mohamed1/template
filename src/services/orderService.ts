import { Order, Transaction, CartItem } from "../types";
import { httpClient } from "./httpClient";
import { ENDPOINTS } from "../config/api";
import { ApiResponse } from "../types/api";
import { OrderPayload } from "../pages/CheckoutPage";

export const createOrder = (items: CartItem[], total: number): Order => {
  return {
    id: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    total: total,
    status: "Processing",
    items: [...items],
  };
};

export const createTransaction = (
  orderId: string,
  amount: number,
  method: string,
): Transaction => {
  return {
    id: "TRX-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    orderId: orderId,
    date: new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    amount: amount,
    method: method,
    status: "Successful",
  };
};

export interface CreatedOrder {
  order_id: number;
  order_number?: string;
  [key: string]: any;
}

export const orderService = {
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
