import crypto from "crypto";
import { createUser } from "../repository/userRepository.js";

export const registerUser = async (login, email, password) => {
  const apiKey = crypto.randomBytes(6).toString("hex");

  const user = await createUser(login, email, password, apiKey);

  return user;
};
