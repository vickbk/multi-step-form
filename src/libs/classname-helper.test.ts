import { joinClasses } from "@/libs/classname-helper";

describe("classname helper", () => {
  it("Joins class names from an array", () => {
    expect(joinClasses(["class-1", "class-2"])).toBe("class-1 class-2");
  });
  it("ignores false values", () => {
    expect(
      joinClasses(["class-1", false, "class-2", undefined, "class-3", null]),
    ).toBe("class-1 class-2 class-3");
  });
});
