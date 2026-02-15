import type { MultiStepData } from "@/app/types";
import { getAddOnPrice } from "../../add-ons";
import { getPlanPrice } from "../../plan-step";

export function getTotalPrice({
  billing,
  "add-ons": addOns,
  plan,
}: MultiStepData) {
  const addOnsPrice =
    addOns?.reduce(
      (acc, addOn) => acc + getAddOnPrice({ billing, "add-on": addOn }),
      0,
    ) || 0;

  return getPlanPrice({ billing, plan }) + addOnsPrice;
}
