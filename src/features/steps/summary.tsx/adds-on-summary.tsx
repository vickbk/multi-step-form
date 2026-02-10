import { SummaryHolder } from "./summary-holder";

export const AddsOnSummary = () => {
  return (
    <SummaryHolder>
      {[["add", "value"]].map(([label, value]) => (
        <dl key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </dl>
      ))}
    </SummaryHolder>
  );
};
