import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
  }

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res
    .status(statusCode)
    .json({ success: false, message, errors: err.errors || [] });
};
