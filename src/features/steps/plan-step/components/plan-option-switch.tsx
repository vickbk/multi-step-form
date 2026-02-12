import { Icon } from "@/shared/components/bi-icon";
import { joinClasses } from "@/shared/libs";
import { useState } from "react";

export const PlanOptionSwitch = () => {
  const [checked, setChecked] = useState<"monthly" | "yearly">("monthly");
  const periods = ["monthly", "yearly"] as const;
  return (
    <fieldset className="background p-4 rounded-lg flex gap-4 justify-center">
      <legend className="sr-only">Plan period</legend>
      {periods.map((value) => (
        <label
          className={joinClasses([
            value === checked
              ? "c-grey-500 cursor-not-allowed"
              : "cursor-pointer",
            "font-medium flex gap-4 capitalize",
          ])}
        >
          <input
            type="radio"
            className="sr-only"
            name="plan-period"
            value={value}
            checked={checked === value}
            onChange={() => setChecked(value)}
          />
          {value === "yearly" && checked !== value && (
            <Icon className={"toggle-off"} />
          )}
          {value}
          {value === "monthly" && checked !== value && (
            <Icon className={"toggle-on"} />
          )}
        </label>
      ))}
    </fieldset>
  );
};
