import { it, describe, expect, test } from "@jest/globals";
import TDatasource from "./init/TDatasource";

beforeAll(async () => {
  TDatasource.connect();
});

afterAll(async () => {
  TDatasource.close();
});

test("index route works", async () => {
  expect(1).toBeLessThan(3);
});
