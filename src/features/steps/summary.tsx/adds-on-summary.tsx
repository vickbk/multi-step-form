export const AddsOnSummary = () => {
  return (
    <>
      {[["add", "value"]].map(([label, value]) => (
        <dl className="flex justify-between" key={label}>
          <dt>{label}</dt>
          <dd className="c-blue-950">{value}</dd>
        </dl>
      ))}
    </>
  );
};
