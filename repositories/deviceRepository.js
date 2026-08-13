import db from "../config/db.js";

export const findDevice = async (userId, deviceName) => {
  const [rows] = await db.query(
    `
    SELECT id, userId, deviceName
    FROM devices
    WHERE userId = ? AND deviceName = ?
    `,
    [userId, deviceName]
  );

  return rows[0];
};
