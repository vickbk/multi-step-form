import { setNested } from "./set-item";

describe("Set Nested", () => {
  test("Should set deep inner item", () => {
    const obj: Record<string, unknown> = {};
    setNested(obj, ["a", "b", "c"], 5);
    expect(obj).toEqual({ a: { b: { c: 5 } } });
  });

  test("Should overwrite non-object with object when setting deep item", () => {
    const obj: Record<string, unknown> = { a: 10 };
    setNested(obj, ["a", "b"], 20);
    expect(obj).toEqual({ a: { b: 20 } });
  });

  test("Should set item at root level", () => {
    const obj: Record<string, unknown> = {};
    setNested(obj, ["key"], "value");
    expect(obj).toEqual({ key: "value" });
  });
});
