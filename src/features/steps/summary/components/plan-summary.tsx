import { SROnly } from "@/shared/components/SROnly";
import {
  getBillingLabel,
  getPlanPrice,
} from "../../plan-step/scripts/plan-helpers";
import type { PlanType } from "../../plan-step/types/plan-type";

export const PlanSummary = ({
  goTo,
  billing,
  plan,
}: PlanType & { goTo: (step: number) => void }) => {
  return (
    <dl className="grid grid-cols-[1fr_auto] grid-rows-2">
      <dt className="c-blue-950 font-semibold text-xl capitalize">
        {plan} ({getBillingLabel(billing, true)})
      </dt>
      <dd className="col-start-2 row-span-full self-center font-bold c-blue-950 text-lg">
        ${getPlanPrice({ billing, plan })}/{getBillingLabel(billing)}
      </dd>
      <dd>
        <button type="button" className="change-btn" onClick={() => goTo(1)}>
          Change <SROnly> your plan</SROnly>
        </button>
      </dd>
    </dl>
  );
};
