import { SummaryHolder } from "./summary-holder";

export const PersonelInfoSummary = () => {
  return (
    <SummaryHolder>
      {[
        ["name", "test"],
        ["email", "test@example.com"],
        ["Telephone", "+123-456-7890"],
      ].map(([label, value]) => (
        <dl key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </dl>
      ))}
    </SummaryHolder>
  );
};
