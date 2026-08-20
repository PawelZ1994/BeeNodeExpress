import {
  registerUser,
  loginUser,
  deleteAccount,
} from "../services/userServices.js";

export const register = async (req, res, next) => {
  try {
    const { login, email, password } = req.body;

    const user = await registerUser(login, email, password);

    res.status(201).json({
      message: "Konto zostało utworzone",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const user = await loginUser(login, password);

    res.status(200).json({
      message: "Zalogowano pomyślnie",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================
// USUWANIE KONTA
// =====================================

export const deleteUser = async (req, res, next) => {
  try {
    // userId pochodzi z JWT
    const userId = req.user.userId;

    const result = await deleteAccount(userId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
