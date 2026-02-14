import type {
  MultiStepData,
  WithBack,
  WithGoTo,
} from "@/app/types/multi-step-data";
import { StepSection } from "../../components/step-section";
import { useRequire } from "../../hooks/use-require";
import { getBillingLabel } from "../../plan-step/scripts/plan-helpers";
import { getTotalPrice } from "../scripts/summary-handler";
import "../styles/summary.css";
import { AddsOnSummary } from "./adds-on-summary";
import { PersonelInfoSummary } from "./personel-info-summary";
import { PlanSummary } from "./plan-summary";
import { SummaryHolder } from "./summary-holder";

export const Summary = ({
  goTo: goTo,
  ...data
}: WithBack<WithGoTo<MultiStepData>>) => {
  const required = useRequire(data, [
    "name",
    "email",
    "phone",
    "plan",
    "billing",
  ]);

  const { billing } = data;
  return (
    <StepSection
      ref={required}
      header={{
        title: "Finishing up",
        description: "Double-check everything looks OK before confirming.",
      }}
    >
      <div>
        {[
          { component: <PersonelInfoSummary {...data} /> },
          { component: <PlanSummary {...data} goTo={goTo} />, custom: true },
          { component: <AddsOnSummary {...data} /> },
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
        <dt>Total ({getBillingLabel(billing, true)})</dt>
        <dd className="font-semibold text-2xl c-purple-600">
          ${getTotalPrice(data)}/{getBillingLabel(billing)}
        </dd>
      </dl>
    </StepSection>
  );
};
