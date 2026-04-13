import { api } from "./client";
import { ApiItemResponse, ApiListResponse, Product } from "../types";

export interface ProductFilters {
  offset?: number;
  limit?: number;
  search?: string;
  from?: string;
  to?: string;
}

export interface ProductPayload {
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
}

export const getProducts = async (filters: ProductFilters): Promise<ApiListResponse<Product>> => {
  const response = await api.get<ApiListResponse<Product>>("/products", { params: filters });
  return response.data;
};

export const createProductRequest = async (payload: ProductPayload): Promise<Product> => {
  const response = await api.post<ApiItemResponse<Product>>("/products", payload);
  return response.data.data;
};

export const updateProductRequest = async (id: string, payload: ProductPayload): Promise<Product> => {
  const response = await api.patch<ApiItemResponse<Product>>(`/products/${id}`, payload);
  return response.data.data;
};

export const deleteProductRequest = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
