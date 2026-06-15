// src/types/api.ts

// Generic wrapper matching the backend response shape:
// { status, message, data, meta? }
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  meta?: ApiMeta;
}

export interface ApiMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Category model (matches /api/v1/categories response)
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_featured: number;
  sort_order: number;
  is_active: number;
  meta_title: string | null;
  meta_description: string | null;
  promotional_text: string | null;
  created_at: string;
  updated_at: string;
  image: string | null;
}
export interface ProductThumbnail {
  id: number;
  product_id: number;
  image: string;
  is_primary: number;
  sort_order: number;
}

export interface SectionProduct {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  price: string;
  compare_price: string;
  is_active: number;
  is_featured: number;
  average_rating: string;
  reviews_count: number;
  thumbnail: ProductThumbnail | null;
}

export interface HomeSection {
  id: number;
  title: string;
  color: string;
  sort_order: number;
  is_active: number;
  products: SectionProduct[];
}

 
export interface CategoryProduct {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  price: string;
  compare_price: string;
  is_active: number;
  is_featured: number;
  average_rating: string;
  reviews_count: number;
  thumbnail: ProductThumbnail | null;
}

export interface CategoryWithProducts {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_featured: number;
  sort_order: number;
  is_active: number;
  image: string | null;
  products: CategoryProduct[];
}

// for products

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProductGalleryImage {
  id: number;
  image: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductVariant {
  id: number;
  sku: string;
  color: string;
  storage: string;
  size: string;
  price_adjustment: number;
  stock: number;
  is_active: boolean;
}

export interface ProductDetail {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  sku: string;
  price: string;
  compare_price: string;
  cost_price: string;
  track_stock: number;
  stock_quantity: number;
  low_stock_threshold: number;
  is_active: number;
  is_featured: number;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  views_count: number;
  average_rating: string;
  reviews_count: number;
  created_at: string;
  updated_at: string;
  is_low_stock: boolean | null;
  is_in_stock: boolean | null;
  category: ProductCategory;
  gallery: ProductGalleryImage[];
  variants: ProductVariant[];
}

/////
// src/types/api.ts (add)
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  user_name: string | null;
  whtsapp: string | null;
  country_code: string | null;
  is_active: number;
  is_verified: boolean;
  role: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  profile_completion?: {
    percentage: number;
    completed_fields: string[];
    missing_fields: string[];
  };
}

export interface AuthResponse {
  status: boolean;
  user: AuthUser;
  authorisation: {
    token: string;
    type: string;
    expires_in?: number;
  };
}
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
  role?: string;
  isVerified?: boolean;
  joinedAt?: string;
}
export interface MeResponse {
  success: boolean;
  status: number;
  data: AuthUser;
}

export interface OtpSendResponse {
  success: boolean;
  message: string;
  expires_at: number;
  otp?: string; // dev only - remove in production
}

export interface OtpVerifyResponse {
  success: boolean;
  status?: number;
  message: string;
}