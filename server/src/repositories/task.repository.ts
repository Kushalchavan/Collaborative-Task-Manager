import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../config/prisma";

export const insertTask = (data: Prisma.TaskCreateInput) => {
  return prisma.task.create({ data });
};

export const findTaskByIdFromDb = (id: string) => {
  return prisma.task.findUnique({
    where: { id },
  });
};

export const updateTaskById = (id: string, data: Prisma.TaskUpdateInput) => {
  return prisma.task.update({ where: { id }, data });
};

export const deleteTaskById = (id: string) => {
  return prisma.task.delete({ where: { id } });
};

export const findTaskByUserId = (userId: string) => {
  return prisma.task.findMany({
    where: {
      createdById: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
