import { name } from "../../../../package.json";
import type { MemoObject } from "./memo-types";
export default function getMemo() {
  const item = localStorage.getItem(memoName);
  if (!item) return (localStorage.setItem(memoName, JSON.stringify({})), {});
  return JSON.parse(item) as MemoObject;
}

export const memoName = name || "app";
