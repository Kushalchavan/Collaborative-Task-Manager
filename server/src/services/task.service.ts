import { Prisma } from "../../generated/prisma/client";
import {
  insertTask,
  findTaskByIdFromDb,
  findTaskByUserId,
  updateTaskById,
  deleteTaskById,
} from "../repositories/task.repository";
import { AppError } from "../utils/AppError";

export const createTaskService = async (
  data: {
    title: string;
    description: string;
    status: Prisma.TaskCreateInput["status"];
    priority: Prisma.TaskCreateInput["priority"];
    dueDate?: Date;
    assignedToId?: string;
  },
  creatorId: string
) => {
  return insertTask({
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    dueDate: data.dueDate,
    createdBy: {
      connect: { id: creatorId },
    },
    ...(data.assignedToId && {
      assignedTo: {
        connect: { id: data.assignedToId },
      },
    }),
  });
};

export const updateTaskService = async (
  taskId: string,
  data: Prisma.TaskUpdateInput,
  userId: string
) => {
  const task = await findTaskByIdFromDb(taskId);
  if (!task) {
    throw new AppError("Task not found", 401);
  }

  if (task.createdById !== userId) {
    throw new AppError("Only creator can update task", 401);
  }

  return updateTaskById(taskId, data);
};

export const deleteTaskService = async (taskId: string, userId: string) => {
  const task = await findTaskByIdFromDb(taskId);
  if (!task) {
    throw new AppError("Task not found", 401);
  }

  if (task.createdById !== userId) {
    throw new AppError("Only creator can delete task", 401);
  }

  return deleteTaskById(taskId);
};

export const getTaskByIdService = async (taskId: string, userId: string) => {
  const task = await findTaskByIdFromDb(taskId);
  if (!task) {
    throw new AppError("Task not found!", 401);
  }

  // Auth check
  if (task.createdById !== userId && task.assignedToId !== userId) {
    throw new AppError("Not authorized to view task", 401);
  }

  return task;
};

export const getTaskByUserService = async (userId: string) => {
  return findTaskByUserId(userId);
};
