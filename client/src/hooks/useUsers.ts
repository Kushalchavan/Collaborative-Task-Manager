import { getUsers } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export type User = {
  id: string;
  name: string;
  email: string;
};

type UserResponse = {
  data: User[];
};

export const useUsers = () => {
  return useQuery<UserResponse>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
