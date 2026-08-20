import db from "../config/db.js";

export const createUser = async (login, email, password, apiKey) => {
  const [result] = await db.query(
    `
    INSERT INTO users (login, email, password, apiKey)
    VALUES (?, ?, ?, ?)
    `,
    [login, email, password, apiKey]
  );

  return {
    id: result.insertId,
    login,
    email,
    apiKey,
  };
};

export const findUserByLogin = async (login) => {
  const [rows] = await db.query(
    `
    SELECT id, login, email, password, apiKey
    FROM users
    WHERE login = ?
    `,
    [login]
  );

  return rows[0];
};

export const findUserByApiKey = async (apiKey) => {
  const [rows] = await db.query(
    `
    SELECT id
    FROM users
    WHERE apiKey = ?
    `,
    [apiKey]
  );

  return rows[0];
};

// =====================================
// USUWANIE CAŁEGO KONTA
// =====================================

export const deleteUserAccount = async (userId) => {
  // 1. Pobieramy urządzenia użytkownika
  const [devices] = await db.query(
    `
    SELECT id
    FROM devices
    WHERE userId = ?
    `,
    [userId]
  );

  // 2. Usuwamy temperatury
  //    należące do urządzeń użytkownika
  for (const device of devices) {
    await db.query(
      `
      DELETE FROM temperatures
      WHERE deviceId = ?
      `,
      [device.id]
    );
  }

  // 3. Usuwamy urządzenia użytkownika
  await db.query(
    `
    DELETE FROM devices
    WHERE userId = ?
    `,
    [userId]
  );

  // 4. Na końcu usuwamy użytkownika
  const [result] = await db.query(
    `
    DELETE FROM users
    WHERE id = ?
    `,
    [userId]
  );

  return result.affectedRows > 0;
};
