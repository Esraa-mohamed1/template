// types/homeSection.ts

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
