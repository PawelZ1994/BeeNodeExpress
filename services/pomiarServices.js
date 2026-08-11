import db from "../config/db.js";

export const addMeasurement = async (req, res) => {
  const temp = parseFloat(req.body.temperatura);
  const [result] = await db.query(
    `INSERT INTO pomiary (temperatura) VALUES (?) `,
    [temp]
  );

  res.json({
    status: "OK",
    id: result.insertId,
  });
};
