import { getAddOnLabel, getAddOnPrice, type AddOns } from "../../add-ons";
import { getBillingLabel } from "../../plan-step";

export const AddsOnSummary = ({ billing, "add-ons": addOns = [] }: AddOns) => {
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
      {formated.length === 0 && <p className="italic">No add-ons selected</p>}
    </>
  );
};
