// import { addMeasurement } from "../services/temperatureService.js";

// export const addTemperature = async (req, res) => {
//   // const temp = parseFloat(req.body.temperatura);
//   const temp = req.body.temperature;
//   const result = await addMeasurement(temp);
//   res.json(result);
// };

import { saveTemperature } from "../services/temperatureService.js";

export const addTemperature = async (req, res) => {
  const { apiKey, deviceName, temperature } = req.body;

  try {
    const result = await saveTemperature(apiKey, deviceName, temperature);

    res.status(201).json({
      message: "Temperatura zapisana",
      id: result.id,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
