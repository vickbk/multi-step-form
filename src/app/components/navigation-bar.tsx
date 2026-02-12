import { SROnly } from "@/shared/components/SROnly";

export const NavigationBar = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (num: number) => void;
}) => {
  return (
    <div className="mt-auto flex p-4 justify-between white">
      {step > 0 && (
        <button
          className="c-grey-500 font-semibold"
          type="button"
          onClick={() => setStep(step - 1)}
        >
          Go Back <SROnly>to the previous step</SROnly>
        </button>
      )}
      <button
        className="p-4 px-6 rounded-md blue-950 c-background font-semibold text-xl ml-auto"
        type="button"
        onClick={() => setStep(step + 1)}
      >
        Next Step
      </button>
      <button
        className="p-4 px-6 rounded-md purple-600 c-background text-xl hidden ml-auto"
        type="submit"
      >
        Confirm
      </button>
    </div>
  );
};
