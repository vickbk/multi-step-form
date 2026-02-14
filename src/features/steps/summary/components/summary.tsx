import { StepSection } from "../../components/step-section";
import "../styles/summary.css";
import { AddsOnSummary } from "./adds-on-summary";
import { PersonelInfoSummary } from "./personel-info-summary";
import { PlanSummary } from "./plan-summary";
import { SummaryHolder } from "./summary-holder";

export const Summary = ({
  goTo: goTo,
}: {
  goTo: (newStep: number) => void;
}) => {
  return (
    <StepSection
      header={{
        title: "Finishing up",
        description: "Double-check everything looks OK before confirming.",
      }}
    >
      <div>
        {[
          { component: <PersonelInfoSummary /> },
          { component: <PlanSummary setStep={goTo} />, custom: true },
          { component: <AddsOnSummary /> },
        ].map(({ component, custom }, index) => (
          <SummaryHolder
            key={index}
            {...{ custom, setStep: goTo, changeIndex: index }}
          >
            {component}
          </SummaryHolder>
        ))}
      </div>
      <dl className="flex gap-4 justify-between items-center px-4 mt-4 c-grey-500">
        <dt>Total (per month)</dt>
        <dd className="font-semibold text-2xl c-purple-600">$120/yr</dd>
      </dl>
    </StepSection>
  );
};
