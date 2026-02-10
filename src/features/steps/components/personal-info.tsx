import { StepSection } from "./step-section";

export const PersonalInfo = () => {
  const inputs = [
    {
      label: "Name",
      type: "text",
      placeholder: "e.g. Stephen King",
      name: "name",
    },
    {
      label: "Email",
      type: "email",
      placeholder: "e.g. stephenking@lorem.com",
      name: "email",
    },
    {
      label: "Phone",
      type: "tel",
      placeholder: "e.g. +1 234 567 890",
      name: "phone",
    },
  ];
  return (
    <StepSection
      header={{
        title: "Personal Info",
        description:
          "Please provide your name, email address, and phone number.",
      }}
    >
      {inputs.map(({ name, label, placeholder, type }) => (
        <label key={label}>
          {label}
          <input type={type} placeholder={placeholder} name={name} />
        </label>
      ))}
    </StepSection>
  );
};
