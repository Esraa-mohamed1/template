// src/services/authClient.ts
import { AUTH_BASE_URL } from "../config/api";

const TOKEN_KEY = "ebuy_token";

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  auth?: boolean; // attach Bearer token
  isFormData?: boolean;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = false, isFormData = false } = options;

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = tokenStorage.get();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${AUTH_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    const message = data?.message || "Request failed";
    throw new AuthError(message, res.status, data);
  }

  return data as T;
}

export class AuthError extends Error {
  status: number;
  data: any;
  constructor(message: string, status: number, data: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export const authClient = {
  get: <T>(path: string, auth = true) => request<T>(path, { method: "GET", auth }),
  post: <T>(path: string, body?: any, auth = false) =>
    request<T>(path, { method: "POST", body, auth }),
  postForm: <T>(path: string, formData: FormData, auth = true) =>
    request<T>(path, { method: "POST", body: formData, auth, isFormData: true }),
};