import App from "../../init/App";
import Server from "../../init/Server";
import { jest, test } from "@jest/globals";
import request from "supertest";
import UriConfigs from "../../configs/UriConfigs";
import ZoneMock from "../mock-data/ZoneMock";
import ValidationMsg from "../../messages/ValidationMsg";

const app = App.init();
const URIS = UriConfigs.URIS;

jest.mock("../../service/ZoneService", () => ({
  findAll: async () => ZoneMock.data,
}));

beforeAll(() => {
  Server.init(app);
});

afterAll(() => {
  Server.close();
});

describe("Get all endpoint tests", () => {
  const url = URIS.base + URIS.zones;
  it("when [valid,no param] res should [contain all data]", async () => {
    const res = await request(app)
      .get(url)
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.url).toBe(url);
    expect(res.body.data).toStrictEqual(ZoneMock.data);
  });

  it("when [req missing content-type], res status should be [400, with errors]", async () => {
    const res = await request(app)
      .get(url)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.errors.message).toBe(ValidationMsg.err.contentType);
  });
});
