import {
  getAddOnLabel,
  getAddOnPrice,
} from "../../add-ons/scripts/add-on-helpers";
import type { AddOns } from "../../add-ons/types/add-on";
import { getBillingLabel } from "../../plan-step/scripts/plan-helpers";

export const AddsOnSummary = ({ billing, "add-ons": addOns }: AddOns) => {
  const formated = addOns.map((add) => [
    getAddOnLabel({ billing, "add-on": add }),
    `+$${getAddOnPrice({ billing, "add-on": add })}/${getBillingLabel(billing)}`,
  ]);

  return (
    <>
      {formated.map(([label, value]) => (
        <dl className="flex justify-between" key={label}>
          <dt>{label}</dt>
          <dd className="c-blue-950">{value}</dd>
        </dl>
      ))}
    </>
  );
};
