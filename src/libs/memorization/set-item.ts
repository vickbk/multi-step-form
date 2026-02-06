import getMemo, { memoName } from "./get-memo";
import type { MemoObject } from "./memo-types";

export default function setMemoItem(params: string, value: unknown) {
  const path = params.split(".");
  const memo = getMemo();
  setNested(memo, path, value);
  localStorage.setItem(memoName, JSON.stringify(memo));
}

export function setNested(memo: MemoObject, path: string[], value: unknown) {
  let current = memo;
  for (let i = 0; i < path.length - 1; i++) {
    if (typeof current[path[i]] !== "object" || current[path[i]] === null) {
      current[path[i]] = {};
    }
    current = current[path[i]] as MemoObject;
  }
  current[path[path.length - 1]] = value;
}

export function clearMemoItem(path: string) {
  setMemoItem(path, null);
}
