import { z } from "zod";

export const taskSchemaEnum = z.enum(["todo", "in-progress", "done"]);

export const taskPriorityEnum = z.enum(["low", "medium", "high"]);

export const createTaskSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  description: z.string().optional(),
  status: taskSchemaEnum,
  priority: taskPriorityEnum,
  dueDate: z.string().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
