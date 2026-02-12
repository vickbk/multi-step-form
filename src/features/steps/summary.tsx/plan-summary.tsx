import { SROnly } from "@/shared/components/SROnly";
import { SummaryHolder } from "./summary-holder";

export const PlanSummary = () => {
  return (
    <SummaryHolder custom>
      <dl className="grid grid-cols-[1fr_auto] grid-rows-2">
        <dt className="c-blue-950 font-semibold text-xl">Arcade (Monthly)</dt>
        <dd className="col-start-2 row-span-full self-center font-bold c-blue-950 text-lg">
          $90/yr
        </dd>
        <dd>
          <button type="button" className="underline">
            Change <SROnly> your plan</SROnly>
          </button>
        </dd>
      </dl>
    </SummaryHolder>
  );
};
