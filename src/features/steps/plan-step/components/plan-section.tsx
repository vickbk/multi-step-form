import { StepSection } from "../../components/step-section";
import { PlanOptionSwitch } from "./plan-option-switch";
import { PlanOptions } from "./plan-options";

export const PlanSection = () => {
  return (
    <StepSection
      show
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
