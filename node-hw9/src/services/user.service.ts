import { AppDataSource } from "../data-source.ts";
import { User } from "../entity/users.entity.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export const loginUser = async (
  email: string,
  password: string
): Promise<string | { error: string }> => {
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    return { error: "User not found" };
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { error: "Invalid Password" };
  }

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
    expiresIn: "10h",
  });

  return token;
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<string | { error: string }> => {
  const existingEmail = await userRepository.findOne({ where: { email } });
  const existingUsername = await userRepository.findOne({
    where: { username },
  });

  if (existingEmail || existingUsername) {
    return { error: "User with this email or username already exists" };
  }

  const user = new User();
  user.email = email;
  user.username = username;
  user.password = await bcrypt.hash(password, 10);

  await user.save();

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
    expiresIn: "10h",
  });
  return token;
};
