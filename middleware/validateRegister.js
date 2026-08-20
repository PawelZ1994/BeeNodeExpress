import { registerSchema } from "../validators/userSchema.js";

const validateRegister = (req, res, next) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      // path: result.error.issues[0].path,
      error: result.error.issues[0].message,
    });
  }

  req.body = result.data;
  next();
};

export default validateRegister;
