import { addMeasurement } from "../services/pomiarServices.js";

export const addTemperature = async (req, res) => {
  const temp = parseFloat(req.body.temperatura);
  const [result] = await db.query(
    `INSERT INTO pomiary (temperatura) VALUES (?)`,
    [temp]
  );

  res.json({
    status: "OK",
    id: result.insertId,
  });
};
