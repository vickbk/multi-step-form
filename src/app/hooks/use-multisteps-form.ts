import { useActionState, useMemo, useState, type JSX } from "react";

export function useMultistepsForm<T extends object>(
  steps: ((data: T & { goTo: (index: number) => void }) => JSX.Element)[],
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
      next: () => setStep((prev) => Math.min(prev + 1, steps.length - 1)),
      back: () => setStep((prev) => Math.max(prev - 1, 0)),
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
    async (_: T, data: FormData) => {
      const formData = Object.fromEntries(data);
      const results = { ..._, ...formData };
      if (navigation.isLastStep) {
        setComplete(true);
        // can handle form submission here, e.g. send data to server
        return {} as T;
      }
      navigation.next();
      if ("add-ons" in formData) {
        return { ...results, "add-ons": data.getAll("add-ons") };
      }
      return results;
    },
    {} as Awaited<T>,
  );

  return { ...navigation, formAction, formData };
}
