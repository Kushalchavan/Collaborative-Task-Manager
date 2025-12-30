import { API } from "./axios";

export const getUsers = async () => {
  const response = await API.get("/v1/users");
  return response.data;
};
