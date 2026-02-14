import { joinClasses } from "@/shared/libs";
import { StepSection } from "../../components/step-section";
import { PERSONEL_INFO_INPUTS } from "../scripts/inputs";
import "../styles/personal-info.css";
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
      {PERSONEL_INFO_INPUTS.map(
        ({ name, label, placeholder, type, errorMessage, pattern }) => (
          <label className="input-field" key={label}>
            {label} <span className="input-field__error">{errorMessage}</span>
            <input
              className={joinClasses(["input-field__input"])}
              type={type}
              placeholder={placeholder}
              name={name}
              required
              pattern={pattern}
              defaultValue={data[name] ?? ""}
            />
          </label>
        ),
      )}
    </StepSection>
  );
};
