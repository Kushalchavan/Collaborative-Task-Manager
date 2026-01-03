import { registerService, loginService } from "../services/auth.service";
import { Request, Response, CookieOptions } from "express";
import { registerSchema, loginSchema } from "../validations/auth.validation";
import { asyncHandler } from "../utils/asyncHandler";

const isProd = process.env.NODE_ENV === "production";
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse(req.body);
  const token = await registerService(body.name, body.email, body.password);

  res.cookie("token", token, cookieOptions);
  res.status(201).json({ message: "User Registered successfully" });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = loginSchema.parse(req.body);
  const token = await loginService(body.email, body.password);

  res.cookie("token", token, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "User LoggedIn successfully" });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "User logged out successfully" });
});
