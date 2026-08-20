import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByLogin,
  deleteUserAccount,
} from "../repositories/userRepository.js";

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

  //jwt----------------------
  const token = jwt.sign(
    {
      userId: user.id,
      login: user.login,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  //-------------------------
  return {
    id: user.id,
    login: user.login,
    email: user.email,
    apiKey: user.apiKey,
    token, //dodany token
  };
};

// =====================================
// USUWANIE KONTA
// =====================================

export const deleteAccount = async (userId) => {
  const deleted = await deleteUserAccount(userId);

  if (!deleted) {
    throw new Error("Nie znaleziono użytkownika");
  }

  return {
    message: "Konto zostało usunięte",
  };
};
