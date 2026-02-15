import type { WithBack } from "@/app/types";

export function useRequire<T extends object>(
  data: WithBack<Partial<T>>,
  required: (keyof T)[],
) {
  return <R extends HTMLElement>(node: R | null) => {
    if (node) {
      const missing = required.filter(
        (key) =>
          !(key in data) ||
          data[key] === undefined ||
          data[key] === null ||
          (typeof data[key] === "string" && data[key]?.trim() === ""),
      );
      if (missing.length > 0) {
        data.back();
      }
    }
  };
}
