import type { MultiStepData } from "@/app/types/multi-step-data";
import { getAddOnPrice } from "../../add-ons/scripts/add-on-helpers";
import { getPlanPrice } from "../../plan-step/scripts/plan-helpers";

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
