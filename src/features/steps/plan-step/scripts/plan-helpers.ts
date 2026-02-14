import type { PlanType } from "../types/plan-type";
import { PLANS_INPUTS } from "./plan-inputs";

export function getPlanPrice({ billing, plan }: PlanType) {
  return PLANS_INPUTS[billing].find(({ name }) => name === plan)?.price || 0;
}

export function getBillingLabel(billing: PlanType["billing"], full = false) {
  const isYearly = billing === "yearly";
  if (full) {
    return isYearly ? "Yearly" : "Monthly";
  }
  return isYearly ? "yr" : "mo";
}
