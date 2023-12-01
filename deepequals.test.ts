import { test, expect } from "bun:test";
import * as z from "zod";

const schema = z.array(
  z.object({
    dateTime: z
      .string()
      .datetime()
      .transform((v) => new Date(v)),
  })
);

const createFixture = () => {
  return {
    dateTime: new Date("2020-01-01T00:00:00.001Z"),
  } as const;
};

test("Arrays of objects containing dates", async () => {
  const obj = createFixture();

  const parsed = schema.parse(JSON.parse(JSON.stringify([obj, obj])));

  // These assertions work
  expect(parsed[0].dateTime).toEqual(obj.dateTime);
  expect(parsed[1].dateTime).toEqual(obj.dateTime);

  // These also work
  expect(parsed[0]).toEqual(obj);
  expect(parsed[1]).toEqual(obj);

  console.log("Deep equals:", Bun.deepEquals(parsed, [obj, obj]));
  expect(parsed).toEqual([obj, obj]);
});

test("Arrays of objects containing primtive values", () => {
  const gen = () => ({ foo: "bar" });

  expect([gen(), gen()]).toEqual([gen(), gen()]);
});
