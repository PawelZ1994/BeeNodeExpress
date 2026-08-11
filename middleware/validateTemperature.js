import { measurementSchema } from "../validators/measurementSchema.js";

const validateTemperature = (req, res, next) => {
  const result = measurementSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues[0].message,
    });
  }
  req.body = result.data;
  next();
};
export default validateTemperature;
