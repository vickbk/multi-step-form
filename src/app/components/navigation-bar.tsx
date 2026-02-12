import { SROnly } from "@/shared/components/SROnly";
import { joinClasses } from "@/shared/libs";

export const NavigationBar = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (num: number) => void;
}) => {
  return (
    <div className="mt-6 flex p-4 justify-between white">
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
        className={joinClasses([
          "p-4 px-6 rounded-md blue-950 c-background font-semibold text-xl ml-auto",
          step === 3 && "hidden",
        ])}
        type="button"
        onClick={() => setStep(step + 1)}
      >
        Next Step
      </button>
      <button
        className={joinClasses([
          "p-4 px-6 rounded-md purple-600 c-background text-xl ml-auto",
          step !== 3 && "hidden",
        ])}
        type="submit"
      >
        Confirm
      </button>
    </div>
  );
};
