import type { MemoObject } from "./memo-types";

// Storage key from environment variable
export const memoName = import.meta.env.VITE_APP_STORAGE_KEY || "multi-step-form";

export default function getMemo() {
  const item = localStorage.getItem(memoName);
  if (!item) return (localStorage.setItem(memoName, JSON.stringify({})), {});
  return JSON.parse(item) as MemoObject;
}
