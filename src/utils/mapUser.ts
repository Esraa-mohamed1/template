// src/utils/mapUser.ts
import { AuthUser } from "../types/api";
import { User } from "../types";

export const mapAuthUserToUser = (u: AuthUser): User => ({
  id: String(u.id),
  name: u.name,
  email: u.email,
  phone: u.phone,
  avatar: u.image,
  role: u.role,
  isVerified: u.is_verified,
  joinedAt: u.created_at,
});