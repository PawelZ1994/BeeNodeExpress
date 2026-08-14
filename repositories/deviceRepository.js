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

export const createDevice = async (userId, deviceName) => {
  const [result] = await db.query(
    `
    INSERT INTO devices (userId, deviceName)
    VALUES (?, ?)
    `,
    [userId, deviceName]
  );

  return {
    id: result.insertId,
    userId,
    deviceName,
  };
};

//znajdowanie wszystkich urządzeń danego użytkowniak potrzebne do wyswietlania w apliakcji
export const findDevicesByUserId = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT id, userId, deviceName
    FROM devices
    WHERE userId = ?
    `,
    [userId]
  );

  return rows;
};

// funkcja do znajdywania temperatur i dat
export const findDeviceByIdAndUserId = async (deviceId, userId) => {
  console.log("REPOSITORY deviceId:", deviceId);
  console.log("REPOSITORY userId:", userId);
  const [rows] = await db.query(
    `
    SELECT id, userId, deviceName
    FROM devices
    WHERE id = ? AND userId = ?
    `,
    [deviceId, userId]
  );
  console.log("SQL DEVICE:", rows); //do testu
  return rows[0];
};
