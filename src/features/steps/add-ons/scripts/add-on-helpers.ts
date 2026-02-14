import type { PlanType } from "../../plan-step/types/plan-type";
import { ADDONS_INPUTS } from "./inputs";

export function getAddOnPrice({
  billing,
  "add-on": addOn,
}: Pick<PlanType, "billing"> & { "add-on": string }) {
  const addOnPrice =
    ADDONS_INPUTS[billing].find(({ name }) => name === addOn)?.price || 0;
  return addOnPrice;
}
