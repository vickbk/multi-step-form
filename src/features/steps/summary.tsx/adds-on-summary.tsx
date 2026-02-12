import { SummaryHolder } from "./summary-holder";

export const AddsOnSummary = () => {
  return (
    <SummaryHolder>
      {[["add", "value"]].map(([label, value]) => (
        <dl className="flex justify-between" key={label}>
          <dt>{label}</dt>
          <dd className="c-blue-950">{value}</dd>
        </dl>
      ))}
    </SummaryHolder>
  );
};
