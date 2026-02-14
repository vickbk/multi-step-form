import { useActionState, useMemo, useState, type JSX } from "react";

export function useMultistepsForm(steps: (() => JSX.Element)[]) {
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
    }),
    [step, steps, complete],
  );

  const [formData, formAction] = useActionState(
    async (_: object, data: FormData) => {
      const formData = Object.fromEntries(data);
      const results = { ..._, ...formData };
      if (navigation.isLastStep) {
        setComplete(true);
        return {};
      }
      navigation.next();
      if ("add-on" in formData) {
        return { ...results, "add-on": data.getAll("add-on") } as object;
      }
      return results;
    },
    {},
  );

  return { ...navigation, formAction, formData };
}
