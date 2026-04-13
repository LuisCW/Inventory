import { api } from "./client";
import { AuthUser } from "../types";

interface AuthResponse {
  data: {
    token: string;
    user: AuthUser;
  };
}

export const loginRequest = async (email: string, password: string): Promise<AuthResponse["data"]> => {
  const response = await api.post<AuthResponse>("/auth/login", { email, password });
  return response.data.data;
};

export const registerRequest = async (payload: {
  email: string;
  password: string;
  name: string;
}): Promise<AuthResponse["data"]> => {
  const response = await api.post<AuthResponse>("/auth/register", payload);
  return response.data.data;
};
