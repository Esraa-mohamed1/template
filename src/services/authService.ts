// src/services/authService.ts
import { authClient, tokenStorage } from "./authClient";
import { AUTH_ENDPOINTS } from "../config/api";
import {
  AuthResponse,
  MeResponse,
  OtpSendResponse,
  OtpVerifyResponse,
  AuthUser,
} from "../types/api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginPayload {
  login: string; // email or phone
  password: string;
}

export const authService = {
  register: (payload: RegisterPayload) =>
    authClient.post<AuthResponse>(AUTH_ENDPOINTS.register, payload),

  login: (payload: LoginPayload) =>
    authClient.post<AuthResponse>(AUTH_ENDPOINTS.login, payload),

  me: () => authClient.get<MeResponse>(AUTH_ENDPOINTS.me),

  logout: () => authClient.post(AUTH_ENDPOINTS.logout, undefined, true),

  refresh: () => authClient.post<AuthResponse>(AUTH_ENDPOINTS.refresh, undefined, true),

  updateProfile: (formData: FormData) =>
    authClient.postForm<MeResponse>(AUTH_ENDPOINTS.profileUpdate, formData),

  changePassword: (payload: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }) => authClient.post(AUTH_ENDPOINTS.changePassword, payload, true),

  // Register flow OTP
  sendOtp: (identifier: string) =>
    authClient.post<OtpSendResponse>(AUTH_ENDPOINTS.sendOtp, { identifier }),

  verifyOtp: (identifier: string, otp: string) =>
    authClient.post<OtpVerifyResponse>(AUTH_ENDPOINTS.verifyOtp, { identifier, otp }),

  // Forget password flow
  forgetPasswordSendOtp: (identifier: string) =>
    authClient.post<OtpSendResponse>(AUTH_ENDPOINTS.forgetPasswordSendOtp, { identifier }),

  forgetPasswordVerifyOtp: (identifier: string, otp: string, password: string) =>
    authClient.post<OtpVerifyResponse>(AUTH_ENDPOINTS.forgetPasswordVerifyOtp, {
      identifier,
      otp,
      password,
    }),
};

export const authStorage = tokenStorage;