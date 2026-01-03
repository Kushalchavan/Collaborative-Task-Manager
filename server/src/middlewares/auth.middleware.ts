import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";
import { prisma } from "../config/prisma";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;
  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  try {
    const decoded = verifyToken(token) as { id?: string };
    if (!decoded?.id) {
      throw new AppError("Invalid token payload", 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    
    if (!user) {
      throw new AppError("User not found", 401);
    }

    req.user = user;
    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
};
