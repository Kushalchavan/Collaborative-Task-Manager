import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../config/prisma";
import { getIO } from "../config/socket";
import {
  insertTask,
  findTaskByIdFromDb,
  findTaskByUserId,
  updateTaskById,
  deleteTaskById,
} from "../repositories/task.repository";
import { AppError } from "../utils/AppError";
import { sendTaskAssignmentEmail } from "./email.service";

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
  const task = await insertTask({
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

  const io = getIO(); // real time event
  io.emit("task:created", task);

  // email notification
  if (data.assignedToId) {
    try {
      const assignedUser = await prisma.user.findUnique({
        where: { id: data.assignedToId },
        select: { email: true, name: true },
      });

      const creator = await prisma.user.findUnique({
        where: { id: creatorId },
        select: { name: true },
      });

      if (assignedUser && creator) {
        await sendTaskAssignmentEmail({
          to: assignedUser.email,
          taskTitle: task.title,
          assignedBy: creator.name,
        });
      }
    } catch (error) {
      console.error("Email sending failed: ", error);
    }
  }
  return task;
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

  const updatedTask = await updateTaskById(taskId, data);

  const io = getIO();
  io.emit("task:updated", updatedTask);
  return updatedTask;
};

export const deleteTaskService = async (taskId: string, userId: string) => {
  const task = await findTaskByIdFromDb(taskId);
  if (!task) {
    throw new AppError("Task not found", 401);
  }

  if (task.createdById !== userId) {
    throw new AppError("Only creator can delete task", 401);
  }

  await deleteTaskById(taskId);

  const io = getIO();
  io.emit("task:deleted", taskId);
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
