import bcrypt from "bcryptjs";
import { createUser, findByUserEmail } from "../repositories/auth.repository";
import { signToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

export const registerService = async (
  name: string,
  email: string,
  password: string
) => {
  let existingUser = await findByUserEmail(email);
  if (existingUser) {
    throw new AppError("User Already Exists", 409);
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashed,
  });

  return signToken({ id: user.id });
};

export const loginService = async (email: string, password: string) => {
  const user = await findByUserEmail(email);
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const matchUser = await bcrypt.compare(password, user.password);
  if (!matchUser) {
    throw new AppError("Invlaid credentials", 401);
  }

  return signToken({ id: user.id });
};
