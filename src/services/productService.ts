import { httpClient } from "./httpClient";
import { ENDPOINTS } from "../config/api";
import { ApiResponse, ProductDetail } from "../types/api";

export const productService = {
  // GET /products/:idOrSlug
  getOne: (idOrSlug: string | number) =>
    httpClient.get<ApiResponse<ProductDetail>>(ENDPOINTS.products.detail(idOrSlug)),
};