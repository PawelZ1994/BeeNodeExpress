import { describe, it, expect, vi } from "vitest";
import * as pomiarRepository from "../repositories/temperatureRepository.js";
import { addMeasurement } from "./temperatureService.js";

describe("addMeasurement", () => {
  it("powinien zapisać temperaturę", async () => {
    vi.spyOn(pomiarRepository, "createTemperature").mockResolvedValue({
      status: "OK",
      id: 200,
    });

    const result = await addMeasurement(25);

    expect(result).toEqual({
      status: "OK",
      id: 200,
    });
  });
});
