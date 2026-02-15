import type { MemoObject } from "./memo-types";

// Storage key constant - avoids bundling package.json metadata into client build
export const memoName = "multi-step-form";

export default function getMemo() {
  const item = localStorage.getItem(memoName);
  if (!item) return (localStorage.setItem(memoName, JSON.stringify({})), {});
  return JSON.parse(item) as MemoObject;
}
