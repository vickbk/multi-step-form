import { StepSection } from "../components/step-section";
import { AddsOnSummary } from "./adds-on-summary";
import { PersonelInfoSummary } from "./personel-info-summary";
import { PlanSummary } from "./plan-summary";

export const Summary = ({ show = false }: { show: boolean }) => {
  return (
    <StepSection
      show={show}
      header={{
        title: "Finishing up",
        description: "Double-check everything looks OK before confirming.",
      }}
    >
      <PersonelInfoSummary />
      <PlanSummary />
      <AddsOnSummary />
    </StepSection>
  );
};
