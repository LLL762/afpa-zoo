import UriConfigs from "../../../configs/UriConfigs";
import App from "../../../init/App";
import Server from "../../../init/Server";
import ZoneMock from "../../mock-data/ZoneMock";

const app = App.init();
const URIS = UriConfigs.URIS;
const mockZone = ZoneMock.createOne(0);

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
