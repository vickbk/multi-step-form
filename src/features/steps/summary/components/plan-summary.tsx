import { SROnly } from "@/shared/components/SROnly";

export const PlanSummary = ({
  setStep,
}: {
  setStep: (step: number) => void;
}) => {
  return (
    <dl className="grid grid-cols-[1fr_auto] grid-rows-2">
      <dt className="c-blue-950 font-semibold text-xl">Arcade (Monthly)</dt>
      <dd className="col-start-2 row-span-full self-center font-bold c-blue-950 text-lg">
        $90/yr
      </dd>
      <dd>
        <button type="button" className="underline" onClick={() => setStep(1)}>
          Change <SROnly> your plan</SROnly>
        </button>
      </dd>
    </dl>
  );
};
