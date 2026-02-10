import { Icon } from "@/shared/components/bi-icon";

export const PlanOptionSwitch = () => {
  return (
    <fieldset>
      <legend className="sr-only">Plan</legend>
      <label>
        <input type="radio" name="plan" value="monthly" />
        Monthly <Icon className="toggle-on" />
      </label>
      <label>
        <input type="radio" name="plan" value="yearly" />
        <Icon className="toggle-off" />
        Yearly
      </label>
    </fieldset>
  );
};
