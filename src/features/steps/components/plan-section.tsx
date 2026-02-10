import { PlanOptionSwitch } from "./plan-option-switch";
import { PlanOptions } from "./plan-options";
import { StepSection } from "./step-section";

export const PlanSection = () => {
  return (
    <StepSection
      header={{
        title: "Select your plan",
        description: "You have the option of monthly or yearly billing.",
      }}
    >
      <PlanOptions />
      <PlanOptionSwitch />
    </StepSection>
  );
};
