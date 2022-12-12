import App from "../../../init/App";
import Server from "../../../init/Server";
import { jest } from "@jest/globals";
import request from "supertest";
import UriConfigs from "../../../configs/UriConfigs";
import ZoneMock from "../../mock-data/ZoneMock";
import ValidationMsg from "../../../messages/ValidationMsg";

const app = App.init();
const URIS = UriConfigs.URIS;
const data = ZoneMock.createData();


const zoneService = require("../../../service/ZoneService");
jest.mock("../../../service/ZoneService", () => ({
  findAll: jest.fn(),
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
    zoneService.findAll.mockImplementation(() => data);
    const res = await request(app)
      .get(url)
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.url).toBe(url);
    expect(res.body.data).toStrictEqual(data);
  });

  it("when [req missing content-type], res status should be [400, with errors]", async () => {
    zoneService.findAll.mockImplementation(() => undefined);
    const res = await request(app)
      .get(url)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.errors.message).toBe(ValidationMsg.err.contentType);
  });

  it("when [valid, page=2, size=3], res should [contain all data]", async () => {
    const expectedData = "doesn't matter";

    zoneService.findAll.mockImplementation(() => expectedData);
    const res = await request(app)
      .get(url)
      .set("Content-Type", "application/json")
      .query({ page: "2", size: "3" })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.data).toBe(expectedData);
  });

  it("when [invalid, page=-1, size=3], res should [contain errors]", async () => {
    const expectedData = "doesn't matter";

    zoneService.findAll.mockImplementation(() => expectedData);
    const res = await request(app)
      .get(url)
      .set("Content-Type", "application/json")
      .query({ page: "-1", size: "3" })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.errors.details).toHaveLength(1);
  });

  it("when [invalid, page=-1, size=-3], res should [contain errors]", async () => {
    const expectedData = "doesn't matter";

    zoneService.findAll.mockImplementation(() => expectedData);
    const res = await request(app)
      .get(url)
      .set("Content-Type", "application/json")
      .query({ page: "-1", size: "-3" })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.errors.details).toHaveLength(2);
  });
});
