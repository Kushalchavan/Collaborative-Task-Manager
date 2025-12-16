import { prisma } from "../config/prisma";

export const createUser = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return prisma.user.create({ data });
};

export const findByUserEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};
