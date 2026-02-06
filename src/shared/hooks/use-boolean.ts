import { useCallback, useState } from "react";

export function useBoolean(initialState = false) {
  const [state, setState] = useState(initialState);

  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);
  const toggle = useCallback(() => setState((s) => !s), []);

  return [state, { setTrue, setFalse, toggle }] as const;
}
