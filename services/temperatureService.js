// import * as pomiarRepository from "../repositories/temperatureRepository.js";

// export const addMeasurement = async (temp) => {
//   // if (temp < -50 || temp > 100) {
//   //   throw new Error("Invalid temperature");
//   // }

//   return pomiarRepository.createTemperature(temp);
// };

import { findUserByApiKey } from "../repositories/userRepository.js";
import { findDevice, createDevice } from "../repositories/deviceRepository.js";
import { createTemperature } from "../repositories/temperatureRepository.js";

export const saveTemperature = async (apiKey, deviceName, temperature) => {
  // 1. Znajdujemy użytkownika po API key
  const user = await findUserByApiKey(apiKey);

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
