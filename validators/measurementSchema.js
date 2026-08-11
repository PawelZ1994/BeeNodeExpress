import { z } from "zod";

export const measurementSchema = z.object({
  temperatura: z.coerce
    .number()
    .min(-50, "Temperatura nie moze być mniejsza niż -50 st C")
    .max(100, "Temp max 100"),
});
