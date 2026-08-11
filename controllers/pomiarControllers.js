import { addMeasurement } from "../services/pomiarServices.js";

export const addTemperature = async (req, res) => {
  const temp = parseFloat(req.body.temperatura);
  const result = await addMeasurement(temp);
  res.json(result);
};
