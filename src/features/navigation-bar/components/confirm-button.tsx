import { joinClasses } from "@/shared/libs";
import { useFocusSubmit } from "../hooks/use-focus-submit";

export const ConfirmButton = ({ isLastStep }: { isLastStep: boolean }) => {
  const submitRef = useFocusSubmit(isLastStep);
  return (
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
  );
};
