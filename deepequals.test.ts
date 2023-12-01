import { test, expect } from "bun:test";
import * as z from "zod";

const schema = z
  .string()
  .datetime()
  .transform((v) => new Date(v))
  .array();

const createFixture = () => {
  return new Date("2020-01-01T00:00:00.001Z");
};

test("Array of dates", async () => {
  const obj = createFixture();

  const parsed = schema.parse(JSON.parse(JSON.stringify([obj, obj])));

  console.log("Deep equals:", Bun.deepEquals(parsed, [obj, obj]));
  expect(parsed).toEqual([obj, obj]);
});

test("Array of objects containing primtive values", () => {
  const gen = () => ({ foo: "bar" });

  expect([gen(), gen()]).toEqual([gen(), gen()]);
});
