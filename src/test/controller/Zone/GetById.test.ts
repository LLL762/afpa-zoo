import UriConfigs from "../../../configs/UriConfigs";
import App from "../../../init/App";
import Server from "../../../init/Server";
import ZoneMock from "../../mock-data/ZoneMock";
import { jest } from "@jest/globals";
import request from "supertest";
import { Error } from "mongoose";

const app = App.init();
const URIS = UriConfigs.URIS;
const data = ZoneMock.createData();

const zoneService = require("../../../service/ZoneService");
jest.mock("../../../service/ZoneService", () => ({
  findById: jest.fn(),
}));

beforeAll(() => {
  Server.init(app);
});

afterAll(() => {
  Server.close();
});

describe("Get by id endpoint tests", () => {
  const baseUrl = URIS.base + URIS.zones;

  it("when [valid] res should [contain data]", async () => {
    const expectedZone = data[0];
    const url = baseUrl + "/" + data[0]._id.toString();

    zoneService.findById.mockImplementation(() => expectedZone);
    const res = await request(app)
      .get(url)
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.url).toBe(url);
    expect(res.body.data.zone).toStrictEqual(expectedZone);
  });

  it("when [id param not mongoId] res should [contain errors]", async () => {
    const url = baseUrl + "/" + 37;

    zoneService.findById.mockImplementation(() => fail("should not be called"));
    const res = await request(app)
      .get(url)
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.url).toBe(url);
    expect(res.body.errors).toBeDefined();
  });

  it("when [valid but not exist] res should [contain errors]", async () => {
    const url = baseUrl + "/" + data[0]._id.toString();

    zoneService.findById.mockImplementation(() => {
      throw new Error.DocumentNotFoundError("");
    });

    const res = await request(app)
      .get(url)
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.errors).toBeDefined();
  });
});
