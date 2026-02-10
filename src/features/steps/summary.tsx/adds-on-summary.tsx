import { SummaryHolder } from "./summary-holder";

export const AddsOnSummary = () => {
  return (
    <SummaryHolder>
      {[["add", "value"]].map(([label, value]) => (
        <div>
          <span>{label}</span>
          <span>{value}</span>
        </div>
      ))}
    </SummaryHolder>
  );
};
