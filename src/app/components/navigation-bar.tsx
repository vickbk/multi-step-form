import { SROnly } from "@/shared/components/SROnly";
import { joinClasses } from "@/shared/libs";
import { useFocusSubmit } from "../hooks/use-focus-submit";

export const NavigationBar = ({
  back,
  isFirstStep,
  isLastStep,
}: {
  back: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}) => {
  const submitRef = useFocusSubmit(isLastStep);
  return (
    <div className="mt-6 flex p-4 justify-between white w-full md:max-w-lg mx-auto md:px-8">
      <button
        className={joinClasses([
          "c-grey-500 font-semibold active-button outline-none! active-c-blue-950",
          isFirstStep && "hidden",
        ])}
        type="button"
        onClick={back}
      >
        Go Back <SROnly>to the previous step</SROnly>
      </button>

      <button
        className={joinClasses([
          "next-button",
          isLastStep && "hidden",
          "active-button",
        ])}
        type="submit"
      >
        Next Step
      </button>
      <button
        className={joinClasses([
          "submit-btn",
          !isLastStep && "hidden",
          "active-button",
        ])}
        type="submit"
        ref={submitRef}
      >
        Confirm
      </button>
    </div>
  );
};
