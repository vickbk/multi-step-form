import type { WithBack } from "@/app/types/multi-step-data";

export function useRequire<T extends object>(
  data: WithBack<Partial<T>>,
  required: (keyof T)[],
) {
  return <R extends HTMLElement>(node: R | null) => {
    if (node) {
      const missing = required.filter((key) => !(key in data));
      if (missing.length > 0) {
        data.back();
      }
    }
  };
}
