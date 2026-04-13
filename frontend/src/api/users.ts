import { api } from "./client";
import { ApiItemResponse, ApiListResponse, UserItem } from "../types";

export interface UserFilters {
  offset?: number;
  limit?: number;
  active?: boolean;
}

export const getUsers = async (filters: UserFilters): Promise<ApiListResponse<UserItem>> => {
  const response = await api.get<ApiListResponse<UserItem>>("/users", { params: filters });
  return response.data;
};

export const updateUserRequest = async (
  id: string,
  payload: { name?: string; role?: "ADMIN" | "USER"; active?: boolean }
): Promise<UserItem> => {
  const response = await api.patch<ApiItemResponse<UserItem>>(`/users/${id}`, payload);
  return response.data.data;
};

export const updateUserStatusRequest = async (id: string, active: boolean): Promise<UserItem> => {
  const response = await api.patch<ApiItemResponse<UserItem>>(`/users/${id}/status`, { active });
  return response.data.data;
};
