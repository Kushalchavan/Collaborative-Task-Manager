import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getAllUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", authMiddleware, getAllUsers);

export default router;
