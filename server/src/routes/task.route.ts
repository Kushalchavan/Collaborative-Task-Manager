import { Router } from "express";
import {
  createTask,
  deleteTask,
  getMyTasks,
  getTaskById,
  updateTask,
} from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.post("/", createTask);
router.get("/", getMyTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
