import {  Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";

// Insert task
export const insertTask = (data: Prisma.TaskCreateInput) => {
  return prisma.task.create({ data });
};

// Find task
export const findTaskByIdFromDb = (id: string) => {
  return prisma.task.findUnique({
    where: { id },
  });
};

// Update TAsk
export const updateTaskById = (id: string, data: Prisma.TaskUpdateInput) => {
  return prisma.task.update({ where: { id }, data });
};

// Delete Task
export const deleteTaskById = (id: string) => {
  return prisma.task.delete({ where: { id } });
};

// Find task with user id
export const findTaskByUserId = (userId: string) => {
  return prisma.task.findMany({
    where: {
      OR: [{ createdById: userId }, { assignedToId: userId }],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
