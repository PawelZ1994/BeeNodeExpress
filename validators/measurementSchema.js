import { z } from "zod";

export const measurementSchema = z.object({
  apiKey: z.string().min(1, "API key jest wymagany"),

  deviceName: z.string().min(1, "Nazwa urządzenia jest wymagana"),

  temperature: z.coerce
    .number()
    .min(-50, "Temperatura nie może być mniejsza niż -50°C")
    .max(100, "Temperatura nie może być większa niż 100°C"),
});
