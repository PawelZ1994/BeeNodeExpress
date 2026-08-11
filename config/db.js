import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";

// console.log("DB HOST:", process.env.DATABASE_HOST);
// console.log("DB USER:", process.env.DATABASE_USER);
// console.log("DB DATABASE:", process.env.DATABASE);

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  charset: "utf8mb4",
});

// db.getConnection()
//   .then((connection) => {
//     console.log("POŁĄCZONO Z MYSQL");
//     connection.release();
//   })
//   .catch((err) => {
//     console.error("BŁĄD MYSQL:", err);
//   });
export default db;
