import { describe, it, expect } from "vitest";
import validateTemperature from "./validateTemperature.js";

describe("validateTemperature", () => {
  it("powinien zaakceptować temperaturę 25", () => {
    const req = {
      body: {
        temperature: 25,
      },
    };

    const res = {};

    let nextCalled = false;

    const next = () => {
      nextCalled = true;
    };

    validateTemperature(req, res, next);

    expect(nextCalled).toBe(true);
    expect(req.body.temperature).toBe(25);
  });
  // -------------------------------------------------------------------------------------
  it("powinien odrzucić temperaturę większą niż 100", () => {
    const req = {
      body: {
        temperature: 150,
      },
    };

    const res = {
      status: (code) => {
        expect(code).toBe(400);

        return {
          json: (data) => {
            expect(data.error).toBe("Temp max 100");
          },
        };
      },
    };

    const next = () => {
      throw new Error("next() nie powinno zostać wywołane");
    };

    validateTemperature(req, res, next);
  });
});
