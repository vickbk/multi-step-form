import { useState } from "react";
import { StepSection } from "../../components/step-section";
import type { PlanType } from "../types/plan-type";
import { PlanOptionSwitch } from "./plan-option-switch";
import { PlanOptions } from "./plan-options";

export const PlanSection = (plan: PlanType) => {
  const [billing, setBilling] = useState<"monthly" | "yearly">(
    plan.billing || "monthly",
  );
  return (
    <StepSection
      header={{
        title: "Select your plan",
        description: "You have the option of monthly or yearly billing.",
      }}
    >
      <PlanOptions {...plan} billing={billing} />
      <PlanOptionSwitch billing={billing} setBilling={setBilling} />
    </StepSection>
  );
};
