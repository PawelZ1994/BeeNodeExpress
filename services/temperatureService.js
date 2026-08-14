import { findUserByApiKey } from "../repositories/userRepository.js";
import {
  findDevice,
  createDevice,
  findDevicesByUserId,
  findDeviceByIdAndUserId,
} from "../repositories/deviceRepository.js";
import {
  createTemperature,
  findTemperaturesByDeviceAndDate,
} from "../repositories/temperatureRepository.js";

export const saveTemperature = async (apiKey, deviceName, temperature) => {
  // 1. Znajdujemy użytkownika po API key
  console.log("API KEY:", apiKey); //do tesu
  const user = await findUserByApiKey(apiKey);
  console.log("USER:", user); //do testu

  if (!user) {
    throw new Error("Nieprawidłowy API key");
  }
  // 2. Znajdujemy urządzenie użytkownika
  let device = await findDevice(user.id, deviceName);
  // if (!device) {
  //   throw new Error("Urządzenie nie istnieje");
  // }
  if (!device) {
    device = await createDevice(user.id, deviceName);
  }

  // 3. Zapisujemy temperaturę
  const result = await createTemperature(device.id, temperature);

  return result;
};

export const getUserDevices = async (userId) => {
  const devices = await findDevicesByUserId(userId);

  return devices;
};

export const getTemperaturesForDevice = async (userId, deviceId, date) => {
  const device = await findDevice(userId, deviceId);

  if (!device) {
    throw new Error("Urządzenie nie istnieje");
  }

  const temperatures = await findTemperaturesByDeviceAndDate(deviceId, date);

  return temperatures;
};

// import * as pomiarRepository from "../repositories/temperatureRepository.js";

// export const addMeasurement = async (temp) => {
//   // if (temp < -50 || temp > 100) {
//   //   throw new Error("Invalid temperature");
//   // }

//   return pomiarRepository.createTemperature(temp);
// };
