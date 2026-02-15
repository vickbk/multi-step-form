import type { MultiStepData, WithBack, WithGoTo } from "@/app/types";
import { ADDON_REQUIRED_FIELDS } from "../../add-ons";
import { StepSection } from "../../components/step-section";
import { useRequire } from "../../hooks";
import { getBillingLabel } from "../../plan-step";
import { getTotalPrice } from "../scripts";
import { AddsOnSummary } from "./adds-on-summary";
import { PersonelInfoSummary } from "./personel-info-summary";
import { PlanSummary } from "./plan-summary";
import { SummaryHolder } from "./summary-holder";

export const Summary = ({
  goTo: goTo,
  ...data
}: WithBack<WithGoTo<MultiStepData>>) => {
  const required = useRequire(data, ADDON_REQUIRED_FIELDS);

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
