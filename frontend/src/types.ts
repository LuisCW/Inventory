export type Role = "ADMIN" | "USER";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  active: boolean;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  active: boolean;
  creationAt: string;
  updatedAt: string;
}

export interface UserItem {
  _id: string;
  email: string;
  name: string;
  role: Role;
  active: boolean;
  creationAt: string;
  updatedAt: string;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: {
    total: number;
    offset: number;
    limit: number;
  };
}

export interface ApiItemResponse<T> {
  data: T;
}
