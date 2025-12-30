import { findAllUsers } from "../repositories/user.repository";

export const getAllUserService = async () => {
  return findAllUsers();
};
