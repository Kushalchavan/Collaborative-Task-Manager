import { registerService, loginService } from "../services/auth.service";
import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validations/auth.validation";

export const register = async (req: Request, res: Response) => {
  const body = registerSchema.parse(req.body);
  const token = await registerService(body.name, body.email, body.password);
  res.cookie("token", token, { httpOnly: true });
  res.status(201).json({ message: "User Registered successfully" });
};

export const login = async (req: Request, res: Response) => {
  const body = loginSchema.parse(req.body);
  const token = await loginService(body.email, body.password);
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "User LoggedIn successfully" });
};
