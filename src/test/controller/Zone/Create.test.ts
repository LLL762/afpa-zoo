import UriConfigs from "../../../configs/UriConfigs";
import App from "../../../init/App";
import Server from "../../../init/Server";
import { TypeZone } from "../../../model/Zone";
import { Doc } from "../../../utility/TsTypes";
import ZoneMock from "../../mock-data/ZoneMock";
import request from "supertest";
import { UniqueKeyError } from "../../../error/UniqueKeyError";

const app = App.init();
const URIS = UriConfigs.URIS;
const validData = ZoneMock.createOne(0);

const zoneService = require("../../../service/ZoneService");
jest.mock("../../../service/ZoneService", () => ({
  create: jest.fn(),
}));

beforeAll(() => {
  console.log("Open");

  Server.init(app);
});

afterAll(() => {
  Server.close();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Create endpoint tests", () => {
  const url = URIS.base + URIS.zones;

  it("when [valid] res should [contain data, _id must be ignored]", async () => {
    zoneService.create.mockImplementation((zone: Doc<TypeZone>) => zone);
    const res = await request(app)
      .post(url)
      .set("Content-Type", "application/json")
      .send(validData)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(res.body.data.created.name).toBe(validData.name);
    expect(res.body.data.created._id).not.toEqual(validData._id);
  });

  it("when [data missing name] res should [contain errors]", async () => {
    const missingName = { description: "A valid description" };

    zoneService.create.mockImplementation((zone: Doc<TypeZone>) => zone);
    const res = await request(app)
      .post(url)
      .set("Content-Type", "application/json")
      .send(missingName)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.errors.details).toHaveLength(1);
  });

  it("when [data not json] res should [contain errors]", async () => {
    const invalidJson = "78";

    zoneService.create.mockImplementation((zone: Doc<TypeZone>) => zone);
    const res = await request(app)
      .post(url)
      .set("Content-Type", "application/json")
      .send(invalidJson)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.errors).toBeDefined();
  });

  it("when [UniqueKeyError is thrown] res should [contain errors]", async () => {
    zoneService.create.mockImplementation((zone: Doc<TypeZone>) => {
      throw new UniqueKeyError();
    });

    const res = await request(app)
      .post(url)
      .set("Content-Type", "application/json")
      .send(validData)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(zoneService.create).toBeCalledTimes(1);
    expect(res.body.errors).toBeDefined();
  });

  it("when [MongoServerError 11000 is thrown] res should [contain errors]", async () => {
    const error = {
      name: "MongoServerError",
      message: "message",
      code: 11000,
      keyValue: { name: "Asia" },
    };

    zoneService.create.mockImplementation((zone: Doc<TypeZone>) => {
      throw error;
    });

    const res = await request(app)
      .post(url)
      .set("Content-Type", "application/json")
      .send(validData)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.errors.type).toBe("UniqueKeyError");
  });
});
