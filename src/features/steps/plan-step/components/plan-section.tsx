import type { WithBack } from "@/app/types";
import { useState } from "react";
import { StepSection } from "../../components/step-section";
import { useRequire } from "../../hooks";
import { PLAN_REQUIRED_FIELDS } from "../scripts";
import type { PlanType } from "../types";
import { PlanOptionSwitch } from "./plan-option-switch";
import { PlanOptions } from "./plan-options";

export const PlanSection = (plan: WithBack<PlanType>) => {
  const [billing, setBilling] = useState<"monthly" | "yearly">(
    plan.billing || "monthly",
  );
  const required = useRequire(plan, PLAN_REQUIRED_FIELDS);
  return (
    <StepSection
      ref={required}
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
