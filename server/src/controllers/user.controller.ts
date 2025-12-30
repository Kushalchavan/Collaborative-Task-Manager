import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getAllUserService } from "../services/user.service";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await getAllUserService();

  res.status(200).json({
    data: users,
  });
});
