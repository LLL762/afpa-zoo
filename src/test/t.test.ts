import { it, describe, expect, test } from "@jest/globals";
import Zone from "../model/Zone";
import TDatasource from "./init/TDatasource";

jest.setTimeout(20000);

beforeAll(async () => {
  await TDatasource.connect();
  await TDatasource.populate([]);
});

afterAll(async () => {
  await TDatasource.close();
});

test("works", async () => {
  const zones = await Zone.m.find({}).exec();

  expect(zones).toHaveLength(6);
});
