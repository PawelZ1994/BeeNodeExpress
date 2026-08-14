import {
  saveTemperature,
  getUserDevices,
  getTemperaturesForDevice
} from "../services/temperatureService.js";

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

export const getDevices = async (req, res, next) => {
  try {
    const devices = await getUserDevices(req.user.userId);

    res.status(200).json(devices);
  } catch (error) {
    next(error);
  }
};

//pobór temperatur z danego urządzenia
export const getDeviceTemperatures = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const { date } = req.query;

    const temperatures = await getTemperaturesForDevice(
      req.user.userId,
      deviceId,
      date
    );

    res.status(200).json(temperatures);
  } catch (error) {
    next(error);
  }
};

// import { addMeasurement } from "../services/temperatureService.js";

// export const addTemperature = async (req, res) => {
//   // const temp = parseFloat(req.body.temperatura);
//   const temp = req.body.temperature;
//   const result = await addMeasurement(temp);
//   res.json(result);
// };
