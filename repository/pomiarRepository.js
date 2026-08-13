import db from "../config/db.js";

export const createTemperature = async (temp) => {
  const [result] = await db.query(
    `INSERT INTO temperatures (temperature) VALUES (?)`,
    [temp]
  );

  return {
    status: "OK",
    id: result.insertId,
  };
};
