import type { AddOn } from "../types/add-on";
import { ADDONS_INPUTS } from "./inputs";

export function getAddOnPrice({ billing, "add-on": addOn }: AddOn): number {
  const addOnPrice =
    ADDONS_INPUTS[billing].find(({ name }) => name === addOn)?.price || 0;
  return addOnPrice;
}

export function getAddOnLabel({ billing, "add-on": addOn }: AddOn): string {
  const addOnLabel =
    ADDONS_INPUTS[billing].find(({ name }) => name === addOn)?.label || "";
  return addOnLabel;
}
