import { StepSection } from "../../components/step-section";

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
      show
      header={{
        title: "Personal Info",
        description:
          "Please provide your name, email address, and phone number.",
      }}
    >
      {inputs.map(({ name, label, placeholder, type }) => (
        <label className="grid text-xl gap-1 c-blue-950" key={label}>
          {label}
          <input
            className="outline out-grey-500 p-2 px-4 rounded-md font-medium"
            type={type}
            placeholder={placeholder}
            name={name}
          />
        </label>
      ))}
    </StepSection>
  );
};
