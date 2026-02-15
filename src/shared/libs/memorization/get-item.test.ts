import { getNested } from "./get-item";

describe("Get Nested", () => {
  test("Should get deep inner item", () => {
    expect(getNested({ x: { y: { z: 2 } } }, ["x", "y", "z"])).toBe(2);
  });

  test("Should return undefined for non-existing path", () => {
    expect(getNested({ a: { b: 1 } }, ["a", "c"])).toBeUndefined();
  });

  test("Should return the object itself for empty path", () => {
    const obj = { key: "value" };
    expect(getNested(obj, [])).toBe(obj);
  });
});
