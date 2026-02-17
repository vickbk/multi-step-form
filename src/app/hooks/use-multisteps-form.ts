import { useActionState, useMemo, useState, type JSX } from "react";
import type { MultiStepHandlerParams, WithBack, WithGoTo } from "../types";

export function useMultistepsForm<T extends object>(
  steps: ((data: WithBack<WithGoTo<T>>) => JSX.Element)[],
  callback: (data: MultiStepHandlerParams<T>) => Promise<T>,
) {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);

  const navigation = useMemo(
    () => ({
      step,
      goTo: (index: number) =>
        setStep(() => Math.max(0, Math.min(index, steps.length - 1))),
      isFirstStep: step === 0,
      isLastStep: step === steps.length - 1,
      next: () => setStep(Math.min(step + 1, steps.length - 1)),
      back: () => setStep(Math.max(step - 1, 0)),
      complete,
      Current: steps[step],
      reset: () => {
        setStep(0);
        setComplete(false);
      },
    }),
    [step, steps, complete],
  );

  const [formData, formAction] = useActionState(
    async (previous: T, data: FormData) => {
      const goToValue = data.get("go-to");
      const { isLastStep, step, next, goTo, back } = navigation;
      const results = await callback({
        data,
        isLastStep: isLastStep && goToValue === null,
        step,
        previous,
      });
      setTimeout(() => {
        if (isLastStep && goToValue === null) setComplete(true);
        else if (goToValue !== null) {
          if (typeof goToValue === "string" && !isNaN(Number(goToValue)))
            goTo(+goToValue);
          else back();
        } else next();
      }, 5);
      return results;
    },
    {} as Awaited<T>,
  );

  return { ...navigation, formAction, formData };
}
