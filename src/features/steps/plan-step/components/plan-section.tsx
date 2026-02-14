import type { WithBack } from "@/app/types/multi-step-data";
import { useState } from "react";
import { StepSection } from "../../components/step-section";
import { useRequire } from "../../hooks/use-require";
import type { PlanType } from "../types/plan-type";
import { PlanOptionSwitch } from "./plan-option-switch";
import { PlanOptions } from "./plan-options";

export const PlanSection = (plan: WithBack<PlanType>) => {
  const [billing, setBilling] = useState<"monthly" | "yearly">(
    plan.billing || "monthly",
  );
  const required = useRequire(plan, ["name", "email", "phone"]);
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
