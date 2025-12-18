import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    throw new AppError("Unauthorize", 401);
  }

  try {
    const decoded = verifyToken(token) as { id: string };
    if (!decoded.id) {
      throw new AppError("Invalid token payload", 401);
    }

    req.user = { id: decoded.id };
    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
};
