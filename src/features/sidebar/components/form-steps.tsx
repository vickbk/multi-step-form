import { joinClasses } from "@/shared/libs";

export const FormSteps = ({
  step: current,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <ul className="mx-auto py-8 md:p-8 flex gap-4 justify-center md:grid grid-cols-1 uppercase min-w-75 md:mx-0 md:justify-start md:absolute md:top-0">
      {[
        { step: 1, label: "Your Info" },
        { step: 2, label: "Select Plan" },
        { step: 3, label: "Add-Ons" },
        { step: 4, label: "Summary" },
      ].map(({ step, label }) => (
        <li className="relative flex gap-4" key={step}>
          <button
            className={joinClasses([
              "aspect-square px-4 border-2 rounded-full",
              step === current + 1
                ? "c-foreground background b-background"
                : "c-background",
            ])}
            type="button"
            onClick={() => setStep(step - 1)}
          >
            {step} <span className="absolute inset-0"></span>
          </button>
          <dl className="sr-only md:not-sr-only">
            <dt className="c-grey-500">Step {step}</dt>
            <dd className="font-bold c-white">{label}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
};
