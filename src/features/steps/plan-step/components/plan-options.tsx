import { SROnly } from "@/shared/components/SROnly";
import { PLANS_INPUTS } from "../scripts";
import type { PlanType } from "../types";

export const PlanOptions = ({ plan, billing }: PlanType) => {
  return (
    <fieldset className="plan">
      <legend className="sr-only">Plan Options</legend>
      {PLANS_INPUTS[billing].map(({ name, price, icon, discount, focus }) => (
        <label className="plan__option" key={name}>
          <input
            className="sr-only"
            type="radio"
            name="plan"
            value={name}
            defaultChecked={plan === name}
            required
            autoFocus={!plan ? focus : plan === name}
          />
          <img src={icon} alt="" />
          <span className="grid">
            <span className="text-xl font-medium">{name}</span>{" "}
            <SROnly>plan</SROnly>
            <span className="c-grey-500">
              {price}/{billing === "monthly" ? "mo" : "yr"}
            </span>
            {discount && <span>{discount} </span>}
          </span>
        </label>
      ))}
      <span className="plan__error">Please choose your plan</span>
    </fieldset>
  );
};
