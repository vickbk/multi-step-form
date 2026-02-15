import { useMemo, useState } from "react";

export function useBoolean(initialState = false) {
  const [state, setState] = useState(initialState);

  return useMemo(
    () => [
      state,
      {
        setTrue() {
          setState(true);
        },
        setFalse() {
          setState(false);
        },
        toggle() {
          setState((s) => !s);
        },
      },
    ],
    [state],
  );
}
