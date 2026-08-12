import { registerUser } from "../services/userServices.js";

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
