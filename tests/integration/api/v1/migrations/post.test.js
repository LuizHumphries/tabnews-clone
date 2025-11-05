import database from "infra/database.js";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const responseFirst = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(responseFirst.status).toBe(201);
        const responseFirstBody = await responseFirst.json();
        expect(Array.isArray(responseFirstBody)).toBe(true);
        expect(responseFirstBody.length).toBeGreaterThan(0);
      });
      test("For the second time", async () => {
        const responseSecond = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(responseSecond.status).toBe(200);
        const responseSecondBody = await responseSecond.json();
        expect(Array.isArray(responseSecondBody)).toBe(true);
        expect(responseSecondBody.length).toBe(0);
      });
    });
  });
});
