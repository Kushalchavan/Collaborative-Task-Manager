import type { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { API } from "./axios";

export const register = async (data: RegisterInput) => {
  const response = await API.post("/v1/auth/register", data);
  return response.data;
};

export const login = async (data: LoginInput) => {
  const response = await API.post("/v1/auth/login", data);
  return response.data;
};

export const getMe = async () => {
  const response = await API.get("/v1/auth/me");
  return response.data;
};

export const logout = async () => {
  const response = await API.post("/v1/auth/logout");
  return response.data;
};
