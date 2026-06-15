export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedAt: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
  items: CartItem[];
}

export interface Transaction {
  id: string;
  orderId: string;
  date: string;
  amount: number;
  method: string;
  status: 'Successful' | 'Pending';
}

export interface Product {
  name: string;
  price: number;
  img: string;
  oldPrice?: number;
  discount?: number;
  rating?: number;
  id?: string;
  description?: string;
  gallery?: string[];
  category?: string; // ✅ optional
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
