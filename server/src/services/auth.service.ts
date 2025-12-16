import bcrypt from "bcryptjs";
import { createUser, findByUserEmail } from "../repositories/auth.repository";
import { signToken } from "../utils/jwt";

export const registerService = async (
  name: string,
  email: string,
  password: string
) => {
  const hashed = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashed,
  });

  return signToken({ userId: user.id });
};

export const loginService = async (email: string, password: string) => {
  const user = await findByUserEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const matchUser = await bcrypt.compare(password, user.password);
  if (!matchUser) throw new Error("Invlaid credentials");

  return signToken({ userId: user.id });
};
