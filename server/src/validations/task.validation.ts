import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
  status: z.enum(["todo", "in-progress", "done"]).transform((val) => {
    if (val === "todo") return "TODO";
    if (val === "in-progress") return "IN_PROGRESS";
    return "DONE";
  }),
  priority: z.enum(["low", "medium", "high"]).transform((val) => {
    if (val === "low") return "LOW";
    if (val === "medium") return "MEDIUM";
    return "HIGH";
  }),
  dueDate: z.coerce.date().optional(),
  assignedToId: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]).transform((val) => {
    if (val === "todo") return "TODO";
    if (val === "in-progress") return "IN_PROGRESS";
    return "DONE";
  }),
  priority: z.enum(["low", "medium", "high"]).transform((val) => {
    if (val === "low") return "LOW";
    if (val === "medium") return "MEDIUM";
    return "HIGH";
  }),
  dueDate: z.coerce.date().optional(),
  assignedToId: z.string().optional(),
});
