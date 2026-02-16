import { type WithGoTo } from "@/app/";
import { joinClasses } from "@/shared/libs";
import { saveAndGoTo } from "../scripts";

export const FormSteps = ({
  step: current,
  isLastStep,
  goTo,
}: WithGoTo<{ step: number; isLastStep: boolean }>) => {
  return (
    <ul className="mx-auto py-8 md:p-8 flex gap-4 justify-center md:grid grid-cols-1 uppercase min-w-75 md:mx-0 md:justify-start md:absolute md:top-0">
      {[
        { step: 0, label: "Your Info" },
        { step: 1, label: "Select Plan" },
        { step: 2, label: "Add-Ons" },
        { step: 3, label: "Summary" },
      ].map(({ step, label }) => (
        <li className="relative flex gap-4" key={step}>
          <button
            className={joinClasses([
              "aspect-square px-4 border-2 rounded-full",
              step === current
                ? "c-foreground background b-background"
                : "c-background",
            ])}
            type="button"
            onClick={(e) => {
              if (isLastStep) return goTo(step);
              saveAndGoTo(e);
            }}
            name="go-to"
            value={step}
          >
            {step + 1} <span className="absolute inset-0"></span>
          </button>
          <dl className="sr-only md:not-sr-only">
            <dt className="c-grey-500">Step {step + 1}</dt>
            <dd className="font-bold c-white">{label}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
};
