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
