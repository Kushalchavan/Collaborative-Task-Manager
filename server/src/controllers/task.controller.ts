import { Response, Request } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createTaskService,
  deleteTaskService,
  getTaskByIdService,
  getTaskByUserService,
  updateTaskService,
} from "../services/task.service";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validations/task.validation";

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const body = createTaskSchema.parse(req.body);
  const task = await createTaskService(body, req.user.id);

  res.status(201).json({
    message: "Task created successfully",
    data: task,
  });
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const task = await getTaskByIdService(req.params.id, req.user.id);
  res.status(200).json({ data: task });
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const body = updateTaskSchema.parse(req.body);

  const task = await updateTaskService(req.params.id, body, req.user.id);

  res.status(200).json({
    messge: "Task updated successfuly",
    data: task,
  });
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  await deleteTaskService(req.params.id, req.user.id);
  return res.status(204).json({ message: "Task Deleted successfully" }).send();
});

export const getMyTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await getTaskByUserService(req.user.id);
  return res.status(200).json({
    data: tasks,
  });
});
