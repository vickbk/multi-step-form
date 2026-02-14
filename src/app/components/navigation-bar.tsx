import { SROnly } from "@/shared/components/SROnly";
import { joinClasses } from "@/shared/libs";
import "../styles/navigation-bar.css";

export const NavigationBar = ({
  back,
  next,
  isFirstStep,
  isLastStep,
}: {
  back: () => void;
  next: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}) => {
  return (
    <div className="mt-6 flex p-4 justify-between white w-full md:max-w-lg mx-auto md:px-8">
      <button
        className={joinClasses([
          "c-grey-500 font-semibold",
          isFirstStep && "hidden",
        ])}
        type="button"
        onClick={back}
      >
        Go Back <SROnly>to the previous step</SROnly>
      </button>

      <button
        className={joinClasses(["next-button", isLastStep && "hidden"])}
        type="button"
        onClick={next}
      >
        Next Step
      </button>
      <button
        className={joinClasses(["submit-btn", !isLastStep && "hidden"])}
        type="submit"
      >
        Confirm
      </button>
    </div>
  );
};
