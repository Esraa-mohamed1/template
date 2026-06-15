// src/services/homeSectionService.ts
import { httpClient } from "./httpClient";
import { ENDPOINTS } from "../config/api";
import { ApiResponse, HomeSection } from "../types/api";

export const homeSectionService = {
  // GET /home-sections
  getAll: () => httpClient.get<ApiResponse<HomeSection[]>>(ENDPOINTS.homeSections.list),

  // GET /home-sections/:id
  getOne: (id: number) =>
    httpClient.get<ApiResponse<HomeSection>>(ENDPOINTS.homeSections.detail(id)),
};