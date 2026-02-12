import { useMemo, useState } from "react";

export function useSteps() {
  const [step, setStep] = useState(3);
  return useMemo(() => ({ step, setStep }), [step]);
}
