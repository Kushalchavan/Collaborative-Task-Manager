import { API } from "./axios";

export type CreateTaskInput = {
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  assignedToId?: string;
};

export type UpdateTaskInput = Partial<CreateTaskInput>;

export const createTask = async (data: CreateTaskInput) => {
  const response = await API.post("/v1/task", data);
  return response.data;
};

export const getTasks = async () => {
  const response = await API.get("/v1/task");
  return response.data;
};

export const updateTask = async (id: string, data: UpdateTaskInput) => {
  const response = await API.put(`/v1/task/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await API.delete(`/v1/task/${id}`);
  return response.data;
};

export const getTaskById = async (id: string) => {
  const response = await API.get(`/v1/task/${id}`);
  return response.data;
};
