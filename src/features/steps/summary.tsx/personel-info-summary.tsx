import { SummaryHolder } from "./summary-holder";

export const PersonelInfoSummary = () => {
  return (
    <SummaryHolder>
      {[
        ["name", "test"],
        ["email", "test@example.com"],
        ["Telephone", "+123-456-7890"],
      ].map(([label, value]) => (
        <dl className="flex gap-2 justify-between" key={label}>
          <dt>{label}: </dt>
          <dd className="c-blue-950">{value}</dd>
        </dl>
      ))}
    </SummaryHolder>
  );
};
