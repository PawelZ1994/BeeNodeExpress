import { z } from "zod";

export const registerSchema = z.object({
  login: z.string().min(1, "Login jest wymagany"),
  email: z.string().email("Nieprawidłowy email"),
  password: z.string().min(1, "Hasło jest wymagane"),
});
