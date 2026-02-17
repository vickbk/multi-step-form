import { saveAndGoTo } from "@/features/sidebar/scripts";
import { SROnly } from "@/shared/components/SROnly";
import { joinClasses } from "@/shared/libs";

export const BackButton = ({ isFirstStep }: { isFirstStep: boolean }) => {
  return (
    <button
      className={joinClasses([
        "c-grey-500 font-semibold active-button outline-none! active-c-blue-950",
        isFirstStep && "hidden",
      ])}
      type="button"
      onClick={saveAndGoTo}
      name="go-to"
      value="previous"
    >
      Go Back <SROnly>to the previous step</SROnly>
    </button>
  );
};
