import { getRandomElement, joinClasses } from "@/shared/libs";
import { StepSection } from "../../components/step-section";
import { PERSONEL_INFO_INPUTS } from "../scripts/inputs";
import type { PersonalInfoType } from "../types/personal-info";

export const PersonalInfo = (data: PersonalInfoType) => {
  return (
    <StepSection
      header={{
        title: "Personal Info",
        description:
          "Please provide your name, email address, and phone number.",
      }}
    >
      {PERSONEL_INFO_INPUTS.map(({ name, label, placeholder, type }) => (
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
            defaultValue={data[name] ?? ""}
          />
        </label>
      ))}
    </StepSection>
  );
};
