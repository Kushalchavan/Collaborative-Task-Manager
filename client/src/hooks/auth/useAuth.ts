import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, login, logout, register } from "../../api/auth.api";
import type { LoginInput, RegisterInput } from "../../schemas/auth.schema";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterInput) => register(data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginInput) => login(data),
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
    },
  });
};
