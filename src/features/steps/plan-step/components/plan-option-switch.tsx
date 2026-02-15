import { Icon } from "@/shared/components/bi-icon";
import { joinClasses } from "@/shared/libs";
import { BILLING } from "../scripts/plan-inputs";
import type { PlanType } from "../types/plan-type";

export const PlanOptionSwitch = ({
  billing,
  setBilling,
}: Pick<PlanType, "billing"> & {
  setBilling: (value: "monthly" | "yearly") => void;
}) => {
  return (
    <fieldset className="background p-4 rounded-lg flex gap-4 justify-center">
      <legend className="sr-only">Plan period</legend>
      {BILLING.map((value) => (
        <label
          key={value}
          className={joinClasses([
            value === billing
              ? "c-grey-500 cursor-not-allowed"
              : "cursor-pointer",
            "font-medium flex gap-4 capitalize active-button outline-none!",
          ])}
        >
          <input
            type="radio"
            className="sr-only"
            name="billing"
            value={value}
            checked={billing === value}
            onChange={() => setBilling(value)}
            required
          />
          {value === "yearly" && billing !== value && (
            <Icon className={"toggle-off"} />
          )}
          {value}
          {value === "monthly" && billing !== value && (
            <Icon className={"toggle-on"} />
          )}
        </label>
      ))}
    </fieldset>
  );
};
