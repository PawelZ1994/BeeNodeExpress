import { addMeasurement } from "../services/pomiarServices.js";

export const addTemperature = async (req, res) => {
  // const temp = parseFloat(req.body.temperatura);
  const temp = req.body.temperature;
  const result = await addMeasurement(temp);
  res.json(result);
};
