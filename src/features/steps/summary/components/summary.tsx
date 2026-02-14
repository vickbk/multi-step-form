import type { MultiStepData } from "@/app/types/multi-step-data";
import { StepSection } from "../../components/step-section";
import { getTotalPrice } from "../scripts/summary-handler";
import "../styles/summary.css";
import { AddsOnSummary } from "./adds-on-summary";
import { PersonelInfoSummary } from "./personel-info-summary";
import { PlanSummary } from "./plan-summary";
import { SummaryHolder } from "./summary-holder";

export const Summary = ({
  goTo: goTo,
  ...data
}: MultiStepData & {
  goTo: (newStep: number) => void;
}) => {
  const { billing } = data;
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
        <dt>Total (per {billing === "yearly" ? "year" : "month"})</dt>
        <dd className="font-semibold text-2xl c-purple-600">
          ${getTotalPrice(data)}/{billing === "yearly" ? "yr" : "mo"}
        </dd>
      </dl>
    </StepSection>
  );
};
