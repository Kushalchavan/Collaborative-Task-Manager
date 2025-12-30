import { prisma } from "../config/prisma";

export const findAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};
