import { joinClasses } from "@/shared/libs";

export const FormSteps = ({ step: current, setStep }: { step: number, setStep: React.Dispatch<React.SetStateAction<number>> }) => {
  return (
    <ul className="mx-auto py-8 flex gap-4 justify-center">
      {[
        { step: 1, label: "Your Info" },
        { step: 2, label: "Select Plan" },
        { step: 3, label: "Add-Ons" },
        { step: 4, label: "Summary" },
      ].map(({ step, label }) => (
        <li className="relative" key={step}>
          <button
            className={joinClasses([
              "aspect-square px-4 border-2 rounded-full",
              step === current + 1
                ? "c-foreground background b-background"
                : "c-background",
            ])}
            type="button" onClick={() => setStep(step - 1)}
          >
            {step} <span className="absolute inset-0"></span>
          </button>
          <dl className="sr-only">
            <dt>Step {step}</dt>
            <dd>{label}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
};
