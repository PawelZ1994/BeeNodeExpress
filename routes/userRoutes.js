import express from "express";
import { register, login, deleteUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validateRegister from "../middleware/validateRegister.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", login);

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Jesteś zalogowany",
    user: req.user,
  });
});

// ===============================
// USUNIĘCIE KONTA
// ===============================

router.delete("/account", authMiddleware, deleteUser);

export default router;
