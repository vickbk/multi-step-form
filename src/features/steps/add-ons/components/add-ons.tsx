import { default as Checkmark } from "@/assets/images/icon-checkmark.svg";
import { StepSection } from "../../components/step-section";
import { ADDONS_INPUTS } from "../scripts/inputs";
import "../styles/add-ons.css";
import type { AddOns } from "../types/add-on";

export const AddsOn = ({ "add-ons": addOns = [], billing }: AddOns) => {
  return (
    <StepSection
      header={{
        title: "Pick Add-ons",
        description: "Add-ons help enhance your gaming experience.",
      }}
    >
      {ADDONS_INPUTS[billing].map(({ label, name, description, price }) => (
        <label key={name} className="add-on">
          <input
            type="checkbox"
            className="add-on__input"
            name="add-ons"
            value={name}
            defaultChecked={addOns.includes(name)}
          />
          <span className="add-on__icon ">
            <img src={Checkmark} className="w-8" alt="" />
          </span>
          <span className="grid c-grey-500">
            <span className="font-semibold c-blue-950 text-xl">{label}</span>
            <span>{description}</span>
          </span>
          <span className="c-purple-600 font-medium ml-auto">
            +{price}/{billing === "yearly" ? "yr" : "mo"}
          </span>
        </label>
      ))}
    </StepSection>
  );
};
