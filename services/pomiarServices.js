import * as pomiarRepository from "../repository/pomiarRepository.js";

export const addMeasurement = async (temp) => {
  // if (temp < -50 || temp > 100) {
  //   throw new Error("Invalid temperature");
  // }

  return pomiarRepository.createTemperature(temp);
};
