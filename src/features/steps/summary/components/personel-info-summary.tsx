import type { PersonalInfoType } from "../../personel-info/types/personal-info";

export const PersonelInfoSummary = ({
  name,
  email,
  phone,
}: PersonalInfoType) => {
  return (
    <>
      {[
        ["name", name],
        ["email", email],
        ["Telephone", phone],
      ].map(([label, value]) => (
        <dl className="flex gap-2 justify-between" key={label}>
          <dt>{label}: </dt>
          <dd className="c-blue-950">{value}</dd>
        </dl>
      ))}
    </>
  );
};
