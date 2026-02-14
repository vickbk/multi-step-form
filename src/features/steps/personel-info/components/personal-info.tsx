import { getRandomElement, joinClasses } from "@/shared/libs";
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
      label: "Email Address",
      type: "email",
      placeholder: "e.g. stephenking@lorem.com",
      name: "email",
    },
    {
      label: "Phone Number",
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
        <label
          className="grid grid-cols-[auto_1fr] items-center text-xl gap-1 c-blue-950"
          key={label}
        >
          {label}{" "}
          {getRandomElement([true, false]) && (
            <span className="text-right c-red-500">This field is required</span>
          )}
          <input
            className={joinClasses([
              getRandomElement([true, false]) ? "out-red-500" : "out-grey-500",
              "col-span-full outline p-2 px-4 rounded-md font-medium active-out-purple-600",
            ])}
            type={type}
            placeholder={placeholder}
            name={name}
            required
          />
        </label>
      ))}
    </StepSection>
  );
};
