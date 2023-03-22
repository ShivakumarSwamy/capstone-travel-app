const request = require("supertest");
const { app, server } = require("./index.js");

describe("App Server", () => {

  afterAll(function() {
    server.close();
  });

  test("app should be defined", () => {
    expect(app).toBeDefined();
  });

  test("server should be defined", () => {
    expect(server).toBeDefined();
  });

  test("should return a response with status 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});