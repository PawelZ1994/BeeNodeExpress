// import db from "../config/db.js";

// export const createTemperature = async (temp) => {
//   const [result] = await db.query(
//     `INSERT INTO temperatures (temperature) VALUES (?)`,
//     [temp]
//   );

//   return {
//     status: "OK",
//     id: result.insertId,
//   };
// };

import db from "../config/db.js";

export const createTemperature = async (deviceId, temperature) => {
  const [result] = await db.query(
    `
    INSERT INTO temperatures (deviceId, temperature)
    VALUES (?, ?)
    `,
    [deviceId, temperature]
  );

  return {
    status: "OK",
    id: result.insertId,
  };
};

//Znajdywanie temperatury i daty po urządzeniu:
export const findTemperaturesByDeviceAndDate = async (deviceId, date) => {
  const [rows] = await db.query(
    `
    SELECT id, temperature, measuredAt
    FROM temperatures
    WHERE deviceId = ?
      AND DATE(measuredAt) = ?
    ORDER BY measuredAt ASC
    `,
    [deviceId, date]
  );
  console.log("TEMPERATURES:", rows); // do testu

  return rows;
};
