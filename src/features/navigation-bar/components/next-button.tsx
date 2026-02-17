import { joinClasses } from "@/shared/libs";

export const NextButton = ({ isLastStep }: { isLastStep: boolean }) => {
  return (
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
  );
};
