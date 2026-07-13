import { httpClient } from "./httpClient";
import { ENDPOINTS } from "../config/api";
import { ApiResponse, ProductDetail, Review } from "../types/api";
import { tokenStorage } from "./authClient";

export const productService = {
  getOne: (idOrSlug: string | number) =>
    httpClient.get<ApiResponse<ProductDetail>>(ENDPOINTS.products.detail(idOrSlug)),
};

export class AuthRequiredError extends Error {
  constructor() {
    super("auth_required");
    this.name = "AuthRequiredError";
  }
}

const requireAuth = () => {
  if (!tokenStorage.get()) {
    throw new AuthRequiredError();
  }
};

export const reviewService = {
  create: (productId: number, data: { rating: number; comment: string; emoji?: string }) => {
    requireAuth();
    return httpClient.post<ApiResponse<Review>>(ENDPOINTS.reviews.create(productId), {
      ...data,
      product_id: productId,
    });
  },

  update: (reviewId: number, data: { rating: number; comment: string; emoji?: string }) => {
    requireAuth();
    return httpClient.put<ApiResponse<Review>>(ENDPOINTS.reviews.update(reviewId), data);
  },
};