import db from "../config/db.js";

export const createTemperature = async (temp) => {
  const [result] = await db.query(
    `INSERT INTO pomiary (temperatura) VALUES (?)`,
    [temp]
  );

  return {
    status: "OK",
    id: result.insertId,
  };
};
