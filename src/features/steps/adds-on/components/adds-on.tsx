import { default as Checkmark } from "@/assets/images/icon-checkmark.svg";
import { StepSection } from "../../components/step-section";
import "../styles/add-ons.css";

export const AddsOn = () => {
  const options = [
    {
      name: "online-service",
      label: "Online service",
      description: "Access to multiplayer games",
      price: 10,
    },
    {
      label: "Larger storage",
      name: "larger-storage",
      description: "Extra 1TB of cloud save",
      price: 20,
    },
    {
      label: "Customizable profile",
      name: "customizable-profile",
      description: "Custom theme on your profile",
      price: 20,
    },
  ];
  return (
    <StepSection
      header={{
        title: "Pick Add-ons",
        description: "Add-ons help enhance your gaming experience.",
      }}
    >
      {options.map(({ label, name, description, price }) => (
        <label key={name} className="add-on">
          <input
            type="checkbox"
            className="add-on__input"
            name="add-on"
            value={name}
          />
          <span className="add-on__icon ">
            <img src={Checkmark} className="w-8" alt="" />
          </span>
          <span className="grid c-grey-500">
            <span className="font-semibold c-blue-950 text-xl">{label}</span>
            <span>{description}</span>
          </span>
          <span className="c-purple-600 font-medium ml-auto">+{price}/yr</span>
        </label>
      ))}
    </StepSection>
  );
};
