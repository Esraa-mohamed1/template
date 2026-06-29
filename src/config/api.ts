// src/config/api.ts

export const API_BASE_URL = "https://echomaster.shop/api/api/v1/front";
export const AUTH_BASE_URL = "https://echomaster.shop/api/api/v1/app/auth";
export const ADMIN_API_BASE_URL = "https://echomaster.shop/api/api/v1";

export const AUTH_ENDPOINTS = {
  register: "/register",
  login: "/login",
  socialLogin: "/social-login",
  me: "/me",
  refresh: "/refresh",
  logout: "/logout",
  profileUpdate: "/profile/update",
  changePassword: "/profile/change-password",
  sendOtp: "/send-otp",
  verifyOtp: "/verify-otp",
  forgetPasswordSendOtp: "/forget-password/send-otp",
  forgetPasswordVerifyOtp: "/forget-password/verify-otp",
};
export const ENDPOINTS = {
  categories: {
    list: "/categories",
    detail: (idOrSlug: string | number) => `/categories/${idOrSlug}`,
    withProducts: "/categoriesWithProduct",
  },
  products: {
    list: "/products",
    detail: (idOrSlug: string | number) => `/products/${idOrSlug}`,
    byCategory: (categorySlug: string | number) =>
      `/categories/${categorySlug}/products`,
  },
  homeSections: {
    list: "/home-sections",
    detail: (id: number) => `/home-sections/${id}`,
  },
};