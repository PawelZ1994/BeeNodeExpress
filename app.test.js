import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import * as pomiarRepository from "./repository/pomiarRepository.js";
import app from "./app.js";

describe("POST /app/dodaj", () => {
  it("powinien dodać temperaturę 25", async () => {
    vi.spyOn(pomiarRepository, "createTemperature").mockResolvedValue({
      status: "OK",
      id: 201,
    });

    const response = await request(app).post("/app/dodaj").send({
      temperatura: 25,
    });

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      status: "OK",
      id: 201,
    });
  });
  //----------------------------------------------------------------------------
  it("powinien odrzucić temperaturę większą niż 100", async () => {
    const response = await request(app).post("/app/dodaj").send({
      temperatura: 150,
    });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      error: "Temp max 100",
    });
  });
});
