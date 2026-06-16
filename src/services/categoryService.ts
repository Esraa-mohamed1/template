// src/services/categoryService.ts
import { httpClient } from "./httpClient";
import { ENDPOINTS } from "../config/api";
import { ApiResponse, Category,CategoryWithProducts } from "../types/api";

export const categoryService = {
  // GET /categories
  getAll: () => httpClient.get<ApiResponse<Category[]>>(ENDPOINTS.categories.list),

  // GET /categories/:idOrSlug
  getOne: (idOrSlug: string | number) =>
    httpClient.get<ApiResponse<Category>>(ENDPOINTS.categories.detail(idOrSlug)),

  getAllWithProducts: () =>
    httpClient.get<ApiResponse<CategoryWithProducts[]>>(ENDPOINTS.categories.withProducts),

};