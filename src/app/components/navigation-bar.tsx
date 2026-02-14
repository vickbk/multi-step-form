import { SROnly } from "@/shared/components/SROnly";
import { joinClasses } from "@/shared/libs";
import "../styles/navigation-bar.css";

export const NavigationBar = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (num: number) => void;
}) => {
  return (
    <div className="mt-6 flex p-4 justify-between white w-full md:max-w-lg mx-auto md:px-8">
      <button
        className={joinClasses([
          "c-grey-500 font-semibold",
          step === 0 && "hidden",
        ])}
        type="button"
        onClick={() => setStep(step - 1)}
      >
        Go Back <SROnly>to the previous step</SROnly>
      </button>

      <button
        className={joinClasses(["next-button", step === 3 && "hidden"])}
        type="submit"
      >
        Next Step
      </button>
      <button
        className={joinClasses(["submit-btn", step !== 3 && "hidden"])}
        type="submit"
      >
        Confirm
      </button>
    </div>
  );
};
