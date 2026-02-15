import { useEffect, useRef } from "react";

export function useFocusSubmit(isLastStep: boolean) {
  const submitRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (isLastStep && submitRef.current) {
      submitRef.current.focus();
    }
  }, [isLastStep]);
  return submitRef;
}
