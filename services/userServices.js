import bcrypt from "bcrypt";
import crypto from "crypto";
import { createUser, findUserByLogin } from "../repository/userRepository.js";

export const registerUser = async (login, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 12);

  const apiKey = crypto.randomBytes(6).toString("hex");

  const user = await createUser(login, email, hashedPassword, apiKey);

  return user;
};

export const loginUser = async (login, password) => {
  const user = await findUserByLogin(login);

  if (!user) {
    throw new Error("Nieprawidłowy login lub hasło");
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    throw new Error("Nieprawidłowy login lub hasło");
  }

  return {
    id: user.id,
    login: user.login,
    email: user.email,
    apiKey: user.apiKey,
  };
};
